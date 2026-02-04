import React, { useMemo, useState } from "react";

type Tab = "algorithm" | "about" | "evidence";

type YesNo = "" | "yes" | "no";

type Inputs = {
  painLocalized: YesNo;
  tinels: YesNo;
  sensoryChange: YesNo;
  motorDeficit: YesNo;
  ultrasound: YesNo;
  mri: YesNo;
  diagnosticBlock: YesNo;
  durationMonths: "" | "0-3" | "3-6" | "6+";
  failedNonOp: YesNo;
  neuromaType: "" | "terminal" | "endNeuroma" | "neuromaInContinuity" | "unknown";
};

const DEFAULT_INPUTS: Inputs = {
  painLocalized: "",
  tinels: "",
  sensoryChange: "",
  motorDeficit: "",
  ultrasound: "",
  mri: "",
  diagnosticBlock: "",
  durationMonths: "",
  failedNonOp: "",
  neuromaType: "",
};

function scoreScreening(i: Inputs): number {
  let s = 0;
  if (i.painLocalized === "yes") s += 2;
  if (i.tinels === "yes") s += 2;
  if (i.sensoryChange === "yes") s += 1;
  if (i.ultrasound === "yes") s += 1;
  if (i.diagnosticBlock === "yes") s += 2;
  return s;
}

const HandNeuromaAlgorithm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("algorithm");
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);

  const screeningScore = useMemo(() => scoreScreening(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setInputs(DEFAULT_INPUTS);

  const recommendation = useMemo(() => {
    const likelyNeuroma = screeningScore >= 5;
    if (!likelyNeuroma) {
      return {
        title: "Neuroma less likely – broaden differential",
        body: [
          "Consider alternate pain generators (joint pathology, tendon, CRPS, compressive neuropathy, etc.).",
          "If clinical suspicion persists, add imaging and/or diagnostic block.",
        ],
      };
    }

    // Non-op first unless clearly surgical scenario
    const adequateNonOpTrial =
      inputs.durationMonths === "3-6" || inputs.durationMonths === "6+";

    if (!adequateNonOpTrial || inputs.failedNonOp !== "yes") {
      return {
        title: "Start / optimize non-operative management",
        body: [
          "Desensitization + hand therapy (graded exposure, scar/soft tissue mobilization).",
          "Neuropathic pain meds as appropriate; consider topical options.",
          "Targeted injections (e.g., steroid/local anesthetic) may provide temporary relief.",
          "Reassess after an adequate trial (often ≥3–6 months unless urgent scenario).",
        ],
      };
    }

    // Surgical branch (simplified structure but not “thin”)
    const t = inputs.neuromaType;
    if (t === "terminal" || t === "endNeuroma") {
      return {
        title: "Operative pathway: terminal / end neuroma patterns",
        body: [
          "Goal: provide a physiologic target (reinnervation) and/or stable coverage to reduce recurrence.",
          "Consider techniques such as targeted muscle reinnervation (TMR) where anatomy allows, or other reconstructive options depending on nerve, location, and available targets.",
          "Address scar bed / soft tissue environment (coverage) and concurrent compressive lesions when present.",
        ],
      };
    }
    if (t === "neuromaInContinuity") {
      return {
        title: "Operative pathway: neuroma-in-continuity patterns",
        body: [
          "Confirm pain generator (diagnostic block can help).",
          "Consider neurolysis/decompression when indicated; consider reconstruction strategies when there is loss of function or severe pain refractory to non-op.",
          "Plan based on sensory vs mixed/motor nerve, gap/segment quality, and local tissue bed.",
        ],
      };
    }

    return {
      title: "Operative planning (type unclear) – complete workup first",
      body: [
        "Clarify neuroma phenotype (clinical exam + imaging and/or block).",
        "Map sensory distribution and functional deficits.",
        "Then select the appropriate operative branch (terminal vs continuity vs other).",
      ],
    };
  }, [inputs, screeningScore]);

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
              Hand Neuroma Management Algorithms
            </h1>
            <div className="text-sm font-light tracking-wide uppercase mb-1">
              Interdisciplinary Care for Amputees Network
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

        {/* ALGORITHM */}
        {activeTab === "algorithm" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="bg-white p-6 rounded shadow border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0096B7]">
                    Screening & Workup
                  </h2>
                  <button
                    onClick={reset}
                    className="text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 font-medium"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "painLocalized", label: "Localized pain at suspected nerve site" },
                    { name: "tinels", label: "Positive Tinel’s sign" },
                    { name: "sensoryChange", label: "Sensory changes in nerve distribution" },
                    { name: "motorDeficit", label: "Motor deficit (if mixed/motor nerve)" },
                    { name: "ultrasound", label: "Ultrasound supports neuroma" },
                    { name: "mri", label: "MRI neurography supports neuroma" },
                    { name: "diagnosticBlock", label: "Diagnostic nerve block with >50% relief" },
                  ].map((q) => (
                    <div key={q.name}>
                      <label className="block text-sm font-semibold mb-1">
                        {q.label}
                      </label>
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
                    <label className="block text-sm font-semibold mb-1">
                      Duration of symptoms / treatment
                    </label>
                    <select
                      name="durationMonths"
                      value={inputs.durationMonths}
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
                    <label className="block text-sm font-semibold mb-1">
                      Failed adequate non-operative trial?
                    </label>
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

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Neuroma phenotype (if known)
                    </label>
                    <select
                      name="neuromaType"
                      value={inputs.neuromaType}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select…</option>
                      <option value="terminal">Terminal neuroma</option>
                      <option value="endNeuroma">End neuroma (post-transection)</option>
                      <option value="neuromaInContinuity">Neuroma-in-continuity</option>
                      <option value="unknown">Unknown / unclear</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white p-6 rounded shadow border">
                <h2 className="text-xl font-bold text-[#0096B7] mb-2">
                  Recommendation
                </h2>

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <div className="text-sm text-gray-700 font-medium">
                    Screening score (internal triage)
                  </div>
                  <div className="text-3xl font-extrabold text-[#0096B7]">
                    {screeningScore}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    This is not a validated score—used only for structured workflow.
                  </div>
                </div>

                <div className="border-l-4 border-[#0096B7] bg-blue-50 p-4 rounded">
                  <div className="font-bold text-lg text-gray-900">
                    {recommendation.title}
                  </div>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-800">
                    {recommendation.body.map((x, idx) => (
                      <li key={idx}>{x}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">About</h2>

            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm text-gray-800">
                This tool is designed to standardize evaluation and stepwise management of symptomatic neuromas
                in the hand/upper extremity, integrating clinical exam, imaging, diagnostic blocks, non-operative
                treatment, and operative pathway selection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border p-4 rounded shadow-sm">
                <div className="font-bold mb-2 text-[#0096B7]">Workflow</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Confirm pain generator (exam ± imaging ± block)</li>
                  <li>Trial structured non-operative care</li>
                  <li>For refractory cases, select operative branch by neuroma phenotype</li>
                </ul>
              </div>
              <div className="bg-white border p-4 rounded shadow-sm">
                <div className="font-bold mb-2 text-[#0096B7]">Clinical caveats</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Use as decision support—not as a substitute for judgment</li>
                  <li>Consider central sensitization / CRPS features when pain is disproportionate</li>
                  <li>Multi-disciplinary care often improves outcomes in complex patients</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* EVIDENCE */}
        {activeTab === "evidence" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Evidence Base</h2>

            <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4">
              <p className="font-medium text-sm">
                These algorithms are based on comprehensive literature review and expert consensus synthesizing
                current evidence on hand/upper extremity neuroma diagnosis and management.
              </p>
            </div>

            <h3 className="font-bold mt-4 mb-2">Diagnostic evidence (examples)</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Clinical exam (localized tenderness/percussion) remains central; combine findings to improve accuracy.</li>
                <li>Ultrasound and MRI neurography help localize/characterize neuromas when exam is equivocal.</li>
                <li>Diagnostic blocks: &gt;50% pain reduction supports neuroma as the pain generator.</li>
              </ul>
            </div>

            <h3 className="font-bold mt-4 mb-2">Non-operative management</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Desensitization/hand therapy and graded exposure are foundational.</li>
                <li>Neuropathic pain pharmacotherapy may reduce symptoms and improve rehab tolerance.</li>
                <li>Injections can be used selectively for temporary relief and diagnostic clarification.</li>
                <li>Typical minimum trial: ~3–6 months before escalating to surgery (unless urgent scenario).</li>
              </ul>
            </div>

            <h3 className="font-bold mt-4 mb-2">Operative outcomes (high-level)</h3>
            <div className="bg-gray-50 p-4 rounded">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Techniques that provide a physiologic target for regenerating axons (when feasible) tend to reduce recurrence vs simple excision.</li>
                <li>Recurrence varies by technique, nerve, and local tissue bed; coverage/scar environment matters.</li>
                <li>Match the operative strategy to neuroma phenotype (terminal vs continuity) and nerve function (sensory vs mixed/motor).</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandNeuromaAlgorithm;
