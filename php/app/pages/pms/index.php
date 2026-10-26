<?php
$meta = ['title' => 'Portfolio Management Services (PMS) in Kolkata', 'description' => "Dhanvesttor's SEBI-registered portfolio management service: a focused flexi-cap portfolio held in your own name, run under the FAITH framework. Minimum ₹50 lakh.", 'path' => '/pms'];

$faqs = array_slice(cms_faqs('pms'), 0, 5);
$photos = photos();
$pms = content('pms')['pms'];
?>
<?= page_hero(['crumbs' => [['name' => 'PMS', 'path' => '/pms']], 'eyebrow' => 'Portfolio Management Services', 'title' => 'Your own portfolio. <em>Explained</em>, then managed.',
    'lede' => 'With PMS you own the shares directly, in a demat account in your name. A named fund manager runs a focused strategy, and every month you see exactly what you own and why.',
    'actions' => button('Talk to us about PMS', ['href' => '/contact']) . button('The FAITH Fund', ['href' => '/pms/faith-fund', 'variant' => 'ghost']),
    'image' => $photos['research']['label'], 'imageSrc' => $photos['research']['src']]) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'How it differs', 'title' => 'A mutual fund is a pool. <em>PMS is yours.</em>',
    'lede' => 'Both are good ways to own Indian companies. PMS suits a larger, longer-term allocation where you want concentration, direct ownership and a manager you can speak to.'])
    . service_grid([
        ['title' => 'You own the shares', 'blurb' => 'Holdings sit in a dedicated demat account in your name, with Kotak Mahindra Bank as custodian.', 'href' => '/pms/faqs', 'meta' => 'Ownership'],
        ['title' => '15 to 30 companies', 'blurb' => 'A focused portfolio where every position has to earn its place under FAITH.', 'href' => '/pms/philosophy', 'meta' => 'Concentration'],
        ['title' => 'Monthly transparency', 'blurb' => 'Statements show every holding and trade. Quarterly reviews with the team.', 'href' => '/pms/faqs', 'meta' => 'Reporting'],
        ['title' => 'Fees aligned to you', 'blurb' => '2% fixed, and 20% only on returns above a 10% hurdle with a high-water mark.', 'href' => '/pms/fees', 'meta' => 'Fees'],
    ], 4)) ?>

<?= section(['tone' => 'indigo', 'class' => 'grain'], section_head(['light' => true, 'align' => 'split', 'eyebrow' => 'The FAITH framework', 'title' => 'Five questions. <em>No exceptions.</em>',
    'lede' => 'Fundamentals, Allocation of capital, Intrinsic value, Top management and moat, High principles.']) . reveal(faith_letters())) ?>

<?= section([], split_feature(['eyebrow' => 'The Dhanvesttor way', 'title' => 'Dream, Depend, <em>Develop</em>, Deliver.', 'image' => $photos['conversation']['label'], 'imageSrc' => $photos['conversation']['src'], 'imageAlt' => $photos['conversation']['alt'],
    'lede' => 'Our client process has four stages. It starts with what you want your money to do, not with a product.'], function () use ($pms) { ?>
  <ul class="grid gap-4">
    <?php foreach ($pms['fourDs'] as $d): ?>
      <li class="border-l-2 border-raspberry pl-4"><p class="font-display text-[1.35rem]"><?= e($d['title']) ?></p><p class="text-[15px] text-[#3f3d5c]"><?= e($d['text']) ?></p></li>
    <?php endforeach ?>
  </ul>
<?php })) ?>

<?= section(['tone' => 'paper'], section_head(['eyebrow' => 'Getting started', 'title' => 'From first call to first trade, <em>about ten days.</em>']) . step_list([
    ['title' => 'Conversation', 'text' => 'We understand your goals, existing investments, liquidity needs and risk comfort. No forms yet.'],
    ['title' => 'Disclosures', 'text' => 'You receive the Disclosure Document and client agreement to read before anything is signed.'],
    ['title' => 'Onboarding', 'text' => 'Our Compliance Officer opens your custody and dedicated PMS demat account with Kotak. 7 to 10 working days.'],
    ['title' => 'Investing', 'text' => 'You transfer funds or shares. The portfolio is built in tranches. Monthly reporting begins.'],
])) ?>

<?= section([], '<div class="grid gap-12 lg:grid-cols-[1fr_1.4fr]"><div><p class="eyebrow mb-3">Common questions</p><h2 class="text-[2.4rem]">What people ask <em>first.</em></h2>'
    . button('All PMS FAQs →', ['href' => '/pms/faqs', 'variant' => 'link', 'class' => 'mt-6']) . '</div>' . faq_list($faqs) . '</div>') ?>

<?= contact_band(['defaultPath' => 'pms', 'paths' => ['pms', 'mf'], 'heading' => 'Is PMS right for you <em>now?</em>', 'lede' => "Sometimes the honest answer is 'not yet'. A first conversation costs nothing and commits you to nothing."]) ?>
<?= disclaimer(disclaimers()['general']) ?>
