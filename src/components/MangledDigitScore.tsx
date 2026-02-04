import React, { useMemo, useState } from "react";

type YesNo = "" | "yes" | "no";

type MDSSCriteria = {
  multilevelInjury: YesNo;
  crushAvulsion: YesNo;
  vascularInjury: YesNo;
  fractureDislocation: YesNo;
  tendonInjury: YesNo;
  nerveInjury: YesNo;
  contamination: YesNo;
};

const MangledDigitScore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"calculator" | "about" | "evidence">(
    "calculator"
  );

  const [criteria, setCriteria] = useState<MDSSCriteria>({
    multilevelInjury: "",
    crushAvulsion: "",
    vascularInjury: "",
    fractureDislocation: "",
    tendonInjury: "",
    nerveInjury: "",
    contamination: "",
  });

  const [score, setScore] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<string>("");
  const [recommendationColor, setRecommendationColor] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value as YesNo,
    }));
  };

  const allRequiredPicked = useMemo(() => {
    const vals = Object.values(criteria);
    return vals.every((v) => v === "yes" || v === "no");
  }, [criteria]);

  const calculateMDSS = (): void => {
    // Points based on MDSS components (as in your original tool)
    let total = 0;

    // 9-point items
    if (criteria.multilevelInjury === "yes") total += 9;
    if (criteria.crushAvulsion === "yes") total += 9;

    // 6-point items
    if (criteria.vascularInjury === "yes") total += 6;

    // 3-point items
    if (criteria.fractureDislocation === "yes") total += 3;
    if (criteria.tendonInjury === "yes") total += 3;
    if (criteria.nerveInjury === "yes") total += 3;
    if (criteria.contamination === "yes") total += 3;

    setScore(total);

    // Threshold logic (keep your clinical messaging; TS-safe)
    // NOTE: If your original threshold differs, change here only.
    if (total >= 20) {
      setRecommendation(
        "High likelihood of amputation (85% specific for amputation): Consider primary amputation"
      );
      setRecommendationColor("bg-red-100 border-red-500 text-red-800");
    } else {
      setRecommendation(
        "High likelihood of salvage (85% specific for salvage): Consider salvage"
      );
      setRecommendationColor("bg-green-100 border-green-500 text-green-800");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded">
        <strong>Note:</strong> This tool should be used as a supplement to, not a
        replacement for, clinical judgment.
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
              <h1 className="text-3xl font-bold tracking-tight">ICAN/Algorithms</h1>
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
          Mangled Digit Severity Score (MDSS)
        </h2>
        <p className="text-gray-600">
          Determining salvageability of severe digital injuries
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-l border-r bg-white">
        <button
          className={`px-4 py-2 ${
            activeTab === "calculator"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
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

      {/* Calculator */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
          {/* Left Column - Assessment */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                MDSS Criteria
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Multilevel injury (9 points)*
                  </label>
                  <select
                    name="multilevelInjury"
                    value={criteria.multilevelInjury}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Crush/avulsion mechanism (9 points)*
                  </label>
                  <select
                    name="crushAvulsion"
                    value={criteria.crushAvulsion}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vascular injury (6 points)*
                  </label>
                  <select
                    name="vascularInjury"
                    value={criteria.vascularInjury}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fracture/dislocation (3 points)*
                  </label>
                  <select
                    name="fractureDislocation"
                    value={criteria.fractureDislocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tendon injury (3 points)*
                  </label>
                  <select
                    name="tendonInjury"
                    value={criteria.tendonInjury}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nerve injury (3 points)*
                  </label>
                  <select
                    name="nerveInjury"
                    value={criteria.nerveInjury}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contamination (3 points)*
                  </label>
                  <select
                    name="contamination"
                    value={criteria.contamination}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <button
                  onClick={calculateMDSS}
                  disabled={!allRequiredPicked}
                  className={`w-full mt-2 px-4 py-2 rounded font-medium ${
                    allRequiredPicked
                      ? "bg-[#0096B7] text-white hover:opacity-90"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Calculate MDSS
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Score */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow h-full">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                Score & Interpretation
              </h2>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900">{score}</div>
                <div className="text-sm text-gray-600 mt-1">Total MDSS</div>
              </div>

              {recommendation && (
                <div className={`p-4 rounded border ${recommendationColor}`}>
                  <div className="font-bold mb-1">Recommendation</div>
                  <div className="text-sm">{recommendation}</div>
                </div>
              )}

              {!recommendation && (
                <div className="text-sm text-gray-600">
                  Complete all criteria and press <b>Calculate MDSS</b>.
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Reference */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow h-full">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                Quick Reference
              </h2>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Designed for severe digit injuries to support salvage decisions</li>
                <li>Higher scores indicate increased likelihood of amputation</li>
                <li>Use alongside perfusion, patient goals, and surgeon judgment</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">About MDSS</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              The Mangled Digit Severity Score (MDSS) is intended to provide a
              standardized framework for assessing severe digital injuries and
              supporting clinical decision-making regarding salvage versus primary
              amputation.
            </p>
            <p className="text-sm text-gray-600">
              This tool is informational and should be applied in the context of
              patient-specific factors (comorbidities, ischemia time, contamination,
              functional needs, and shared decision-making).
            </p>
          </div>
        </div>
      )}

      {/* Evidence */}
      {activeTab === "evidence" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Evidence</h2>
          <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4">
            <p className="font-medium">
              MDSS is derived from published clinical criteria and validated scoring
              approaches for mangled digit assessment.
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              Use as a structured adjunct to clinical exam, imaging, and vascular status.
            </li>
            <li>
              Helps standardize assessment across providers and settings.
            </li>
            <li>
              Does not replace surgical judgment or patient preference.
            </li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 p-4 mt-6 rounded text-sm text-gray-600 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">ICAN Algorithms</p>
            <p className="text-xs">Version 1.0 - February 2026</p>
          </div>
          <div className="text-right">
            <p>© Interdisciplinary Care for Amputees Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangledDigitScore;
