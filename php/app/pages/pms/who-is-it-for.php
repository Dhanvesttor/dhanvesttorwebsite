<?php
$meta = ['title' => 'Who Is PMS For? Is It Right for You?', 'description' => 'Portfolio management suits investors with ₹50 lakh or more for equities, a long horizon and a wish to own shares directly. Here is how to tell if it is the right step for you.', 'path' => '/pms/who-is-it-for'];

$fits = [
    ["You have at least ₹50 lakh you won't need for five years or more", 'PMS is an equity allocation. Money for a home, a wedding or an emergency belongs elsewhere.'],
    ['You already own mutual funds and want a focused complement', 'Many of our PMS clients keep their SIPs running. PMS adds concentration and direct ownership to one part of the portfolio.'],
    ['You want to see and understand what you own', 'Monthly stock-level statements and quarterly conversations with the people who run your money.'],
    ['You are a business owner, professional, or managing family wealth', 'Including women who are taking over money decisions for the first time, after a career change, a sale, or a loss in the family.'],
];
$notYet = [
    ['You may need the money within three years', 'Equity can fall 30% in a year. Short-term money belongs in debt or fixed income.'],
    ['You have high-interest debt', 'Clearing a loan at 12% is a guaranteed return. Do that first.'],
    ["You don't yet have an emergency fund and insurance", 'Protection comes before growth.'],
    ["You'd lose sleep over a 20% fall", 'That is not a flaw. It is information. A hybrid mutual fund may suit you better today.'],
];
$list = fn(array $items, string $border) => '<ul class="grid gap-6">' . implode('', array_map(fn($x) => '<li class="border-l-2 ' . $border . ' pl-5"><h3 class="text-[1.3rem] leading-snug">' . e($x[0]) . '</h3><p class="mt-1.5 text-[15px] text-[#3f3d5c]">' . e($x[1]) . '</p></li>', $items)) . '</ul>';
?>
<?= page_hero(['crumbs' => [['name' => 'PMS', 'path' => '/pms'], ['name' => 'Who PMS is for', 'path' => '/pms/who-is-it-for']], 'eyebrow' => 'Is PMS right for you?', 'title' => 'The best PMS client is one who <em>knows why</em> she is here.',
    'lede' => "We say 'not yet' to some people who ask about PMS. Here is how we think about fit, so you can decide before you call us."]) ?>

<?= section([], '<div class="grid gap-16 lg:grid-cols-2">'
    . '<div>' . section_head(['eyebrow' => 'A good fit', 'title' => 'PMS may suit you <em>if…</em>', 'class' => 'mb-8']) . $list($fits, 'border-indigo') . '</div>'
    . '<div>' . section_head(['eyebrow' => 'Not yet', 'title' => 'Wait, or start elsewhere, <em>if…</em>', 'class' => 'mb-8']) . $list($notYet, 'border-terracotta') . '</div>'
    . '</div>') ?>

<?= cta(['title' => "Not sure? <em>That's the point</em> of a first conversation.", 'lede' => "We'll look at the whole picture and tell you honestly whether PMS, mutual funds or something else fits today.",
    'primary' => ['label' => 'Start a conversation', 'href' => '/contact'], 'secondary' => ['label' => 'Compare with mutual funds', 'href' => '/pms/pms-vs-mutual-funds']]) ?>
