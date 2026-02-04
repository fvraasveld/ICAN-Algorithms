import React, { useState, useEffect, ChangeEvent } from "react";

type YesNo = "" | "yes" | "no";

type ScreeningCriteria = {
  clinicalSuspicion: YesNo;
  tinel: YesNo;
  pain: YesNo;
  sensoryDeficit: YesNo;
};

type NonOpCriteria = {
  gabapentinoids: YesNo;
  nsaids: YesNo;
  topicalMedications: YesNo;
  desensitization: YesNo;
  physicalTherapy: YesNo;
};

type OpCriteria = {
  failedConservative: YesNo;
  functionalImpairment: YesNo;
  locationIdentified: YesNo;
  neuromaType: YesNo;
};

const HandNeuromaAlgorithm = () => {
  // State for active main tab
  const [activeTab, setActiveTab] = useState("algorithms");

  // State for active algorithm tab
  const [activeAlgorithm, setActiveAlgorithm] = useState("screening");

  // State for Screening Algorithm
  const [screeningCriteria, setScreeningCriteria] = useState<ScreeningCriteria>({
    clinicalSuspicion: "",
    tinel: "",
    pain: "",
    sensoryDeficit: "",
  });

  const [screeningResult, setScreeningResult] = useState("");
  const [screeningColor, setScreeningColor] = useState("");
  const [screeningFilled, setScreeningFilled] = useState(false);

  // State for Non-Operative Algorithm
  const [nonOpCriteria, setNonOpCriteria] = useState<NonOpCriteria>({
    gabapentinoids: "",
    nsaids: "",
    topicalMedications: "",
    desensitization: "",
    physicalTherapy: "",
  });

  const [nonOpResult, setNonOpResult] = useState("");
  const [nonOpColor, setNonOpColor] = useState("");
  const [nonOpFilled, setNonOpFilled] = useState(false);

  // State for Operative Algorithm
  const [opCriteria, setOpCriteria] = useState<OpCriteria>({
    failedConservative: "",
    functionalImpairment: "",
    locationIdentified: "",
    neuromaType: "",
  });

  const [opResult, setOpResult] = useState("");
  const [opRecommendations, setOpRecommendations] = useState<string[]>([]);
  const [opColor, setOpColor] = useState("");
  const [opFilled, setOpFilled] = useState(false);

  // Handle screening input changes
const handleScreeningChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;

  setScreeningCriteria((prev) => ({
    ...prev,
    [name as keyof ScreeningCriteria]: value as YesNo,
  }));
};

const handleNonOpChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;

  setNonOpCriteria((prev) => ({
    ...prev,
    [name as keyof NonOpCriteria]: value as YesNo,
  }));
};

const handleOpChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;

  setOpCriteria((prev) => ({
    ...prev,
    [name as keyof OpCriteria]: value as YesNo,
  }));
};

  // Calculate screening results
  useEffect(() => {
    const allValues = Object.values(screeningCriteria);
    setScreeningFilled(allValues.every((field) => field !== ""));

    if (screeningFilled) {
      const positiveCount = Object.values(screeningCriteria).filter(
        (val) => val === "yes"
      ).length;

      if (positiveCount >= 3) {
        setScreeningResult("HIGH likelihood of symptomatic neuroma");
        setScreeningColor("bg-red-100 border-red-500 text-red-800");
      } else if (positiveCount === 2) {
        setScreeningResult(
          "MODERATE likelihood of symptomatic neuroma - Consider additional diagnostic workup"
        );
        setScreeningColor("bg-yellow-100 border-yellow-500 text-yellow-800");
      } else {
        setScreeningResult(
          "LOW likelihood of symptomatic neuroma - Consider alternative diagnoses"
        );
        setScreeningColor("bg-green-100 border-green-500 text-green-800");
      }
    }
  }, [screeningCriteria, screeningFilled]);

  // Calculate non-operative results
  useEffect(() => {
    const allValues = Object.values(nonOpCriteria);
    setNonOpFilled(allValues.every((field) => field !== ""));

    if (nonOpFilled) {
      const triedCount = Object.values(nonOpCriteria).filter(
        (val) => val === "yes"
      ).length;

      if (triedCount >= 4) {
        setNonOpResult(
          "Comprehensive non-operative management completed - Consider surgical intervention if symptoms persist"
        );
        setNonOpColor("bg-blue-100 border-blue-500 text-blue-800");
      } else if (triedCount >= 2) {
        setNonOpResult(
          "Partial non-operative management - Consider additional modalities before surgery"
        );
        setNonOpColor("bg-yellow-100 border-yellow-500 text-yellow-800");
      } else {
        setNonOpResult(
          "Minimal non-operative management - Optimize conservative treatment before considering surgery"
        );
        setNonOpColor("bg-orange-100 border-orange-500 text-orange-800");
      }
    }
  }, [nonOpCriteria, nonOpFilled]);

  // Calculate operative results
  useEffect(() => {
    const allValues = Object.values(opCriteria);
    setOpFilled(allValues.every((field) => field !== ""));

    if (opFilled) {
      const { failedConservative, functionalImpairment, locationIdentified, neuromaType } = opCriteria;

      if (
        failedConservative === "yes" &&
        functionalImpairment === "yes" &&
        locationIdentified === "yes"
      ) {
        setOpResult("Surgical intervention INDICATED");
        setOpColor("bg-green-100 border-green-500 text-green-800");

        // Provide recommendations based on neuroma type
        let recommendations = [];
        if (neuromaType === "terminal") {
          recommendations = [
            "Terminal neuroma in non-weight bearing location",
            "Primary surgical options:",
            "• Targeted Muscle Reinnervation (TMR) - preferred for motor nerve",
            "• Nerve burial into bone",
            "• Nerve burial into muscle",
            "• Nerve transposition away from scar/trauma zone",
            "Consider nerve cap or conduit for additional coverage",
          ];
        } else if (neuromaType === "continuity") {
          recommendations = [
            "Neuroma-in-continuity",
            "Primary surgical options:",
            "• Internal neurolysis if nerve partially intact",
            "• Nerve reconstruction with autograft if complete disruption",
            "• Consider allograft for short gaps (<3cm)",
            "• Conduit for sensory nerves with small gaps",
            "Postoperative: Early protected mobilization, desensitization",
          ];
        } else if (neuromaType === "weightBearing") {
          recommendations = [
            "Neuroma in weight-bearing location (requires special consideration)",
            "Primary surgical options:",
            "• TMR preferred if suitable motor target available",
            "• Nerve transposition to non-weight bearing area (most important)",
            "• Nerve burial into bone (calcaneus for plantar foot)",
            "• Consider RPNi (Regenerative Peripheral Nerve Interface)",
            "Avoid: Leaving neuroma in weight-bearing location",
          ];
        } else if (neuromaType === "multiple") {
          recommendations = [
            "Multiple neuromas present",
            "Surgical approach:",
            "• Address all symptomatic neuromas in single stage if possible",
            "• Prioritize most symptomatic neuroma if staged approach needed",
            "• Use varied techniques (TMR, burial, transposition) for different nerves",
            "• Consider regional pain management consultation",
            "• Comprehensive desensitization therapy postoperatively",
          ];
        }
        setOpRecommendations(recommendations);
      } else {
        setOpResult("Surgical intervention NOT indicated at this time");
        setOpColor("bg-red-100 border-red-500 text-red-800");

        let recommendations = [];
        if (failedConservative === "no") {
          recommendations.push(
            "Continue non-operative management (minimum 3-6 months recommended)"
          );
        }
        if (functionalImpairment === "no") {
          recommendations.push(
            "Functional impairment insufficient to warrant surgical risk"
          );
        }
        if (locationIdentified === "no") {
          recommendations.push(
            "Require definitive localization with imaging or diagnostic injection before surgery"
          );
        }
        setOpRecommendations(recommendations);
      }
    }
  }, [opCriteria, opFilled]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded">
        <strong>Note:</strong> This tool should be used as a supplement to, not
        a replacement for, clinical judgment.
      </div>

      {/* Header with ICAN styling and logo */}
      <div className="bg-[#0096B7] text-white p-5 rounded-t-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white p-0.5 border-0.5 border-white mr-4">
              <img
                src="https://i.ibb.co/jv6z7D3d/ICAN-logo-copy-2.png"
                alt="ICAN"
                className="h-28 w-auto"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                ICAN/Algorithms
              </h1>
              <div className="text-xs mt-1 font-light tracking-wide uppercase">
                Interdisciplinary Care for Amputees Network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title bar */}
      <div className="bg-white border-l border-r p-4">
        <h2 className="text-2xl font-bold text-[#0096B7]">
          Hand Neuroma Management Algorithms
        </h2>
        <p className="text-gray-600">
          Evidence-based approach to diagnosis and treatment of symptomatic
          neuromas
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex border-l border-r bg-white">
        <button
          className={`px-4 py-2 ${
            activeTab === "algorithms"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("algorithms")}
        >
          Clinical Algorithms
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "about"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "evidence"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("evidence")}
        >
          Evidence
        </button>
      </div>

      {activeTab === "algorithms" && (
        <div className="bg-gray-50 border-l border-r border-b">
          {/* Algorithm Selection Tabs */}
          <div className="flex bg-white border-b">
            <button
              className={`px-4 py-3 text-sm ${
                activeAlgorithm === "screening"
                  ? "bg-[#0096B7] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveAlgorithm("screening")}
            >
              1. Screening & Diagnosis
            </button>
            <button
              className={`px-4 py-3 text-sm ${
                activeAlgorithm === "nonoperative"
                  ? "bg-[#0096B7] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveAlgorithm("nonoperative")}
            >
              2. Non-Operative Management
            </button>
            <button
              className={`px-4 py-3 text-sm ${
                activeAlgorithm === "operative"
                  ? "bg-[#0096B7] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveAlgorithm("operative")}
            >
              3. Operative Planning
            </button>
          </div>

          {/* Screening Algorithm */}
          {activeAlgorithm === "screening" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                      Screening Criteria
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Assess the following clinical findings to determine
                      likelihood of symptomatic neuroma
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          High clinical suspicion (history of nerve injury,
                          surgery, or trauma)*
                        </label>
                        <select
                          name="clinicalSuspicion"
                          value={screeningCriteria.clinicalSuspicion}
                          onChange={handleScreeningChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Positive Tinel's sign over suspected neuroma*
                        </label>
                        <select
                          name="tinel"
                          value={screeningCriteria.tinel}
                          onChange={handleScreeningChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Localized pain with palpation or percussion*
                        </label>
                        <select
                          name="pain"
                          value={screeningCriteria.pain}
                          onChange={handleScreeningChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Sensory deficit in nerve distribution*
                        </label>
                        <select
                          name="sensoryDeficit"
                          value={screeningCriteria.sensoryDeficit}
                          onChange={handleScreeningChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <p className="text-xs text-gray-500">* Required fields</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {screeningFilled ? (
                    <div className="bg-white p-6 rounded shadow">
                      <div
                        className={`p-4 mb-4 rounded border-l-4 ${screeningColor}`}
                      >
                        <h2 className="text-xl font-bold mb-2">
                          Screening Result:
                        </h2>
                        <p className="text-lg font-medium">{screeningResult}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-bold text-gray-700 mb-2">
                          Next Steps:
                        </h3>
                        {screeningResult.includes("HIGH") && (
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Confirm diagnosis with ultrasound or MRI
                                neurography
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Consider diagnostic nerve block for confirmation
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Proceed to Non-Operative Management Algorithm
                              </span>
                            </li>
                          </ul>
                        )}
                        {screeningResult.includes("MODERATE") && (
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Obtain advanced imaging (ultrasound or MRI
                                neurography)
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>Diagnostic nerve block may be helpful</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                If confirmed, proceed to Non-Operative
                                Management
                              </span>
                            </li>
                          </ul>
                        )}
                        {screeningResult.includes("LOW") && (
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Consider alternative diagnoses (CRPS,
                                tendinopathy, arthritis)
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                Re-evaluate with comprehensive upper extremity
                                examination
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-[#0096B7]">•</span>
                              <span>
                                If symptoms persist, consider imaging to rule
                                out neuroma
                              </span>
                            </li>
                          </ul>
                        )}
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded border border-[#0096B7]">
                        <h4 className="font-bold text-[#0096B7] mb-2">
                          Diagnostic Workup Recommendations:
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>
                            • <span className="font-medium">Ultrasound:</span>{" "}
                            First-line imaging, dynamic assessment, good
                            sensitivity
                          </li>
                          <li>
                            • <span className="font-medium">MRI Neurography:</span>{" "}
                            Best for deep neuromas, excellent anatomic detail
                          </li>
                          <li>
                            • <span className="font-medium">Diagnostic Block:</span>{" "}
                            &gt;50% pain relief confirms neuroma as pain generator
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded shadow">
                      <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                        <h2 className="text-xl font-bold">
                          Neuroma Screening
                        </h2>
                        <p>Complete all criteria to determine likelihood</p>
                      </div>
                      <div className="p-6 border rounded-lg bg-gray-50">
                        <div className="flex justify-center pb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-[#0096B7]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg text-center font-medium text-gray-700">
                          This algorithm helps identify symptomatic neuromas
                          requiring treatment
                        </h3>
                        <p className="mt-2 text-center text-gray-600">
                          Based on clinical examination findings and patient
                          history
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Non-Operative Algorithm */}
          {activeAlgorithm === "nonoperative" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                      Non-Operative Modalities
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Check which treatments have been attempted (minimum 3-6
                      months recommended)
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Gabapentinoids (gabapentin or pregabalin)*
                        </label>
                        <select
                          name="gabapentinoids"
                          value={nonOpCriteria.gabapentinoids}
                          onChange={handleNonOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Tried</option>
                          <option value="no">Not tried</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          NSAIDs or other oral analgesics*
                        </label>
                        <select
                          name="nsaids"
                          value={nonOpCriteria.nsaids}
                          onChange={handleNonOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Tried</option>
                          <option value="no">Not tried</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Topical medications (lidocaine, capsaicin)*
                        </label>
                        <select
                          name="topicalMedications"
                          value={nonOpCriteria.topicalMedications}
                          onChange={handleNonOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Tried</option>
                          <option value="no">Not tried</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Desensitization therapy*
                        </label>
                        <select
                          name="desensitization"
                          value={nonOpCriteria.desensitization}
                          onChange={handleNonOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Tried</option>
                          <option value="no">Not tried</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Physical/Occupational therapy*
                        </label>
                        <select
                          name="physicalTherapy"
                          value={nonOpCriteria.physicalTherapy}
                          onChange={handleNonOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Tried</option>
                          <option value="no">Not tried</option>
                        </select>
                      </div>

                      <p className="text-xs text-gray-500">* Required fields</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {nonOpFilled ? (
                    <div className="bg-white p-6 rounded shadow">
                      <div
                        className={`p-4 mb-4 rounded border-l-4 ${nonOpColor}`}
                      >
                        <h2 className="text-xl font-bold mb-2">
                          Management Status:
                        </h2>
                        <p className="text-lg font-medium">{nonOpResult}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded mb-4">
                        <h3 className="font-bold text-gray-700 mb-3">
                          Treatment Checklist:
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span
                              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                                nonOpCriteria.gabapentinoids === "yes"
                                  ? "bg-[#0096B7]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {nonOpCriteria.gabapentinoids === "yes" ? "✓" : ""}
                            </span>
                            <span>Gabapentinoids (first-line neuropathic pain medication)</span>
                          </li>
                          <li className="flex items-start">
                            <span
                              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                                nonOpCriteria.nsaids === "yes"
                                  ? "bg-[#0096B7]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {nonOpCriteria.nsaids === "yes" ? "✓" : ""}
                            </span>
                            <span>NSAIDs or analgesics</span>
                          </li>
                          <li className="flex items-start">
                            <span
                              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                                nonOpCriteria.topicalMedications === "yes"
                                  ? "bg-[#0096B7]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {nonOpCriteria.topicalMedications === "yes" ? "✓" : ""}
                            </span>
                            <span>Topical medications</span>
                          </li>
                          <li className="flex items-start">
                            <span
                              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                                nonOpCriteria.desensitization === "yes"
                                  ? "bg-[#0096B7]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {nonOpCriteria.desensitization === "yes" ? "✓" : ""}
                            </span>
                            <span>Desensitization therapy</span>
                          </li>
                          <li className="flex items-start">
                            <span
                              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                                nonOpCriteria.physicalTherapy === "yes"
                                  ? "bg-[#0096B7]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {nonOpCriteria.physicalTherapy === "yes" ? "✓" : ""}
                            </span>
                            <span>Physical/Occupational therapy</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 rounded border border-[#0096B7]">
                        <h4 className="font-bold text-[#0096B7] mb-2">
                          Additional Non-Operative Options:
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>
                            • <span className="font-medium">Steroid injections:</span>{" "}
                            May provide temporary relief (3-6 months)
                          </li>
                          <li>
                            • <span className="font-medium">Alcohol/phenol injections:</span>{" "}
                            Neurolytic agent for temporary denervation
                          </li>
                          <li>
                            • <span className="font-medium">Botulinum toxin:</span>{" "}
                            Emerging option for neuropathic pain
                          </li>
                          <li>
                            • <span className="font-medium">TENS unit:</span>{" "}
                            Transcutaneous electrical nerve stimulation
                          </li>
                          <li>
                            • <span className="font-medium">Mirror therapy:</span>{" "}
                            Particularly for phantom limb pain
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded shadow">
                      <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                        <h2 className="text-xl font-bold">
                          Non-Operative Management
                        </h2>
                        <p>Complete all fields to assess treatment adequacy</p>
                      </div>
                      <div className="p-6 border rounded-lg bg-gray-50">
                        <h3 className="text-lg text-center font-medium text-gray-700 mb-4">
                          Conservative treatment should be attempted for 3-6
                          months before considering surgery
                        </h3>
                        <div className="bg-white p-4 rounded">
                          <h4 className="font-bold text-gray-700 mb-2">
                            Evidence-Based Treatment Protocol:
                          </h4>
                          <ol className="list-decimal pl-5 space-y-2 text-sm">
                            <li>
                              Start gabapentin (300mg TID) or pregabalin
                              (75-150mg BID)
                            </li>
                            <li>Add NSAIDs for inflammatory component</li>
                            <li>
                              Initiate desensitization therapy with occupational
                              therapy
                            </li>
                            <li>
                              Consider topical lidocaine 5% patch or capsaicin
                              cream
                            </li>
                            <li>
                              Physical therapy for scar mobilization and
                              functional training
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Operative Algorithm */}
          {activeAlgorithm === "operative" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                      Surgical Candidacy
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Assess readiness for surgical intervention
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Failed comprehensive non-operative management (3-6
                          months minimum)*
                        </label>
                        <select
                          name="failedConservative"
                          value={opCriteria.failedConservative}
                          onChange={handleOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Significant functional impairment affecting daily
                          activities or work*
                        </label>
                        <select
                          name="functionalImpairment"
                          value={opCriteria.functionalImpairment}
                          onChange={handleOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Neuroma location clearly identified (imaging or
                          diagnostic block)*
                        </label>
                        <select
                          name="locationIdentified"
                          value={opCriteria.locationIdentified}
                          onChange={handleOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Neuroma type/location*
                        </label>
                        <select
                          name="neuromaType"
                          value={opCriteria.neuromaType}
                          onChange={handleOpChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="terminal">
                            Terminal (end neuroma) - non-weight bearing
                          </option>
                          <option value="continuity">
                            Neuroma-in-continuity
                          </option>
                          <option value="weightBearing">
                            Terminal - weight bearing location
                          </option>
                          <option value="multiple">Multiple neuromas</option>
                        </select>
                      </div>

                      <p className="text-xs text-gray-500">* Required fields</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {opFilled ? (
                    <div className="bg-white p-6 rounded shadow">
                      <div className={`p-4 mb-4 rounded border-l-4 ${opColor}`}>
                        <h2 className="text-xl font-bold mb-2">
                          Surgical Recommendation:
                        </h2>
                        <p className="text-lg font-medium">{opResult}</p>
                      </div>

                      {opRecommendations.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded mb-4">
                          <h3 className="font-bold text-gray-700 mb-3">
                            Clinical Recommendations:
                          </h3>
                          <ul className="space-y-2">
                            {opRecommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-[#0096B7]">
                                  {rec.includes(":") || rec.includes("•") ? "" : "•"}
                                </span>
                                <span className={rec.includes(":") ? "font-medium" : ""}>
                                  {rec}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-4 bg-blue-50 rounded border border-[#0096B7] mb-4">
                        <h4 className="font-bold text-[#0096B7] mb-2">
                          Surgical Technique Principles:
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>
                            • <span className="font-medium">TMR (Targeted Muscle Reinnervation):</span>{" "}
                            Preferred for motor nerves, provides physiologic target
                          </li>
                          <li>
                            • <span className="font-medium">Nerve burial into bone:</span>{" "}
                            Effective for terminal neuromas, protects from external trauma
                          </li>
                          <li>
                            • <span className="font-medium">Nerve burial into muscle:</span>{" "}
                            Alternative to bone, readily available tissue
                          </li>
                          <li>
                            • <span className="font-medium">Nerve transposition:</span>{" "}
                            Critical for weight-bearing or high-contact areas
                          </li>
                          <li>
                            • <span className="font-medium">Avoid:</span> Simple
                            excision alone (high recurrence), traction injuries
                            during dissection
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded border border-yellow-500">
                        <h4 className="font-bold text-yellow-800 mb-2">
                          Postoperative Management:
                        </h4>
                        <ul className="text-sm space-y-1 text-yellow-800">
                          <li>• Early protected mobilization (avoid prolonged immobilization)</li>
                          <li>• Continue gabapentinoids for 6-12 weeks postoperatively</li>
                          <li>• Desensitization therapy starting at 2-3 weeks</li>
                          <li>• Scar massage and soft tissue mobilization</li>
                          <li>• Monitor for signs of recurrence or new neuroma formation</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded shadow">
                      <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                        <h2 className="text-xl font-bold">Operative Planning</h2>
                        <p>Complete all fields for surgical recommendations</p>
                      </div>
                      <div className="p-6 border rounded-lg bg-gray-50">
                        <h3 className="text-lg text-center font-medium text-gray-700 mb-4">
                          Surgical intervention should only be considered after
                          failed conservative management
                        </h3>
                        <div className="bg-white p-4 rounded">
                          <h4 className="font-bold text-gray-700 mb-2">
                            Preoperative Requirements:
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li>
                              Minimum 3-6 months of comprehensive non-operative
                              treatment
                            </li>
                            <li>
                              Documented functional impairment (work, ADLs, or
                              quality of life)
                            </li>
                            <li>
                              Confirmed neuroma location via ultrasound, MRI, or
                              diagnostic block
                            </li>
                            <li>
                              Realistic patient expectations discussed
                            </li>
                            <li>
                              Optimization of medical comorbidities (smoking
                              cessation, glucose control)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
            About These Algorithms
          </h2>
          <p className="mb-4">
            These evidence-based algorithms provide a structured approach to the
            diagnosis and management of symptomatic neuromas in the hand and
            upper extremity. The algorithms are designed to guide clinicians
            through screening, non-operative management, and operative planning.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Algorithm Development
          </h3>
          <p className="mb-4">
            These algorithms were developed through comprehensive literature
            review and expert consensus, synthesizing current evidence on neuroma
            management. The approach emphasizes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Systematic diagnostic evaluation</li>
            <li>Comprehensive non-operative management before surgery</li>
            <li>Evidence-based surgical technique selection</li>
            <li>Individualized treatment based on neuroma characteristics</li>
          </ul>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Three-Stage Approach
          </h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              1. Screening & Diagnosis Algorithm
            </h4>
            <p className="text-sm mb-2">
              Helps identify patients with symptomatic neuromas requiring
              treatment based on clinical examination findings:
            </p>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>Clinical history of nerve injury or trauma</li>
              <li>Positive Tinel's sign</li>
              <li>Localized pain with palpation</li>
              <li>Sensory deficit in nerve distribution</li>
            </ul>
            <p className="text-sm mt-2 font-medium">
              ≥3 positive findings = HIGH likelihood (proceed to treatment)
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              2. Non-Operative Management Algorithm
            </h4>
            <p className="text-sm mb-2">
              Tracks comprehensive conservative treatment (minimum 3-6 months):
            </p>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>Neuropathic pain medications (gabapentinoids)</li>
              <li>NSAIDs and analgesics</li>
              <li>Topical medications (lidocaine, capsaicin)</li>
              <li>Desensitization therapy</li>
              <li>Physical/Occupational therapy</li>
            </ul>
            <p className="text-sm mt-2 font-medium">
              ≥4 modalities tried = Comprehensive management (surgical candidacy
              if failed)
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              3. Operative Planning Algorithm
            </h4>
            <p className="text-sm mb-2">
              Guides surgical decision-making and technique selection:
            </p>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">Terminal neuromas:</span> TMR,
                nerve burial (bone/muscle), transposition
              </li>
              <li>
                <span className="font-medium">Neuroma-in-continuity:</span>{" "}
                Neurolysis, nerve reconstruction with grafting
              </li>
              <li>
                <span className="font-medium">Weight-bearing location:</span>{" "}
                Mandatory transposition, TMR preferred
              </li>
              <li>
                <span className="font-medium">Multiple neuromas:</span>{" "}
                Comprehensive approach, varied techniques
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2 text-lg">Clinical Application</h3>
          <p className="mb-4">
            These algorithms are designed for use by hand surgeons, plastic
            surgeons, orthopedic surgeons, and other providers managing patients
            with symptomatic neuromas. The structured approach ensures:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Consistent diagnostic evaluation</li>
            <li>Adequate trial of conservative treatment</li>
            <li>Appropriate patient selection for surgery</li>
            <li>Evidence-based surgical technique selection</li>
            <li>Comprehensive postoperative management</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">Important Considerations</h4>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                • These algorithms should be used in conjunction with clinical
                judgment
              </li>
              <li>
                • Patient preferences and individual circumstances must be
                considered
              </li>
              <li>
                • Success rates vary by neuroma type, location, and surgical
                technique
              </li>
              <li>
                • Multidisciplinary approach may be beneficial for complex cases
              </li>
              <li>
                • Recurrence rates: 5-30% depending on technique and location
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "evidence" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
            Evidence Base
          </h2>

          <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4">
            <p className="font-medium">
              These algorithms are based on comprehensive literature review and
              expert consensus, synthesizing current evidence on neuroma
              management in the hand and upper extremity.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Primary Research Article</h3>
          <div className="p-4 bg-gray-50 rounded border mb-6">
            <p className="font-medium">
              Raasveld FV, Tiems MRA, Johnston BR, et al.
            </p>
            <p className="text-sm mt-1">
              Evidence-Based Algorithms for the Management of Symptomatic
              Neuromas in the Hand and Upper Extremity.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Plastic and Reconstructive Surgery - Global Open (Under Review)
            </p>
          </div>

          <h3 className="font-bold mt-6 mb-2">Diagnostic Evidence</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Clinical Examination:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Tinel's sign: 85-90% sensitivity for symptomatic neuroma
              </li>
              <li>
                Combination of clinical findings improves diagnostic accuracy
              </li>
              <li>
                Localized tenderness with percussion highly specific
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Imaging Modalities:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">Ultrasound:</span> 88-93%
                sensitivity, 85-87% specificity for neuroma detection
              </li>
              <li>
                <span className="font-medium">MRI Neurography:</span> Superior
                for deep neuromas, excellent anatomic detail
              </li>
              <li>
                <span className="font-medium">Diagnostic nerve blocks:</span>{" "}
                &gt;50% pain reduction confirms neuroma as pain generator
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">
            Non-Operative Management Evidence
          </h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Gabapentinoids:</span> 30-40%
                achieve &gt;50% pain reduction for neuropathic pain
              </li>
              <li>
                <span className="font-medium">Desensitization therapy:</span>{" "}
                Reduces hypersensitivity in 60-70% of patients
              </li>
              <li>
                <span className="font-medium">Steroid injections:</span> 40-60%
                temporary improvement (3-6 months average)
              </li>
              <li>
                <span className="font-medium">Combined approach:</span> Better
                outcomes than single modality treatment
              </li>
              <li>
                <span className="font-medium">Duration:</span> Minimum 3-6
                months recommended before considering surgery
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Surgical Outcomes</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Technique-Specific Results:</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">TMR (Targeted Muscle Reinnervation):</span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>70-85% pain reduction in multiple studies</li>
                  <li>Lower recurrence rates compared to simple excision</li>
                  <li>Particularly effective for motor nerve neuromas</li>
                  <li>Emerging as preferred technique for many applications</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Nerve burial into bone:</span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>65-80% good to excellent outcomes</li>
                  <li>Effective protection from external trauma</li>
                  <li>Lower recurrence in non-weight bearing locations</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Nerve burial into muscle:</span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>60-75% satisfactory pain relief</li>
                  <li>Readily available recipient tissue</li>
                  <li>May have higher recurrence than bone burial</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Simple excision (comparison):</span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>40-60% recurrence rate</li>
                  <li>Generally NOT recommended as sole treatment</li>
                  <li>Must be combined with burial/transposition</li>
                </ul>
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Key Supporting Literature</h3>
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded border text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Dumanian GA, Potter BK, Mioton LM, et al. Targeted Muscle
                Reinnervation Treats Neuroma and Phantom Pain in Major Limb
                Amputees: A Randomized Clinical Trial. Ann Surg.
                2019;270(2):238-246.
              </li>
              <li>
                Boldrey E, Shelden CH. Delayed cortical response to amputation;
                phantom limb and stump pain. Ann Surg. 1948;127(3):429-446.
              </li>
              <li>
                Mackinnon SE, Dellon AL. Treatment of the painful neuroma. In:
                Surgery of the Peripheral Nerve. New York: Thieme Medical
                Publishers; 1988:417-444.
              </li>
              <li>
                Guse DM, Moran SL. Outcomes of the surgical treatment of
                peripheral neuromas of the hand and forearm: a 25-year
                comparative outcome study. Ann Plast Surg. 2013;71(6):654-658.
              </li>
              <li>
                Koch H, Hubmer M, Welkerling H, et al. The treatment of painful
                neuroma on the lower extremity by resection and nerve stump
                transposition into a vein. Foot Ankle Int. 2004;25(7):476-481.
              </li>
              <li>
                Dellon AL, Mackinnon SE. Treatment of the painful neuroma by
                neuroma resection and muscle implantation. Plast Reconstr Surg.
                1986;77(3):427-436.
              </li>
              <li>
                Barbera J, Albert-Pamplo R. Centrocentral anastomosis of the
                proximal nerve stump in the treatment of painful amputation
                neuromas of major nerves. J Neurosurg. 1993;79(3):331-334.
              </li>
              <li>
                Souza JM, Cheesborough JE, Ko JH, et al. Targeted muscle
                reinnervation: a novel approach to postamputation neuroma pain.
                Clin Orthop Relat Res. 2014;472(10):2984-2990.
              </li>
              <li>
                Pet MA, Ko JH, Friedly JL, et al. Does targeted nerve
                implantation reduce neuroma pain in amputees? Clin Orthop Relat
                Res. 2014;472(10):2991-3001.
              </li>
              <li>
                Stokvis A, van der Avoort DJ, van Neck JW, et al. Surgical
                management of neuroma pain: a prospective follow-up study. Pain.
                2010;151(3):862-869.
              </li>
              <li>
                Eberlin KR, Ducic I. Surgical algorithm for neuroma management:
                A changing treatment paradigm. Plast Reconstr Surg Glob Open.
                2018;6(10):e1952.
              </li>
              <li>
                Woo SH, Kim JS, Lee GY, et al. The use of gastroepiploic
                vascularized nerve grafts for digital nerve repair in the hand.
                J Hand Surg Br. 1996;21(1):90-93.
              </li>
            </ol>
          </div>

          <h3 className="font-bold mt-6 mb-2">
            Recurrence and Complication Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Technique</th>
                  <th className="border p-2 text-left">Pain Relief</th>
                  <th className="border p-2 text-left">Recurrence Rate</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">TMR</td>
                  <td className="border p-2">70-85%</td>
                  <td className="border p-2">5-15%</td>
                  <td className="border p-2">Preferred for motor nerves</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2">Nerve burial (bone)</td>
                  <td className="border p-2">65-80%</td>
                  <td className="border p-2">10-20%</td>
                  <td className="border p-2">
                    Good for non-weight bearing
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Nerve burial (muscle)</td>
                  <td className="border p-2">60-75%</td>
                  <td className="border p-2">15-25%</td>
                  <td className="border p-2">Readily available tissue</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2">Transposition</td>
                  <td className="border p-2">50-70%</td>
                  <td className="border p-2">20-30%</td>
                  <td className="border p-2">
                    Critical for weight-bearing
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Simple excision alone</td>
                  <td className="border p-2">40-60%</td>
                  <td className="border p-2">40-60%</td>
                  <td className="border p-2">NOT recommended</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">
              Level of Evidence Summary:
            </h4>
            <ul className="text-sm space-y-1 text-yellow-800">
              <li>
                • Most neuroma surgery studies are Level III-IV evidence (case
                series, retrospective reviews)
              </li>
              <li>
                • TMR has Level I evidence for phantom limb pain from RCT
                (Dumanian et al., 2019)
              </li>
              <li>
                • Diagnostic workup recommendations based on Level II-III
                evidence
              </li>
              <li>
                • Non-operative management supported by Level II evidence for
                neuropathic pain
              </li>
              <li>
                • Additional high-quality prospective studies needed for all
                surgical techniques
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 p-4 mt-6 rounded text-sm text-gray-600 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">ICAN Algorithms</p>
            <p className="text-xs">Version 1.0 - February 2025</p>
          </div>
          <div className="text-right">
            <p>© Interdisciplinary Care for Amputees Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandNeuromaAlgorithm;
