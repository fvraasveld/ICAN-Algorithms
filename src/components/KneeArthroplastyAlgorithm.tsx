import React, { useMemo, useState } from "react";

type Tab = "algorithm" | "about" | "evidence";
type YesNo = "" | "yes" | "no";

type Inputs = {
  location: "" | "anterior" | "medial" | "lateral" | "posterior" | "diffuse";
  tinels: YesNo;
  allodynia: YesNo;
  numbness: YesNo;
  mechanicalSymptoms: YesNo;
  imagingIssue: YesNo; // component loosening, malalignment etc
  diagnosticBlock: YesNo;
  duration: "" | "0-3" | "3-6" | "6+";
  failedNonOp: YesNo;
};

const DEFAULT: Inputs = {
  location: "",
  tinels: "",
  allodynia: "",
  numbness: "",
  mechanicalSymptoms: "",
  imagingIssue: "",
  diagnosticBlock: "",
  duration: "",
  failedNonOp: "",
};

function triageScore(i: Inputs): number {
  let s = 0;
  if (i.location !== "") s += 1;
  if (i.tinels === "yes") s += 2;
  if (i.allodynia === "yes") s += 1;
  if (i.numbness === "yes") s += 1;
  if (i.diagnosticBlock === "yes") s += 2;
  if (i.imagingIssue === "yes") s -= 3; // points away from pure nerve pain
  return s;
}

const KneeArthroplastyAlgorithm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("algorithm");
  const [inputs, setInputs] = useState<Inputs>(DEFAULT);

  const score = useMemo(() => triageScore(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setInputs(DEFAULT);

  const plan = useMemo(() => {
    const nervePatternLikely = score >= 4;

    if (inputs.imagingIssue === "yes" || inputs.mechanicalSymptoms === "yes") {
      return {
        title: "Evaluate mechanical / arthroplasty causes first",
        steps: [
          "Rule out infection, loosening, malalignment, instability, patellar tracking issues.",
          "If present, manage arthroplasty pathology prior to (or alongside) nerve-directed care.",
        ],
      };
    }

    if (!nervePatternLikely) {
      return {
        title: "Nerve pain not clearly dominant – broaden evaluation",
        steps: [
          "Consider referred pain, tendinopathy, bursitis, radiculopathy, CRPS/central sensitization.",
          "If suspicion persists, add focused nerve exam and/or diagnostic block.",
        ],
      };
    }

    const adequateTrial = inputs.duration === "3-6" || inputs.duration === "6+";
    if (!adequateTrial || inputs.failedNonOp !== "yes") {
      return {
        title: "Start / optimize non-operative nerve-focused care",
        steps: [
          "PT with graded activity; desensitization for hypersensitivity.",
          "Neuropathic pain meds/topicals as appropriate.",
          "Consider targeted injection/nerve block (also diagnostic).",
          "Reassess after adequate trial (often ≥3–6 months).",
        ],
      };
    }

    return {
      title: "Consider surgical nerve-directed options (refractory cases)",
      steps: [
        "Confirm pain generator with diagnostic block (strongly recommended).",
        "Select strategy by suspected nerve and phenotype: decompression vs neurectomy vs combined.",
        "Account for sensory territory, scar bed, prior incisions, and patient goals.",
      ],
    };
  }, [inputs, score]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#0096B7] text-white p-6 rounded-t-lg shadow-lg">
        <div className="flex items-center">
          <div className="bg-white p-0.5 border-0.5 border-white mr-6">
            <img
              src="https://i.ibb.co/jv6z7D3d/ICAN-logo-copy-2.png"
              alt="ICAN"
              className="h-24 w-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              Knee Arthroplasty Nerve Management
            </h1>
            <div className="text-sm font-light tracking-wide uppercase mb-1">
              Interdisciplinary Care for Amputees Network
            </div>
            <div className="text-base font-medium">
              Peripheral nerve symptom pathway after knee arthroplasty
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-l border-r border-b">
        <div className="flex gap-2 p-3 border-b">
          {(["algorithm", "about", "evidence"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeTab === t
                  ? "bg-[#0096B7] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {t === "algorithm"
                ? "Algorithm"
                : t === "about"
                ? "About"
                : "Evidence"}
            </button>
          ))}
        </div>

        {/* Algorithm */}
        {activeTab === "algorithm" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="bg-white p-6 rounded shadow border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0096B7]">Assessment</h2>
                  <button
                    onClick={reset}
                    className="text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 font-medium"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Primary pain location</label>
                    <select
                      name="location"
                      value={inputs.location}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select…</option>
                      <option value="anterior">Anterior</option>
                      <option value="medial">Medial</option>
                      <option value="lateral">Lateral</option>
                      <option value="posterior">Posterior</option>
                      <option value="diffuse">Diffuse</option>
                    </select>
                  </div>

                  {[
                    { name: "tinels", label: "Tinel’s sign over suspected nerve territory" },
                    { name: "allodynia", label: "Allodynia/hypersensitivity" },
                    { name: "numbness", label: "Numbness/paresthesias in nerve distribution" },
                    { name: "mechanicalSymptoms", label: "Mechanical symptoms (instability/catching)" },
                    { name: "imagingIssue", label: "Imaging/labs suggest arthroplasty pathology" },
                    { name: "diagnosticBlock", label: "Targeted block provides meaningful relief" },
                  ].map((q) => (
                    <div key={q.name}>
                      <label className="block text-sm font-semibold mb-1">{q.label}</label>
                      <select
                        name={q.name}
                        value={(inputs as any)[q.name] as string}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                      >
                        <option value="">Select…</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold mb-1">Duration</label>
                    <select
                      name="duration"
                      value={inputs.duration}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select…</option>
                      <option value="0-3">0–3 months</option>
                      <option value="3-6">3–6 months</option>
                      <option value="6+">6+ months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Failed adequate non-op trial?</label>
                    <select
                      name="failedNonOp"
                      value={inputs.failedNonOp}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select…</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white p-6 rounded shadow border">
                <h2 className="text-xl font-bold text-[#0096B7] mb-2">Plan</h2>

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <div className="text-sm text-gray-700 font-medium">Triage score (internal)</div>
                  <div className="text-3xl font-extrabold text-[#0096B7]">{score}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Not a validated score; used only to structure the workflow.
                  </div>
                </div>

                <div className="border-l-4 border-[#0096B7] bg-blue-50 p-4 rounded">
                  <div className="font-bold text-lg text-gray-900">{plan.title}</div>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
                    {plan.steps.map((x, idx) => (
                      <li key={idx}>{x}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
                  <div className="font-semibold mb-1">Clinical note</div>
                  Nerve symptoms after knee arthroplasty can coexist with mechanical pathology—treat what’s driving
                  disability first, and confirm the pain generator (blocks help).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About */}
        {activeTab === "about" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">About</h2>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm text-gray-800">
                This tool supports a stepwise approach to evaluating and treating suspected peripheral nerve–mediated
                pain patterns after knee arthroplasty. It prioritizes exclusion of arthroplasty complications, structured
                non-operative treatment, and targeted procedural options in refractory cases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border p-4 rounded shadow-sm">
                <div className="font-bold mb-2 text-[#0096B7]">Core steps</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Rule out infection/loosening/malalignment/instability</li>
                  <li>Map symptoms to nerve territories + exam (Tinel’s, sensory)</li>
                  <li>Use diagnostic blocks to confirm generator</li>
                  <li>Non-operative optimization before surgery when appropriate</li>
                </ul>
              </div>
              <div className="bg-white border p-4 rounded shadow-sm">
                <div className="font-bold mb-2 text-[#0096B7]">When to escalate</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Refractory symptoms after adequate conservative trial</li>
                  <li>Clear generator supported by block and exam</li>
                  <li>Aligned goals (pain relief vs sensory trade-offs)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Evidence */}
        {activeTab === "evidence" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Evidence Base</h2>

            <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4">
              <p className="font-medium text-sm">
                The evidence for nerve-directed interventions after knee arthroplasty supports careful patient selection,
                generator confirmation (blocks), and technique matching (decompression vs neurectomy vs combined).
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <h3 className="font-bold mb-2">Principles supported across studies</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Confirming pain generator improves selection and outcomes.</li>
                <li>Decompression favored when entrapment suspected; neurectomy when painful neuroma/sensory nerve pathology dominates.</li>
                <li>Outcomes are sensitive to coexisting mechanical pathology and central sensitization features.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-2">Outcome reporting</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Track pain intensity and interference (e.g., NRS, PROMIS).</li>
                <li>Track function (PROMIS Physical Function) and QOL (EQ-5D).</li>
                <li>Report responder rates and complications (including sensory change).</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KneeArthroplastyAlgorithm;
