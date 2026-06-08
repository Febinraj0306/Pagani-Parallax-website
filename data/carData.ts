export interface SpecItem {
  label: string;
  value: string;
  category: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

export const carSpecs: SpecItem[] = [
  // Engine & Performance
  { label: "Engine", value: "Mercedes-AMG M120 V12", category: "Powerunit" },
  { label: "Displacement", value: "5987 cc", category: "Powerunit" },
  { label: "Power Output", value: "750 HP @ 7,500 RPM", category: "Powerunit" },
  { label: "Max Torque", value: "710 Nm @ 5,700 RPM", category: "Powerunit" },
  { label: "0 - 100 KM/H", value: "2.7 Seconds", category: "Performance" },
  { label: "Top Speed", value: "350 KM/H (217 MPH)", category: "Performance" },
  { label: "Power-to-Weight", value: "701 HP per Tonne", category: "Performance" },
  
  // Chassis & Aerodynamics
  { label: "Chassis", value: "Carbon-Titanium Monocoque", category: "Structure" },
  { label: "Dry Weight", value: "1,070 kg (2,359 lbs)", category: "Structure" },
  { label: "Transmission", value: "6-Speed Xtrac Sequential", category: "Structure" },
  { label: "Suspension", value: "Double A-Arm Pull-Rod", category: "Structure" },
  { label: "Brakes", value: "Brembo Carbon-Ceramic", category: "Structure" },
];

export const carFeatures: FeatureItem[] = [
  {
    id: "aero",
    title: "Active Aerodynamics",
    description: "Equipped with a motor-driven adjustable rear wing, flat underbody, and a massive rear diffuser producing up to 1,500 kg of downforce at 300 km/h.",
    metric: "1500 KG",
    metricLabel: "Downforce at 300 km/h"
  },
  {
    id: "chassis",
    title: "Carbon-Titanium Monocoque",
    description: "Developed exclusively by Pagani, the central cell weaves titanium threads directly into carbon fiber cloth, achieving extreme torsional rigidity and saving critical weight.",
    metric: "1070 KG",
    metricLabel: "Total Dry Weight"
  },
  {
    id: "exhaust",
    title: "Inconel Hydroformed Exhaust",
    description: "The ceramic-coated Inconel 625 exhaust system is hydroformed to minimize restriction. The resultant engine note matches that of classic Formula 1 machinery.",
    metric: "F1 SOUND",
    metricLabel: "Exhaust Signature"
  },
  {
    id: "track",
    title: "Track-Only Development",
    description: "Unbound by standard homologation limits, the Zonda R represents absolute engineering freedom. Created for pure, uncompromising performance on the world's most demanding race tracks.",
    metric: "6:47.5",
    metricLabel: "Nürburgring Nordschleife Lap Time"
  }
];

export const hudPhases = {
  hero: {
    model: "PAGANI ZONDA R",
    subtitle: "ARTE IN PISTA",
    price: "€1,500,000",
    availability: "LIMITED TO 15 UNITS",
    tagline: "Unconstrained by rules. Defined by track supremacy."
  },
  design: {
    title: "CARBON MONOCOQUE & DESIGN",
    description: "A central cell crafted from Carbo-Titanium provides unmatched torsional rigidity. Every curve, splitter, and intake is sculpted to master wind resistance and maximize downforce.",
    details: [
      { label: "CHASSIS MATERIAL", value: "CARBO-TITANIUM HP62" },
      { label: "TORSIONAL STIFFNESS", value: "46,000 NM/DEGREE" },
      { label: "AERO RATIO", value: "HIGH DOWNFORCE PROFILE" }
    ]
  },
  engine: {
    title: "AMG V12 HEART",
    description: "A naturally aspirated Mercedes-AMG 6.0L V12 racing engine. Light, high-revving, and bolted directly to the central chassis as a stressed structural member.",
    specs: [
      { label: "POWER", value: "750 HP @ 7500 RPM" },
      { label: "TORQUE", value: "710 NM @ 5700 RPM" },
      { label: "REDLINE", value: "8500 RPM" }
    ]
  }
};
