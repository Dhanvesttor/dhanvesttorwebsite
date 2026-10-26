<?php
$meta = ['title' => 'CLCB: Free Financial Literacy Workshops for Women', 'description' => 'Co-Learning & Community Building (CLCB) by Dhanvesttor: free money workshops, learning circles and masterclasses for women in Kolkata, across Bengal and online.', 'path' => '/clcb'];

$events = cms_events(true);
$faqs = cms_faqs('clcb');
$photos = photos();
$todo = todo();
$stats = [];
if ($todo['clcbReachConfirmed'] || is_dev()) $stats[] = ['value' => $todo['clcbReach'], 'label' => 'women and girls reached', 'flag' => $todo['clcbReachConfirmed'] ? null : '⚠ confirm'];
$stats[] = ['value' => '₹0', 'label' => 'cost to attend, always'];
$stats[] = ['value' => '6', 'label' => 'programme formats, beginner to advanced'];
$stats[] = ['value' => '2 lakh', 'label' => 'women we aim to reach next, across North and West India'];
$why = [['Non-judgemental', "The only foolish question is the one you didn't ask."], ['For every stage', 'From a first savings account to a family portfolio.'], ['Real-world', 'Every session ends with one specific action.'], ['No pitch', 'Many participants never invest with us. That is fine.']];
$programmes = array_map(fn($p) => ['title' => $p['name'], 'blurb' => $p['text'], 'href' => '/clcb/programmes#' . $p['slug'], 'meta' => $p['who']], content('clcb')['programmes']);
?>
<?= page_hero(['tone' => 'sand', 'crumbs' => [['name' => 'CLCB', 'path' => '/clcb']], 'eyebrow' => 'Co-Learning & Community Building', 'title' => 'Every woman deserves to <em>understand</em> her money.',
    'lede' => 'CLCB is our purpose in action. Free workshops, learning circles and masterclasses where no question is too basic, no one is selling, and you leave with one thing you can do tomorrow.',
    'actions' => button('Join the community', ['href' => '/clcb/join']) . button('Upcoming sessions', ['href' => '/clcb/events', 'variant' => 'ghost']),
    'image' => $photos['clcbWorkshop']['label']]) ?>

<?= stat_band($stats, 'ivory') ?>

<?= section([], function () use ($why) { ?>
  <?= section_head(['align' => 'split', 'eyebrow' => 'Why CLCB exists', 'title' => 'Not a class. <em>A community.</em>',
      'lede' => 'Most women in India have been left out of their own financial conversations, by language, by complexity, by assumption. A woman unsure about investing resists a pitch, but readily joins a room of women asking the same questions. CLCB is that room.']) ?>
  <div class="grid gap-8 md:grid-cols-4">
    <?php foreach ($why as [$t, $b]): ?><div class="border-t-2 border-terracotta pt-5"><h3 class="text-[1.4rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'paper'], section_head(['align' => 'split', 'eyebrow' => 'Programmes', 'title' => 'Six ways <em>in.</em>']) . service_grid($programmes, 3)) ?>

<?= section([], '<div class="grid gap-12 lg:grid-cols-[1fr_1.3fr]">'
    . '<div class="grid grid-cols-2 gap-4 self-start">' . image_placeholder(['label' => $photos['clcbCircle']['label'], 'ratio' => '3/4']) . image_placeholder(['label' => $photos['clcbQuestion']['label'], 'ratio' => '3/4', 'class' => 'mt-12']) . '</div>'
    . '<div><div class="mb-6 flex items-end justify-between gap-4"><div><p class="eyebrow mb-2">Calendar</p><h2 class="text-[2.2rem]">Next <em>sessions.</em></h2></div>' . button('All events →', ['href' => '/clcb/events', 'variant' => 'link']) . '</div>'
    . event_list(array_slice($events, 0, 3)) . '</div></div>') ?>

<?= section(['tone' => 'sand'], '<div class="mx-auto max-w-[860px]"><p class="eyebrow mb-3">Questions</p><h2 class="mb-8 text-[2.2rem]">Before you <em>come.</em></h2>' . faq_list($faqs) . '</div>') ?>

<?= cta(['tone' => 'indigo', 'eyebrow' => 'Her Money, Her Growth', 'title' => 'Bring a friend, a sister, <em>your mother.</em>', 'lede' => 'Sessions are free and open to anyone who wants to understand money better.',
    'primary' => ['label' => 'Join the community', 'href' => '/clcb/join'], 'secondary' => ['label' => 'Partner with us', 'href' => '/clcb/partners']]) ?>
