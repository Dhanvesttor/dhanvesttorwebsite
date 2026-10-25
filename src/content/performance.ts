/**
 * The ONLY place PMS returns are stored. Rendered on /pms/faith-fund with the SEBI
 * disclaimer. Update from the latest disclosure document / SEBI monthly report.
 * Leave a cell null to show a dash.
 */
export const performance = {
  asOf: "30 September 2026",
  source: "SEBI monthly report / PMS Bazaar, TWRR, net of fees",
  rows: [
    { period: "1 year", fund: 1.55, benchmark: null },
    { period: "2 years", fund: -3.93, benchmark: null },
    { period: "3 years", fund: null, benchmark: null },
    { period: "5 years", fund: null, benchmark: null },
    { period: "Since inception (Apr 2024)", fund: 9.17, benchmark: 7.96 },
  ] as { period: string; fund: number | null; benchmark: number | null }[],
};
