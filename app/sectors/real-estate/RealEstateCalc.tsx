"use client";
import { Calculator } from "@/components/Graphics";

export default function RealEstateCalc() {
  return (
    <Calculator
      labelA="Leads recovered / mo"
      labelB="Revenue unlocked"
      prefixB="AED "
      sl1Label="Monthly leads"
      sl1Min={10} sl1Max={300} sl1Val={80}
      sl2Label="Resp. time (hrs)"
      sl2Min={1} sl2Max={8} sl2Val={4}
      formulaA={(s1: number) => Math.round(s1 * 0.35)}
      formulaB={(s1: number) => Math.round(s1 * 0.35 * 1500)}
    />
  );
}
