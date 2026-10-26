<?php
$meta = ['title' => 'Grievance Redressal & Escalation Matrix', 'description' => 'How to raise a complaint with Dhanvesttor and escalate it: compliance officer, principal officer, SEBI SCORES and Online Dispute Resolution.', 'path' => '/regulatory/grievance'];
$s = site();

echo legal_page('Grievance redressal', '/regulatory/grievance', 'If something has gone wrong, we want to hear about it, and we want to fix it quickly.', 'October 2026', function () use ($s) { ?>
  <h2>How to raise a complaint</h2>
  <p>Write to us at <a href="mailto:<?= e($s['email']) ?>"><?= e($s['email']) ?></a> or call <?= e($s['phone']) ?> with your name, client code if you have one, and a description of the issue. We acknowledge every complaint and aim to resolve it within the timelines SEBI prescribes.</p>
  <h2>Escalation matrix</h2>
  <table>
    <thead><tr><th>Level</th><th>Contact</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Client service</td><td><?= e($s['email']) ?> · <?= e($s['phone']) ?></td></tr>
      <tr><td>2</td><td>Compliance Officer: Neha Verma</td><td><?= e($s['email']) ?> · <?= e($s['phone']) ?></td></tr>
      <tr><td>3</td><td>Principal Officer: Ishan Daga</td><td><?= e($s['email']) ?></td></tr>
      <tr><td>4</td><td>SEBI SCORES</td><td><a href="https://scores.sebi.gov.in" target="_blank" rel="noopener">scores.sebi.gov.in</a></td></tr>
      <tr><td>5</td><td>Online Dispute Resolution (SMART ODR)</td><td><a href="https://smartodr.in" target="_blank" rel="noopener">smartodr.in</a></td></tr>
    </tbody>
  </table>
  <p>If you are not satisfied with our response, you may lodge your complaint on SEBI SCORES. If still unresolved, you may initiate dispute resolution through the Online Dispute Resolution portal.</p>
  <h2>Fraud</h2>
  <p>To report someone impersonating Dhanvesttor, write to <a href="mailto:<?= e($s['fraudEmail']) ?>"><?= e($s['fraudEmail']) ?></a>.</p>
<?php });
