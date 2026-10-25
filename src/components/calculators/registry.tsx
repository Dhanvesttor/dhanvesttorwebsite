"use client";
import { SipCalculator, StepUpSipCalculator, LumpsumCalculator, SwpCalculator, StpCalculator, GoalCalculator, RetirementCalculator, ChildEducationCalculator, CagrCalculator, InflationCalculator, PmsFeeCalculator } from "./calculators";

const map: Record<string, React.ComponentType> = {
  sip: SipCalculator, "step-up-sip": StepUpSipCalculator, lumpsum: LumpsumCalculator, swp: SwpCalculator, stp: StpCalculator,
  goal: GoalCalculator, retirement: RetirementCalculator, "child-education": ChildEducationCalculator, cagr: CagrCalculator, inflation: InflationCalculator, "pms-fee": PmsFeeCalculator,
};

export function CalculatorBySlug({ slug }: { slug: string }) {
  const C = map[slug];
  return C ? <C /> : null;
}
