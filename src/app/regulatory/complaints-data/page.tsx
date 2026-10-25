import { readFileSync } from "node:fs";
import path from "node:path";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Investor Complaints Data", description: "Monthly data on investor complaints received and resolved by Dhanvesttor, in the format prescribed by SEBI for portfolio managers.", path: "/regulatory/complaints-data" });

type Data = { asOf: string; note: string; rows: Record<string, string | number>[]; trend: Record<string, string | number>[] };

export default function Complaints() {
  const d: Data = JSON.parse(readFileSync(path.join(process.cwd(), "content/complaints.json"), "utf8"));
  return (
    <LegalPage title="Complaints data" path="/regulatory/complaints-data" lede={`Data for the month ending ${d.asOf}. ${d.note}`}>
      <h2>For the month</h2>
      <table>
        <thead><tr><th>Received from</th><th>Pending at start</th><th>Received</th><th>Resolved</th><th>Total pending</th><th>Pending &gt; 3 months</th><th>Avg. resolution (days)</th></tr></thead>
        <tbody>{d.rows.map((r) => <tr key={String(r.receivedFrom)}><td>{r.receivedFrom}</td><td>{r.pendingAtStart}</td><td>{r.received}</td><td>{r.resolved}</td><td>{r.totalPending}</td><td>{r.pendingOver3Months}</td><td>{r.avgResolutionDays}</td></tr>)}</tbody>
      </table>
      <h2>Monthly trend</h2>
      <table>
        <thead><tr><th>Month</th><th>Carried forward</th><th>Received</th><th>Resolved</th><th>Pending</th></tr></thead>
        <tbody>{d.trend.map((r) => <tr key={String(r.month)}><td>{r.month}</td><td>{r.carried}</td><td>{r.received}</td><td>{r.resolved}</td><td>{r.pending}</td></tr>)}</tbody>
      </table>
    </LegalPage>
  );
}
