/**
 * Facts still awaiting confirmation from Dhanvesttor. Every page that shows one
 * of these reads from here, so a confirmed value is a one-line change.
 */
export const TODO = {
  clcbReach: "1 lakh+",
  clcbReachConfirmed: false,
  clcbWorkshops: null as string | null,
  clcbCities: null as string | null,
  clcbPartners: [] as string[],
  advisers: [] as { name: string; role: string; bio: string }[],
  insuranceLicence: "" as string, // e.g. "IRDAI Direct Broker (General), Licence No. ..."
  insuranceProducts: [] as string[],
  bondsScope: [] as string[], // e.g. ["Government securities", "Corporate bonds", "NCDs", "Corporate FDs"]
  faithSinceInceptionFund: "9.17%",
  faithSinceInceptionBenchmark: "7.96%",
  faithPerformanceAsOf: "", // date on the disclosure document the figures come from
} as const;

export const hasTodo = (v: unknown) =>
  v === "" || v === null || (Array.isArray(v) && v.length === 0);
