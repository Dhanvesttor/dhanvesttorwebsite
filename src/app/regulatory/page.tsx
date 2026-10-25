import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Regulatory Information", description: "Dhanvesttor (Driv Drisht LLP) regulatory information: SEBI portfolio manager registration INP000008570, principal and compliance officers, custodian and investor protection links.", path: "/regulatory" });

export default function Regulatory() {
  return (
    <LegalPage title="Regulatory information" path="/regulatory" lede="Everything a careful investor should be able to check about us, in one place." updated="October 2026">
      <h2>Registration</h2>
      <table><tbody>
        <tr><th>Legal entity</th><td>{site.legalName}, operating as {site.name}</td></tr>
        <tr><th>LLPIN</th><td>{site.llpin}</td></tr>
        <tr><th>SEBI Portfolio Manager registration</th><td>{site.sebiReg}, granted {site.sebiRegDate}</td></tr>
        <tr><th>Mutual fund distribution</th><td>AMFI-registered mutual fund distributor (ARN on request)</td></tr>
        <tr><th>Registered office</th><td>{site.address.line1}, {site.address.line2}, {site.address.city} {site.address.pin}</td></tr>
        <tr><th>Custodian & fund accountant (PMS)</th><td>Kotak Mahindra Bank</td></tr>
      </tbody></table>
      <h2>Key officers</h2>
      <table><tbody>
        <tr><th>Principal Officer</th><td>Ishan Daga</td></tr>
        <tr><th>Compliance Officer</th><td>Neha Verma · {site.email} · {site.phone}</td></tr>
      </tbody></table>
      <h2>Investor protection</h2>
      <ul>
        <li><a href="/regulatory/disclosure-document">Disclosure Document</a>, to be read before investing in PMS.</li>
        <li><a href="/regulatory/investor-charter">Investor charter</a> for portfolio management services.</li>
        <li><a href="/regulatory/grievance">Grievance redressal and escalation matrix</a>.</li>
        <li><a href="/regulatory/complaints-data">Monthly complaints data</a>.</li>
        <li>SEBI SCORES: <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener">scores.sebi.gov.in</a></li>
        <li>Online Dispute Resolution: <a href="https://smartodr.in" target="_blank" rel="noopener">smartodr.in</a></li>
      </ul>
      <p>Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.</p>
    </LegalPage>
  );
}
