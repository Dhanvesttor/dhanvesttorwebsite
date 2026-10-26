<?php
$meta = ['title' => 'Investor Complaints Data', 'description' => 'Monthly data on investor complaints received and resolved by Dhanvesttor, in the format prescribed by SEBI for portfolio managers.', 'path' => '/regulatory/complaints-data'];
$d = cms_data('complaints.json');

echo legal_page('Complaints data', '/regulatory/complaints-data', "Data for the month ending {$d['asOf']}. {$d['note']}", null, function () use ($d) { ?>
  <h2>For the month</h2>
  <table>
    <thead><tr><th>Received from</th><th>Pending at start</th><th>Received</th><th>Resolved</th><th>Total pending</th><th>Pending &gt; 3 months</th><th>Avg. resolution (days)</th></tr></thead>
    <tbody><?php foreach ($d['rows'] as $r): ?><tr><td><?= e($r['receivedFrom']) ?></td><td><?= e($r['pendingAtStart']) ?></td><td><?= e($r['received']) ?></td><td><?= e($r['resolved']) ?></td><td><?= e($r['totalPending']) ?></td><td><?= e($r['pendingOver3Months']) ?></td><td><?= e($r['avgResolutionDays']) ?></td></tr><?php endforeach ?></tbody>
  </table>
  <h2>Monthly trend</h2>
  <table>
    <thead><tr><th>Month</th><th>Carried forward</th><th>Received</th><th>Resolved</th><th>Pending</th></tr></thead>
    <tbody><?php foreach ($d['trend'] as $r): ?><tr><td><?= e($r['month']) ?></td><td><?= e($r['carried']) ?></td><td><?= e($r['received']) ?></td><td><?= e($r['resolved']) ?></td><td><?= e($r['pending']) ?></td></tr><?php endforeach ?></tbody>
  </table>
<?php });
