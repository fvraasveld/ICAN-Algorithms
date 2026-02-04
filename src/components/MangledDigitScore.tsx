import React, { useMemo, useState } from "react";

type YesNo = "" | "yes" | "no";

type Tab = "tool" | "about" | "evidence";

type CriteriaKey =
  | "multilevelInjury"
  | "crushAvulsion"
  | "psychiatric"
  | "intraarticular"
  | "flexorZoneII"
  | "smoker"
  | "dysvascular"
  | "bothDigitalNerves"
  | "asa34"
  | "dominantHand"
  | "proxPhalanxFx"
  | "skinDefect"
  | "ageOver50"
  | "middlePhalanxFx";

type CriteriaState = Record<CriteriaKey, YesNo>;

const DEFAULT_CRITERIA: CriteriaState = {
  multilevelInjury: "",
  crushAvulsion: "",
  psychiatric: "",
  intraarticular: "",
  flexorZoneII: "",
  smoker: "",
  dysvascular: "",
  bothDigitalNerves: "",
  asa34: "",
  dominantHand: "",
  proxPhalanxFx: "",
  skinDefect: "",
  ageOver50: "",
  middlePhalanxFx: "",
};

// Points per the paper table/tool (dominant hand is -5 in the tool figure)
const POINTS: Record<CriteriaKey, number> = {
  multilevelInjury: 9,
  crushAvulsion: 9,
  psychiatric: 7,
  intraarticular: 7,
  flexorZoneII: 7,
  smoker: 5,
  dysvascular: 5,
  bothDigitalNerves: 5,
  asa34: 5,
  dominantHand: -5,
  proxPhalanxFx: 5,
  skinDefect: 4,
  ageOver50: 4,
  middlePhalanxFx: 3,
};

const CRITERIA_META: Array<{
  key: CriteriaKey;
  label: string;
  points: number;
  helper?: string;
}> = [
  { key: "multilevelInjury", label: "Multilevel injury", points: POINTS.multilevelInjury, helper: "Injuries at multiple levels within the digit" },
  { key: "crushAvulsion", label: "Crush/avulsion mechanism", points: POINTS.crushAvulsion, helper: "High-energy injury with broad tissue damage" },
  { key: "psychiatric", label: "Psychiatric condition", points: POINTS.psychiatric, helper: "May affect rehab participation/compliance" },
  { key: "intraarticular", label: "Intraarticular fracture", points: POINTS.intraarticular, helper: "Joint involvement affecting motion" },
  { key: "flexorZoneII", label: "Flexor tendon injury (Zone II)", points: POINTS.flexorZoneII, helper: `"No man's land" - critical tendon function zone` },
  { key: "smoker", label: "Active smoker", points: POINTS.smoker, helper: "Impaired healing/microvascular outcomes" },
  { key: "dysvascular", label: "Dysvascular digit", points: POINTS.dysvascular, helper: "Compromised perfusion" },
  { key: "bothDigitalNerves", label: "Both digital nerves injured", points: POINTS.bothDigitalNerves, helper: "Bilateral sensibility loss" },
  { key: "asa34", label: "ASA score 3–4", points: POINTS.asa34, helper: "Systemic comorbidity burden" },
  { key: "dominantHand", label: "Dominant hand injury", points: POINTS.dominantHand, helper: "Functional weighting (protective)" },
  { key: "proxPhalanxFx", label: "Proximal phalanx fracture", points: POINTS.proxPhalanxFx },
  { key: "skinDefect", label: "Skin defect", points: POINTS.skinDefect },
  { key: "ageOver50", label: "Age > 50 years", points: POINTS.ageOver50 },
  { key: "middlePhalanxFx", label: "Middle phalanx fracture", points: POINTS.middlePhalanxFx },
];

function sumMDSS(criteria: CriteriaState): number {
  return (Object.keys(criteria) as CriteriaKey[]).reduce((total, key) => {
    const v = criteria[key];
    if (v === "yes") total += POINTS[key];
    return total;
  }, 0);
}

function interpretation(score: number): { label: string; color: string; detail: string } {
  if (score >= 35) {
    return {
      label: "Low likelihood of salvage (consider amputation)",
      color: "bg-red-50 border-red-400 text-red-800",
      detail: "MDSS ≥35: 88% specificity for amputation (paper tool threshold).",
    };
  }
  if (score < 25) {
    return {
      label: "High likelihood of salvage (consider salvage)",
      color: "bg-green-50 border-green-400 text-green-800",
      detail: "MDSS <25: 85% specificity for salvage (paper tool threshold).",
    };
  }
  return {
    label: "Intermediate zone (case-by-case)",
    color: "bg-yellow-50 border-yellow-400 text-yellow-900",
    detail: "MDSS 25–34: less predictable; interpret in clinical context (digit importance, multiple digits, etc.).",
  };
}

const MangledDigitScore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("tool");
  const [criteria, setCriteria] = useState<CriteriaState>(DEFAULT_CRITERIA);

  const score = useMemo(() => sumMDSS(criteria), [criteria]);
  const result = useMemo(() => interpretation(score), [score]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as CriteriaKey;
    setCriteria((prev) => ({
      ...prev,
      [key]: value as YesNo,
    }));
  };

  const reset = () => setCriteria(DEFAULT_CRITERIA);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header (same vibe as the TMR tool pages) */}
      <div className="bg-[#0096B7] text-white p-6 rounded-t-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white p-0.5 border-0.5 border-white mr-6">
              <img
                src="https://i.ibb.co/jv6z7D3d/ICAN-logo-copy-2.png"
                alt="ICAN"
                className="h-24 w-auto"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Mangled Digit Severity Score (MDSS)</h1>
              <div className="text-sm font-light tracking-wide uppercase mb-1">Interdisciplinary Care for Amputees Network</div>
              <div className="text-base font-medium">Evidence-Based Clinical Decision Support Tool</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-l border-r border-b">
        <div className="flex gap-2 p-3 border-b">
          {(["tool", "about", "evidence"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeTab === t ? "bg-[#0096B7] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {t === "tool" ? "Tool" : t === "about" ? "About" : "Evidence"}
            </button>
          ))}
        </div>

        {/* TOOL */}
        {activeTab === "tool" && (
          <div className="p-6">
            <div className={`border-l-4 p-4 rounded mb-6 ${result.color}`}>
              <div className="font-bold text-lg">{result.label}</div>
              <div className="text-sm mt-1">{result.detail}</div>
              <div className="mt-2 text-xl font-extrabold">MDSS Total: {score}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Criteria */}
              <div className="bg-white p-6 rounded shadow border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0096B7]">MDSS Criteria</h2>
                  <button
                    onClick={reset}
                    className="text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 font-medium"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  {CRITERIA_META.map((c) => (
                    <div key={c.key}>
                      <label className="block text-sm font-semibold mb-1">
                        {c.label} ({c.points > 0 ? `+${c.points}` : `${c.points}`} pts)
                      </label>
                      {c.helper && <div className="text-xs text-gray-600 mb-1">{c.helper}</div>}
                      <select
                        name={c.key}
                        value={criteria[c.key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                      >
                        <option value="">Select…</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Guidance */}
              <div className="bg-white p-6 rounded shadow border">
                <h2 className="text-xl font-bold text-[#0096B7] mb-4">How to Interpret</h2>

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <div className="font-semibold mb-2">Threshold guidance (paper tool)</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><span className="font-semibold">MDSS ≥35</span>: low likelihood of salvage (88% specificity for amputation)</li>
                    <li><span className="font-semibold">MDSS 25–34</span>: intermediate zone (use clinical judgement)</li>
                    <li><span className="font-semibold">MDSS &lt;25</span>: high likelihood of salvage (85% specificity for salvage)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7]">
                  <div className="font-semibold mb-2">Clinical context reminders</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Digit importance matters (e.g., thumb generally salvaged more aggressively).</li>
                    <li>Multiple severely injured digits may shift thresholds (aim to preserve pinch/grip where feasible).</li>
                    <li>Not intended for children; salvage typically attempted unless contraindicated.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">About the MDSS</h2>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm text-gray-800">
                The Mangled Digit Severity Score (MDSS) is a structured framework to support triage and shared
                decision-making for mangled digit injuries. It aggregates 14 clinical/injury characteristics into a single
                weighted score (range up to 70), with published performance for predicting amputation vs salvage.
              </p>
            </div>

            <h3 className="font-bold mt-6 mb-2 text-lg">The 14 criteria and weights</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Criterion</th>
                    <th className="border p-2 text-left">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA_META.map((c, idx) => (
                    <tr key={c.key} className={idx % 2 ? "bg-gray-50" : ""}>
                      <td className="border p-2">{c.label}</td>
                      <td className="border p-2 font-semibold">{c.points > 0 ? `+${c.points}` : `${c.points}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-gray-600 mt-3">
              Note: “Dominant hand injury” is a negative weight in the MDSS tool figure (protective weighting).
            </div>
          </div>
        )}

        {/* EVIDENCE */}
        {activeTab === "evidence" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Evidence Base</h2>

            <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4">
              <p className="font-medium text-sm">
                MDSS development used expert consensus (Delphi methodology) and retrospective validation
                demonstrating strong discrimination for predicting amputation (AUC 0.87).
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <h3 className="font-bold mb-2">Key performance (validation cohort)</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>AUC: 0.87 (excellent discrimination)</li>
                <li>At MDSS ≥35: Sensitivity 60%, Specificity 88%, PPV 75% for amputation</li>
                <li>At MDSS &lt;25: Specificity 85% for salvage; NPV 88%</li>
                <li>Salvage digits mean MDSS ~21 vs amputated digits ~35</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-2">Published thresholds (tool figure)</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Scores ≥35: consider amputation</li>
                <li>Scores 25–34: case-by-case</li>
                <li>Scores &lt;25: consider salvage</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangledDigitScore;
