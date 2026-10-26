<?php
$meta = ['title' => 'Media Kit', 'description' => 'Dhanvesttor media kit: company facts, boilerplate, founder bio, logos and press contact.', 'path' => '/media/kit'];
$s = site();
$facts = [['Legal name', $s['legalName']], ['Brand', $s['name']], ['Founded', '2023 (LLP incorporated 8 May 2023)'], ['SEBI registration', "{$s['sebiReg']}, {$s['sebiRegDate']}"], ['Headquarters', 'Elgin, Kolkata'], ['Founder & CEO', 'Anooshka Soham Bathwal'], ['Co-founder & Managing Partner', 'Soham Bathwal'], ['Fund Manager', 'Ishan Daga'], ['Recognition', 'Startup India, DPIIT'], ['Press contact', $s['email']]];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Media', 'path' => '/media'], ['name' => 'Media kit', 'path' => '/media/kit']], 'eyebrow' => 'Media kit', 'title' => 'Facts, logos and <em>a contact.</em>']) ?>

<?= section([], function () use ($facts) { ?>
  <div class="grid gap-14 lg:grid-cols-2 [&>*]:min-w-0">
    <div>
      <h2 class="text-[1.9rem]">Boilerplate</h2>
      <p class="mt-4 text-[1.05rem] text-[#3f3d5c]">Dhanvesttor, operated by Driv Drisht LLP, is a SEBI-registered portfolio manager (INP000008570) headquartered in Kolkata. Founded by Anooshka Soham Bathwal, the firm offers portfolio management through its flagship FAITH Fund, mutual fund distribution across more than twenty fund houses, insurance and fixed income. Its Co-Learning and Community Building (CLCB) programme provides free financial education to women and girls across India.</p>
      <h2 class="mt-12 text-[1.9rem]">Logos</h2>
      <ul class="mt-4 grid gap-2 text-[15px]">
        <li><a class="text-raspberry underline underline-offset-4" href="/brand/logo.png" download>Full logo (PNG)</a></li>
        <li><a class="text-raspberry underline underline-offset-4" href="/brand/mark.png" download>Mark only (PNG)</a></li>
        <li><a class="text-raspberry underline underline-offset-4" href="/brand/wordmark.png" download>Wordmark (PNG)</a></li>
      </ul>
      <p class="mt-3 text-[13px] text-mist">Please do not recolour, stretch or add effects to the logo.</p>
    </div>
    <div>
      <h2 class="mb-4 text-[1.9rem]">Fact sheet</h2>
      <?= table_ui(['', ''], array_map(fn($r) => array_map('e', $r), $facts)) ?>
    </div>
  </div>
<?php }) ?>
