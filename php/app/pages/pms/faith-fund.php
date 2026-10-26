<?php
$meta = ['title' => 'Dhanvesttor FAITH Fund: Flexi-Cap PMS Strategy', 'description' => 'The Dhanvesttor FAITH Fund is a discretionary flexi-cap PMS strategy benchmarked to BSE 500 TRI. Investment framework, fees, performance and fund manager.', 'path' => '/pms/faith-fund'];

$pms = content('pms')['pms'];
$f = $pms['fees'];
$facts = [
    ['Strategy', "{$pms['strategy']}, {$pms['type']}"], ['Category', $pms['category']], ['Inception', $pms['inception']], ['Benchmark', $pms['benchmark']],
    ['Fund manager', "{$pms['fundManager']} (also Principal Officer)"], ['Custodian & fund accountant', $pms['custodian']], ['Minimum investment', $pms['minimum']], ['Mode of investment', $pms['mode']],
    ['Fixed fee', "{$f['fixedPct']}% a year, charged monthly"], ['Performance fee', "{$f['performancePct']}% above a {$f['hurdlePct']}% hurdle, with high-water mark"], ['Exit load', "{$f['exitLoadPct']}% on {$f['exitLoadWindow']}"], ['Operating expenses', "Up to {$f['operatingPct']}%"],
];
$d = disclaimers();
?>
<?= json_ld(['@context' => 'https://schema.org', '@type' => 'InvestmentFund', 'name' => $pms['fundName'], 'provider' => ['@id' => 'https://dhanvesttor.com/#organization'], 'feesAndCommissionsSpecification' => '2% fixed, 20% above 10% hurdle with high-water mark', 'url' => 'https://dhanvesttor.com/pms/faith-fund']) ?>
<?= page_hero(['tone' => 'indigo', 'crumbs' => [['name' => 'PMS', 'path' => '/pms'], ['name' => 'FAITH Fund', 'path' => '/pms/faith-fund']], 'eyebrow' => 'Dhanvesttor FAITH Fund', 'title' => 'A flexi-cap strategy with <em>five non-negotiables.</em>',
    'lede' => 'FAITH can own large, mid or small companies, across any sector, wherever the best opportunities sit. What it cannot do is buy a business that fails any of its five tests.',
    'actions' => button('Request the presentation', ['href' => '/contact', 'variant' => 'raspberry']) . button('Disclosure document', ['href' => '/regulatory/disclosure-document', 'variant' => 'light'])]) ?>

<?= section(['tone' => 'indigo', 'class' => 'grain'], faith_letters()) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'Fund facts', 'title' => 'Everything on <em>one page.</em>', 'lede' => 'These terms are set out in full in the Disclosure Document and your client agreement.'])
    . table_ui(['', 'Detail'], array_map(fn($r) => [e($r[0]), e($r[1])], $facts))) ?>

<?= section(['tone' => 'paper'], function () use ($pms) { ?>
  <div class="grid gap-12 lg:grid-cols-2">
    <div>
      <p class="eyebrow mb-3">We look for</p>
      <h2 class="text-[2.25rem]">What gets a company <em>in.</em></h2>
      <ul class="mt-6 grid gap-3"><?php foreach ($pms['dos'] as $x): ?><li class="flex gap-3 text-[1.05rem]"><span class="text-raspberry">✓</span><?= e($x) ?></li><?php endforeach ?></ul>
    </div>
    <div>
      <p class="eyebrow mb-3">The negative list</p>
      <h2 class="text-[2.25rem]">What keeps a company <em>out.</em></h2>
      <ul class="mt-6 grid gap-3"><?php foreach ($pms['donts'] as $x): ?><li class="flex gap-3 text-[1.05rem]"><span class="text-mist">✕</span><?= e($x) ?></li><?php endforeach ?></ul>
    </div>
  </div>
<?php }) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'Performance', 'title' => 'Shown the way <em>SEBI requires.</em>',
    'lede' => 'Returns are time-weighted, net of fees, and always shown against the benchmark. FY26 was a difficult year for Indian equities and FAITH posted negative returns, as most PMS strategies did. We would rather you hear that from us first.'])
    . performance_table()
    . '<p class="mt-6 text-[14.5px] text-[#3f3d5c]">For the latest month&#39;s figures, the sector and market-cap allocation, and the full factsheet, <a href="/contact" class="text-raspberry underline underline-offset-4">ask us for the current presentation</a>. Stock-level holdings are disclosed to clients every month.</p>') ?>

<?= section(['tone' => 'sand'], '<div class="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">'
    . '<div><p class="eyebrow mb-3">Fund manager</p><h2 class="text-[2.4rem]">Ishan Daga</h2><p class="mt-2 text-mist">Fund Manager &amp; Principal Officer</p></div>'
    . '<div class="text-[1.0625rem] text-[#3f3d5c]"><p>Nineteen years in financial research and fund management. Chancellor&#39;s Gold Medallist in M.Com and PGDM (Finance). Ranked top analyst by Bloomberg ANR for every stock under his coverage, and nominated for the Zee Business and Thomson Reuters analyst awards.</p>'
    . '<p class="mt-4">Supported by P. G. Singha, Senior Research Analyst, with seventeen years in equity research and portfolio management.</p>'
    . button('Full profile →', ['href' => '/about/team/ishan-daga', 'variant' => 'link', 'class' => 'mt-6']) . '</div></div>') ?>

<?= contact_band(['defaultPath' => 'pms', 'paths' => ['pms'], 'heading' => 'See the <em>current</em> portfolio picture.', 'lede' => 'We will send the latest presentation and walk you through it, including the months that did not go our way.']) ?>
<?= disclaimer($d['pmsPerformance'] . ' ' . $d['general']) ?>
