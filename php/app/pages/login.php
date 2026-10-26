<?php
$meta = ['title' => 'Investor Login', 'description' => 'Log in to your Dhanvesttor investor portal for mutual funds and consolidated holdings, or to the Kotak PMS portal for portfolio management.', 'path' => '/login'];
$s = site();
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Login', 'path' => '/login']], 'eyebrow' => 'Investor login', 'title' => 'Your portfolio, <em>any time.</em>', 'lede' => 'Two portals, depending on what you hold with us.']) ?>

<?= section([], function () use ($s) { ?>
  <div class="grid gap-6 md:grid-cols-2">
    <a href="<?= e($s['loginUrl']) ?>" target="_blank" rel="noopener" class="group rounded-2xl bg-indigo p-8 text-ivory transition-transform hover:-translate-y-1">
      <p class="eyebrow text-marigold">Mutual funds &amp; consolidated view</p><h2 class="mt-4 text-[2.2rem]">Investor login <span aria-hidden="true">↗</span></h2>
      <p class="mt-3 text-ivory/80">SIPs, holdings, transactions and statements across all your mutual funds.</p>
    </a>
    <a href="<?= e($s['pmsLoginUrl']) ?>" target="_blank" rel="noopener" class="group rounded-2xl border border-line bg-white p-8 transition-transform hover:-translate-y-1">
      <p class="eyebrow">Portfolio management</p><h2 class="mt-4 text-[2.2rem]">PMS login <span aria-hidden="true">↗</span></h2>
      <p class="mt-3 text-[#3f3d5c]">Your PMS holdings and statements, through our custodian Kotak Mahindra Bank.</p>
    </a>
  </div>
  <p class="mt-8 max-w-[70ch] text-[14px] text-mist">Trouble logging in? Call <?= e($s['phone']) ?> or write to <?= e($s['email']) ?>. Dhanvesttor will never ask for your password or an OTP by phone, email or WhatsApp.</p>
<?php }) ?>
