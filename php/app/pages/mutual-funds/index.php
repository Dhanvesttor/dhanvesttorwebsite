<?php
$meta = ['title' => 'Mutual Fund Investment in Kolkata: SIP from ₹5,000', 'description' => 'Invest in mutual funds with Dhanvesttor: goal-based plans, curated funds from 20+ fund houses including ICICI Prudential, HDFC, Kotak and Motilal Oswal. SIPs from ₹5,000.', 'path' => '/mutual-funds', 'scripts' => ['calculators']];

$photos = photos();
$cats = array_map(fn($c) => ['title' => $c['name'], 'blurb' => explode('. ', $c['lede'])[0] . '.', 'href' => '/mutual-funds/' . $c['slug'], 'meta' => $c['horizon']], mf_categories());
?>
<?= page_hero(['crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds']], 'eyebrow' => 'Mutual funds', 'title' => 'Twenty fund houses. <em>One shortlist</em> built around you.',
    'lede' => 'We begin with your goals, not a list of funds. Then we choose from more than twenty partner fund houses, set up your SIPs, and keep you invested through the moments that tempt everyone to stop.',
    'actions' => button('Start from ₹5,000 a month', ['href' => '/contact']) . button('How we select funds', ['href' => '/mutual-funds/how-we-select', 'variant' => 'ghost']),
    'image' => $photos['desk']['label'], 'imageSrc' => $photos['desk']['src']]) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'Why invest through us', 'title' => "The fee isn't for the buy button. <em>It's for the stop button.</em>",
    'lede' => 'Anyone can buy a fund. What helps is a plan that fits your life, a shortlist you can trust, and someone to call when markets fall.'])
    . service_grid([
        ['title' => 'Goal-based plans', 'blurb' => 'Every rupee has a job and a date: emergency, home, education, retirement.', 'href' => '/calculators/goal', 'meta' => 'Plan'],
        ['title' => 'Curated selection', 'blurb' => "We read factsheets from twenty houses and shortlist on process, not last year's return.", 'href' => '/mutual-funds/how-we-select', 'meta' => 'Select'],
        ['title' => 'Digital onboarding', 'blurb' => 'KYC, bank mandate and first SIP, usually within a day or two.', 'href' => '/mutual-funds/faqs', 'meta' => 'Start'],
        ['title' => 'A person to call', 'blurb' => 'A dedicated relationship manager and reviews when your life or the market changes.', 'href' => '/contact', 'meta' => 'Stay'],
    ], 4)) ?>

<?= section(['tone' => 'paper'], section_head(['align' => 'split', 'eyebrow' => 'Fund categories', 'title' => 'Match the fund to the <em>time</em> you have.', 'lede' => 'Short-term money and long-term money need different homes. Start here.'])
    . service_grid($cats, 3)) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'Ways to invest', 'title' => 'Monthly, all at once, <em>or gradually.</em>'])
    . step_list([
        ['title' => 'SIP', 'text' => 'A fixed amount every month. For salaried investors building without a large corpus.'],
        ['title' => 'Lumpsum', 'text' => 'A single investment, for a bonus, an inheritance or idle cash.'],
        ['title' => 'STP', 'text' => 'Park a lumpsum in debt and move it into equity month by month.'],
        ['title' => 'SWP', 'text' => 'Draw a regular income from a corpus while the rest stays invested.'],
    ], false, 4)
    . '<div class="mt-10 flex flex-wrap gap-3">' . button('All about SIPs', ['href' => '/mutual-funds/sip', 'variant' => 'ghost']) . button('STP &amp; SWP explained', ['href' => '/mutual-funds/stp-swp', 'variant' => 'ghost']) . '</div>') ?>

<?= section(['tone' => 'sand'], section_head(['align' => 'split', 'eyebrow' => 'Try it', 'title' => 'What does ₹10,000 a month <em>become?</em>']) . calculator('sip', true)) ?>

<?= section([], '<div class="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p class="eyebrow mb-3">Partners</p><h2 class="text-[2.4rem]">Fund houses we <em>work with.</em></h2></div>'
    . button('All partners', ['href' => '/mutual-funds/partners', 'variant' => 'ghost']) . '</div>' . logo_wall(array_slice(content('amcs')['amcs'], 0, 10), true)) ?>

<?= contact_band(['defaultPath' => 'mf', 'paths' => ['mf', 'pms', 'clcb'], 'heading' => "Start with one SIP. <em>We'll do the rest.</em>"]) ?>
<?= disclaimer(disclaimers()['mutualFunds']) ?>
