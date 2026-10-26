<?php
$meta = ['title' => 'Join CLCB: Free Money Community for Women', 'description' => "Join Dhanvesttor's CLCB community for free financial literacy sessions, learning circles and masterclasses. No sales pitch.", 'path' => '/clcb/join'];
?>
<?= page_hero(['compact' => true, 'tone' => 'sand', 'crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Join', 'path' => '/clcb/join']], 'eyebrow' => 'Join the community', 'title' => 'Free. No pitch. <em>Just the language of money.</em>']) ?>

<?= section([], function () { ?>
  <div class="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
    <div class="text-[1.0625rem] text-[#3f3d5c]">
      <h2 class="text-[2rem] text-ink">What happens next</h2>
      <ol class="mt-6 grid gap-5">
        <li><span class="font-display text-terracotta">01</span> We add you to the community list for your city.</li>
        <li><span class="font-display text-terracotta">02</span> You hear about the next session that suits where you are, by WhatsApp or email.</li>
        <li><span class="font-display text-terracotta">03</span> You come, ask anything, and leave with one specific action.</li>
      </ol>
      <p class="mt-8 text-[14px] text-mist">We never share your details and we will not call you about products unless you ask us to.</p>
    </div>
    <?= clcb_join_form() ?>
  </div>
<?php }) ?>
