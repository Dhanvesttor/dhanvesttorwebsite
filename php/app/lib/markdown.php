<?php
/**
 * Front matter + Markdown for the seed posts in content/data/posts. Covers what editors use:
 * headings, paragraphs, bold/italic, inline code, links, lists, blockquotes, tables, rules and fenced code.
 */

/** @return array{0:array,1:string} [front matter, body] */
function parse_front_matter(string $raw): array
{
    $raw = str_replace("\r\n", "\n", $raw);
    if (!preg_match('/^---\n(.*?)\n---\n?(.*)$/s', $raw, $m)) return [[], $raw];
    $data = [];
    foreach (explode("\n", $m[1]) as $line) {
        if (!preg_match('/^([A-Za-z0-9_]+):\s*(.*)$/', $line, $kv)) continue;
        $data[$kv[1]] = yaml_scalar(trim($kv[2]));
    }
    return [$data, $m[2]];
}

function yaml_scalar(string $v): mixed
{
    if ($v === '') return null;
    if ($v[0] === '[' && str_ends_with($v, ']')) {
        $inner = trim(substr($v, 1, -1));
        return $inner === '' ? [] : array_map(fn($x) => yaml_scalar(trim($x)), str_getcsv($inner, ',', '"', '\\'));
    }
    if ($v[0] === '"' && str_ends_with($v, '"')) return stripcslashes(substr($v, 1, -1));
    if ($v[0] === "'" && str_ends_with($v, "'")) return str_replace("''", "'", substr($v, 1, -1));
    if ($v === 'true' || $v === 'false') return $v === 'true';
    return $v;
}

function markdown(string $md): string
{
    $lines = explode("\n", str_replace(["\r\n", "\t"], ["\n", '    '], $md));
    $out = [];
    $n = count($lines);
    for ($i = 0; $i < $n;) {
        $line = $lines[$i];
        if (trim($line) === '') { $i++; continue; }

        if (preg_match('/^```/', $line)) {
            $code = [];
            for ($i++; $i < $n && !preg_match('/^```/', $lines[$i]); $i++) $code[] = $lines[$i];
            $i++;
            $out[] = '<pre><code>' . e(implode("\n", $code)) . '</code></pre>';
            continue;
        }
        if (preg_match('/^(#{1,6})\s+(.+?)\s*#*$/', $line, $m)) {
            $lvl = strlen($m[1]);
            $out[] = "<h$lvl>" . md_inline($m[2]) . "</h$lvl>";
            $i++;
            continue;
        }
        if (preg_match('/^\s{0,3}([-*_])(\s*\1){2,}\s*$/', $line)) { $out[] = '<hr>'; $i++; continue; }
        if (preg_match('/^>\s?/', $line)) {
            $quote = [];
            for (; $i < $n && preg_match('/^>\s?(.*)$/', $lines[$i], $m); $i++) $quote[] = $m[1];
            $out[] = "<blockquote>\n" . markdown(implode("\n", $quote)) . "\n</blockquote>";
            continue;
        }
        if (preg_match('/^\s*([-*+]|\d+[.)])\s+/', $line, $m)) {
            $ordered = ctype_digit($m[1][0]);
            $items = [];
            for (; $i < $n; $i++) {
                if (preg_match('/^\s*(?:[-*+]|\d+[.)])\s+(.*)$/', $lines[$i], $im)) { $items[] = $im[1]; continue; }
                if (trim($lines[$i]) !== '' && preg_match('/^\s{2,}\S/', $lines[$i]) && $items) { $items[count($items) - 1] .= ' ' . trim($lines[$i]); continue; }
                break;
            }
            $tag = $ordered ? 'ol' : 'ul';
            $out[] = "<$tag>\n" . implode("\n", array_map(fn($it) => '<li>' . md_inline($it) . '</li>', $items)) . "\n</$tag>";
            continue;
        }
        if (str_contains($line, '|') && $i + 1 < $n && preg_match('/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/', $lines[$i + 1])) {
            $row = fn($l) => array_map('trim', explode('|', trim(trim($l), '|')));
            $head = $row($line);
            $html = '<table><thead><tr>' . implode('', array_map(fn($c) => '<th>' . md_inline($c) . '</th>', $head)) . '</tr></thead><tbody>';
            for ($i += 2; $i < $n && str_contains($lines[$i], '|') && trim($lines[$i]) !== ''; $i++) {
                $html .= '<tr>' . implode('', array_map(fn($c) => '<td>' . md_inline($c) . '</td>', $row($lines[$i]))) . '</tr>';
            }
            $out[] = $html . '</tbody></table>';
            continue;
        }
        $para = [];
        for (; $i < $n && trim($lines[$i]) !== '' && !preg_match('/^(#{1,6}\s|>|```|\s*([-*+]|\d+[.)])\s+)/', $lines[$i]); $i++) $para[] = trim($lines[$i]);
        $out[] = '<p>' . md_inline(implode("\n", $para)) . '</p>';
    }
    return implode("\n", $out);
}

function md_inline(string $s): string
{
    $codes = [];
    $s = preg_replace_callback('/`([^`]+)`/', function ($m) use (&$codes) {
        $codes[] = '<code>' . e($m[1]) . '</code>';
        return "\x01" . (count($codes) - 1) . "\x01";
    }, $s);
    $s = e($s);
    $s = preg_replace_callback('/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;(.*?)&quot;)?\)/', function ($m) {
        $href = html_entity_decode($m[2], ENT_QUOTES);
        if (preg_match('/^\s*(javascript|data|vbscript):/i', $href)) $href = '#';
        return '<a href="' . e($href) . '"' . (!empty($m[3]) ? ' title="' . $m[3] . '"' : '') . '>' . $m[1] . '</a>';
    }, $s);
    $s = preg_replace('/\*\*(.+?)\*\*|__(.+?)__/s', '<strong>$1$2</strong>', $s);
    $s = preg_replace('/(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)|(?<![\w_])_(?!\s)(.+?)(?<!\s)_(?!\w)/s', '<em>$1$2</em>', $s);
    $s = preg_replace('/ {2,}\n/', "<br>\n", $s);
    return preg_replace_callback("/\x01(\d+)\x01/", fn($m) => $codes[(int) $m[1]], $s);
}

function reading_minutes(string $html): int
{
    $words = preg_split('/\s+/', trim(strip_tags(str_replace('<', ' <', $html))), -1, PREG_SPLIT_NO_EMPTY);
    return max(1, (int) round(count($words) / 220));
}
