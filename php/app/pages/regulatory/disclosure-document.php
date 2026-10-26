<?php
$meta = ['title' => 'PMS Disclosure Document', 'description' => 'Download the Dhanvesttor portfolio management services Disclosure Document as filed with SEBI.', 'path' => '/regulatory/disclosure-document'];

echo legal_page('Disclosure document', '/regulatory/disclosure-document', 'SEBI requires every portfolio manager to give prospective clients a Disclosure Document before they invest.', 'October 2026', function () { ?>
  <p>The Disclosure Document sets out our investment approach, fees and charges, risk factors, performance, the details of the portfolio manager and its key personnel, and any penalties or litigation. Please read it in full, along with the client agreement, before investing.</p>
  <p><a href="/documents/dhanvesttor-pms-disclosure-document.pdf" download>Download the Disclosure Document (PDF)</a></p>
  <p>If you would like a printed copy or someone to walk you through it, write to ho@dhanvesttor.com.</p>
<?php });
