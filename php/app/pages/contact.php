<?php
$meta = ['title' => 'Contact Dhanvesttor, Elgin, Kolkata', 'description' => 'Contact Dhanvesttor: 8/1/2 Sir UN Brahmachari Sarani, Elgin, Kolkata 700017. Call 033 2280 0152 or email ho@dhanvesttor.com.', 'path' => '/contact'];
$s = site();
?>
<?= json_ld(['@context' => 'https://schema.org', '@type' => 'ContactPage', 'url' => 'https://dhanvesttor.com/contact', 'mainEntity' => ['@id' => 'https://dhanvesttor.com/#organization']]) ?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Contact', 'path' => '/contact']], 'eyebrow' => 'Contact', 'title' => 'Let&#39;s start with <em>your</em> questions.',
    'lede' => "Whether you're thinking about PMS, starting a SIP, reviewing insurance, or just want to understand your money better, a person will reply within one working day."]) ?>
<?= contact_band(['tone' => 'sand', 'paths' => ['pms', 'mf', 'clcb', 'insurance', 'bonds'], 'heading' => 'Write to us.', 'lede' => "Or call, WhatsApp, or visit. We'd love to meet you."]) ?>

<?= section([], function () use ($s) { ?>
  <div class="grid gap-10 md:grid-cols-3">
    <div><p class="eyebrow mb-2">Office</p><p class="text-[1.05rem]"><?= e($s['address']['line1']) ?><br><?= e($s['address']['line2']) ?><br><?= e($s['address']['city'] . ' ' . $s['address']['pin'] . ', ' . $s['address']['state']) ?></p>
      <a href="https://maps.google.com/?q=Surabhi+Apartments+8/1/2+Sir+UN+Brahmachari+Sarani+Elgin+Kolkata+700017" target="_blank" rel="noopener" class="mt-3 inline-block text-[14px] text-raspberry underline underline-offset-4">Open in Maps ↗</a></div>
    <div><p class="eyebrow mb-2">Hours</p><?php foreach ($s['hours'] as $h): ?><p class="text-[1.05rem]"><?= e($h) ?></p><?php endforeach ?></div>
    <div><p class="eyebrow mb-2">Report fraud</p><p class="text-[1.05rem]">If someone contacts you claiming to be from Dhanvesttor and asks for money or passwords, write to <a href="mailto:<?= e($s['fraudEmail']) ?>" class="text-raspberry underline underline-offset-4"><?= e($s['fraudEmail']) ?></a>. We never ask for OTPs or passwords.</p></div>
  </div>
<?php }) ?>
