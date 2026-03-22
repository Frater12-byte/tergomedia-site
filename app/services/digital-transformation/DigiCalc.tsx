"use client";
import { Calculator } from "@/components/Graphics";

export default function DigiCalc() {
  return (
    <Calculator
      labelA="Hours saved / month"
      labelB="Value recovered"
      prefixB="AED "
      sl1Label="Team size"
      sl1Min={2} sl1Max={60} sl1Val={12}
      sl2Label="Admin hrs / day"
      sl2Min={1} sl2Max={6} sl2Val={3}
      formulaA={(s1: number, s2: number) => s1 * s2 * 0.65 * 22}
      formulaB={(s1: number, s2: number) => s1 * s2 * 0.65 * 22 * 300}
    />
  );
}
