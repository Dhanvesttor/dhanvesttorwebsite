<?php
$meta = ['title' => 'Thank you', 'description' => 'We have received your message.', 'path' => '/thank-you', 'noIndex' => true];

$copy = [
    'enquiry' => ['title' => 'Thank you. We have your enquiry.', 'body' => 'A member of the team, not a bot, will reply within one working day. If it is urgent, call us on 033 2280 0152.', 'next' => ['Read our insights while you wait', '/insights']],
    'clcb' => ['title' => 'Welcome to the community.', 'body' => 'You will hear from us before the next session. Bring questions, not spreadsheets.', 'next' => ['See upcoming sessions', '/clcb/events']],
    'apply' => ['title' => 'Thank you for applying.', 'body' => 'Our HR team reads every application personally. If there is a fit, we will be in touch within two weeks.', 'next' => ['Life at Dhanvesttor', '/careers/life-at-dhanvesttor']],
    'newsletter' => ['title' => "You're on the list.", 'body' => 'The monthly letter is short, plain and never a sales pitch.', 'next' => ['Back to home', '/']],
];
$c = $copy[(string) ($_GET['for'] ?? 'enquiry')] ?? $copy['enquiry'];
?>
<?= section(['class' => 'min-h-[60vh]'], function () use ($c) { ?>
  <div class="max-w-[60ch]">
    <?= hairline('mb-6') ?>
    <p class="eyebrow mb-4">Received</p>
    <h1 class="text-[2.5rem] sm:text-[3.5rem]"><?= e($c['title']) ?></h1>
    <p class="mt-6 text-lg text-[#3f3d5c]"><?= e($c['body']) ?></p>
    <div class="mt-8 flex flex-wrap gap-3"><?= button(e($c['next'][0]), ['href' => $c['next'][1]]) ?><a href="/" class="inline-flex items-center px-2 text-sm text-raspberry underline underline-offset-4">Home</a></div>
  </div>
<?php }) ?>
