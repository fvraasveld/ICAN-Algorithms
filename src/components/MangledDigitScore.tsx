import React, { useState, useEffect } from "react";

const MangledDigitScore = () => {
  // State for criteria inputs
  const [criteria, setCriteria] = useState({
    multilevelInjury: "",
    crushAvulsion: "",
    psychiatric: "",
    intraarticular: "",
    flexorZoneII: "",
    smoker: "",
    dysvascular: "",
    bothNerves: "",
    asaScore: "",
    dominantHand: "",
    proximalPhalanx: "",
    skinDefect: "",
    ageOver50: "",
    middlePhalanx: "",
  });

  // State for score and recommendation
  const [totalScore, setTotalScore] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [recommendationColor, setRecommendationColor] = useState("");

  // State for active tab
  const [activeTab, setActiveTab] = useState("calculator");

  // State to track if criteria are filled out
  const [criteriaFilled, setCriteriaFilled] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria({
      ...criteria,
      [name]: value,
    });
  };

  // Calculate score based on criteria
  useEffect(() => {
    calculateScore();
  }, [criteria]);

  // Check if all required criteria are filled
  useEffect(() => {
    const allValues = Object.values(criteria);
    setCriteriaFilled(allValues.every((field) => field !== ""));
  }, [criteria]);

  // Calculate total score
  const calculateScore = () => {
    let score = 0;

    // Add points based on criteria (using final consensus weights)
    if (criteria.multilevelInjury === "yes") score += 9;
    if (criteria.crushAvulsion === "yes") score += 9;
    if (criteria.psychiatric === "yes") score += 7;
    if (criteria.intraarticular === "yes") score += 7;
    if (criteria.flexorZoneII === "yes") score += 7;
    if (criteria.smoker === "yes") score += 5;
    if (criteria.dysvascular === "yes") score += 5;
    if (criteria.bothNerves === "yes") score += 5;
    if (criteria.asaScore === "yes") score += 5;
    if (criteria.dominantHand === "yes") score -= 5; // Note: NEGATIVE points
    if (criteria.proximalPhalanx === "yes") score += 5;
    if (criteria.skinDefect === "yes") score += 4;
    if (criteria.ageOver50 === "yes") score += 4;
    if (criteria.middlePhalanx === "yes") score += 3;

    setTotalScore(score);

    // Generate recommendation based on score
    if (score >= 35) {
      setRecommendation(
        "Low likelihood of salvage (88% specific for amputation): Consider amputation"
      );
      setRecommendationColor("bg-red-100 border-red-500 text-red-800");
    } else if (score >= 25 && score < 35) {
      setRecommendation(
        "Intermediate zone - less predictable: Consider on a case-by-case basis"
      );
      setRecommendationColor("bg-yellow-100 border-yellow-500 text-yellow-800");
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
        <strong>Note:</strong> This tool should be used as a supplement to, not
        a replacement for, clinical judgment.
      </div>

      {/* Header with ICAN styling and logo */}
      <div className="bg-[#0096B7] text-white p-5 rounded-t-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo with white border - no rounded edges */}
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
                    Psychiatric condition (7 points)*
                  </label>
                  <select
                    name="psychiatric"
                    value={criteria.psychiatric}
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
                    Intraarticular fracture (7 points)*
                  </label>
                  <select
                    name="intraarticular"
                    value={criteria.intraarticular}
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
                    Flexor tendon injury, zone II (7 points)*
                  </label>
                  <select
                    name="flexorZoneII"
                    value={criteria.flexorZoneII}
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
                    Smoker (active) (5 points)*
                  </label>
                  <select
                    name="smoker"
                    value={criteria.smoker}
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
                    Dysvascular digit (5 points)*
                  </label>
                  <select
                    name="dysvascular"
                    value={criteria.dysvascular}
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
                    Both digital nerves injured (5 points)*
                  </label>
                  <select
                    name="bothNerves"
                    value={criteria.bothNerves}
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
                    ASA score of 3 or 4 (5 points)*
                  </label>
                  <select
                    name="asaScore"
                    value={criteria.asaScore}
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
                    Dominant hand injury (-5 points)*
                  </label>
                  <select
                    name="dominantHand"
                    value={criteria.dominantHand}
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
                    Proximal phalanx fracture (5 points)*
                  </label>
                  <select
                    name="proximalPhalanx"
                    value={criteria.proximalPhalanx}
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
                    Skin defect (4 points)*
                  </label>
                  <select
                    name="skinDefect"
                    value={criteria.skinDefect}
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
                    Age &gt; 50 years (4 points)*
                  </label>
                  <select
                    name="ageOver50"
                    value={criteria.ageOver50}
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
                    Middle phalanx fracture (3 points)*
                  </label>
                  <select
                    name="middlePhalanx"
                    value={criteria.middlePhalanx}
                    onChange={handleInputChange}
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

          {/* Right Column - Results */}
          <div className="md:col-span-2">
            {criteriaFilled ? (
              <div className="bg-white p-6 rounded shadow">
                <div className="p-6 mb-4 rounded border-l-4 bg-[#0096B7] text-white">
                  <h2 className="text-xl font-bold">Total MDSS Score:</h2>
                  <p className="text-4xl font-bold">{totalScore}</p>
                  <p className="text-sm mt-2">Maximum possible: 70 points</p>
                </div>

                <div className={`p-4 mb-4 rounded border-l-4 ${recommendationColor}`}>
                  <h2 className="text-xl font-bold mb-2">Recommendation:</h2>
                  <p className="text-lg font-medium">{recommendation}</p>
                </div>

                {/* Summary of criteria */}
                <div className="mt-6 bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-700 mb-3">
                    Criteria Assessment Summary
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.multilevelInjury === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.multilevelInjury === "yes" ? "✓" : ""}
                      </span>
                      <span>Multilevel injury (9 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.crushAvulsion === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.crushAvulsion === "yes" ? "✓" : ""}
                      </span>
                      <span>Crush/avulsion mechanism (9 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.psychiatric === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.psychiatric === "yes" ? "✓" : ""}
                      </span>
                      <span>Psychiatric condition (7 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.intraarticular === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.intraarticular === "yes" ? "✓" : ""}
                      </span>
                      <span>Intraarticular fracture (7 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.flexorZoneII === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.flexorZoneII === "yes" ? "✓" : ""}
                      </span>
                      <span>Flexor tendon injury, zone II (7 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.smoker === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.smoker === "yes" ? "✓" : ""}
                      </span>
                      <span>Active smoker (5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.dysvascular === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.dysvascular === "yes" ? "✓" : ""}
                      </span>
                      <span>Dysvascular digit (5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.bothNerves === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.bothNerves === "yes" ? "✓" : ""}
                      </span>
                      <span>Both digital nerves injured (5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.asaScore === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.asaScore === "yes" ? "✓" : ""}
                      </span>
                      <span>ASA score of 3 or 4 (5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.dominantHand === "yes"
                            ? "bg-orange-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.dominantHand === "yes" ? "-" : ""}
                      </span>
                      <span>Dominant hand injury (-5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.proximalPhalanx === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.proximalPhalanx === "yes" ? "✓" : ""}
                      </span>
                      <span>Proximal phalanx fracture (5 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.skinDefect === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.skinDefect === "yes" ? "✓" : ""}
                      </span>
                      <span>Skin defect (4 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.ageOver50 === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.ageOver50 === "yes" ? "✓" : ""}
                      </span>
                      <span>Age &gt; 50 years (4 points)</span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.middlePhalanx === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      >
                        {criteria.middlePhalanx === "yes" ? "✓" : ""}
                      </span>
                      <span>Middle phalanx fracture (3 points)</span>
                    </li>
                  </ul>
                </div>

                {/* Interpretation Guide */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
                  <h4 className="font-bold text-[#0096B7] mb-2">
                    Score Interpretation
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <span className="font-medium">≥35:</span> Low likelihood
                      of salvage (consider amputation)
                    </li>
                    <li>
                      <span className="font-medium">25-34:</span> Intermediate
                      zone (case-by-case assessment)
                    </li>
                    <li>
                      <span className="font-medium">&lt;25:</span> High
                      likelihood of salvage (consider salvage)
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded shadow">
                <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                  <h2 className="text-xl font-bold">
                    Mangled Digit Severity Score
                  </h2>
                  <p>Complete all criteria to calculate MDSS</p>
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg text-center font-medium text-gray-700">
                    This tool helps determine the salvageability of severely
                    injured digits
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    Fill out all 14 criteria to receive a validated MDSS score
                    and personalized clinical recommendation
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-700">Clinical Context</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    The MDSS was developed through expert consensus and
                    validated to predict amputation versus salvage for mangled
                    digits. The score demonstrated an AUC of 0.87 with 88%
                    specificity in predicting amputation at a threshold of 35.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
            About the MDSS
          </h2>
          <p className="mb-4">
            The Mangled Digit Severity Score (MDSS) provides a structured
            framework for assessment, prognostication, and surgical
            decision-making for mangled digits. The MDSS was developed through
            a consensus of expert hand surgeons and validated to predict
            amputation versus salvage outcomes.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            The 14 MDSS Criteria
          </h3>
          <p className="mb-4">
            Each criterion was assigned a weight (ranging from 3 to 9 points)
            based on its relative importance in determining functional salvage
            versus failure:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              High-Impact Criteria (7-9 points):
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">Multilevel injury (9):</span>{" "}
                Injuries at multiple levels within the digit
              </li>
              <li>
                <span className="font-medium">
                  Crush/avulsion mechanism (9):
                </span>{" "}
                High-energy injury creating wide zone of tissue damage
              </li>
              <li>
                <span className="font-medium">Psychiatric condition (7):</span>{" "}
                May affect compliance with rehabilitation
              </li>
              <li>
                <span className="font-medium">
                  Intraarticular fracture (7):
                </span>{" "}
                Joint involvement affecting future mobility
              </li>
              <li>
                <span className="font-medium">
                  Flexor tendon injury, zone II (7):
                </span>{" "}
                "No man's land" - critical area for tendon function
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              Moderate-Impact Criteria (4-5 points):
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">Active smoker (5):</span> Impairs
                healing and microvascular outcomes
              </li>
              <li>
                <span className="font-medium">Dysvascular digit (5):</span>{" "}
                Compromised blood supply
              </li>
              <li>
                <span className="font-medium">
                  Both digital nerves injured (5):
                </span>{" "}
                Bilateral nerve loss affecting sensibility
              </li>
              <li>
                <span className="font-medium">ASA score 3 or 4 (5):</span>{" "}
                Systemic comorbidities
              </li>
              <li>
                <span className="font-medium">
                  Proximal phalanx fracture (5):
                </span>{" "}
                Structural injury to digit base
              </li>
              <li>
                <span className="font-medium">Skin defect (4):</span> Soft
                tissue loss requiring coverage
              </li>
              <li>
                <span className="font-medium">Age &gt; 50 years (4):</span>{" "}
                Decreased regenerative capacity
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              Lower-Impact Criteria (3 points):
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">
                  Middle phalanx fracture (3):
                </span>{" "}
                Distal skeletal injury
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 mb-4">
            <h4 className="font-bold text-orange-800 mb-2">
              Protective Factor:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800">
              <li>
                <span className="font-medium">
                  Dominant hand injury (-5):
                </span>{" "}
                Functional importance may warrant more aggressive salvage
                attempts
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Development Methodology
          </h3>
          <p className="mb-4">
            The MDSS was developed using a modified Delphi process involving 67
            hand surgeons at seven trauma centers. After an initial importance
            rating survey, two iterative rounds were performed with seven expert
            panelists to achieve consensus on 14 factors and their weights.
            Internal consistency was high (Cronbach's α = 0.88).
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Clinical Validation
          </h3>
          <p className="mb-4">
            The MDSS was validated on 54 mangled digits (20 underwent
            amputation, 34 were salvaged successfully). The scoring system
            demonstrated:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Area Under the Curve (AUC) of 0.87</li>
            <li>
              At threshold ≥35: 60% sensitivity, 88% specificity for amputation
              (PPV 75%)
            </li>
            <li>
              At threshold &lt;25: 85% specificity for successful salvage (NPV
              88%)
            </li>
            <li>
              Mean MDSS: 21 ± 11 for salvaged digits vs. 35 ± 10 for amputated
              digits (p < 0.05)
            </li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">Important Caveats</h4>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                • The MDSS is not suitable for application in children
              </li>
              <li>
                • Thumb injuries should be salvaged more aggressively due to
                functional importance
              </li>
              <li>
                • When multiple digits are injured, threshold may be adjusted
              </li>
              <li>
                • Individual patient preferences and compliance should be
                considered
              </li>
              <li>
                • Final clinical decision should incorporate surgeon judgment
                and patient discussion
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
              The MDSS was developed and validated based on expert consensus and
              clinical outcomes research published in the Journal of Hand
              Surgery.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Primary Research Article</h3>
          <div className="p-4 bg-gray-50 rounded border mb-6">
            <p className="font-medium">
              Luan A, Friedrich J, Giladi A, Mithani SK, Rhee P, Safa B, Strohl
              A, Eberlin KR.
            </p>
            <p className="text-sm mt-1">
              The Mangled Digit Severity Score: Determining Salvageability of
              Severe Digital Injuries.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              J Hand Surg Am. 2025;50(4):407-415.
            </p>
            <p className="text-sm text-gray-600">
              doi: 10.1016/j.jhsa.2024.12.014
            </p>
          </div>

          <h3 className="font-bold mt-6 mb-2">Study Design</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <span className="font-medium">Development Phase:</span> Modified
              Delphi process with 67 hand surgeons, followed by consensus rating
              by 7 expert panelists (mean 12 years experience)
            </li>
            <li>
              <span className="font-medium">Validation Phase:</span>{" "}
              Retrospective review of 54 mangled digits treated at a level 1
              trauma center (2019-2020) with minimum 3-year follow-up
            </li>
            <li>
              <span className="font-medium">Response Rate:</span> 54% (36/67)
              for initial survey; 100% (7/7) for expert panel rounds
            </li>
          </ul>

          <h3 className="font-bold mt-6 mb-2">Key Findings</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Performance Metrics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Area Under the Curve (AUC): 0.87 - excellent discrimination
                between salvage and amputation outcomes
              </li>
              <li>
                At MDSS ≥35: Sensitivity 60%, Specificity 88%, PPV 75% for
                amputation
              </li>
              <li>
                At MDSS <25: Sensitivity 85% for salvage, Specificity 85%,
                NPV 88%
              </li>
              <li>
                Mean MDSS for salvaged digits: 21 ± 11 vs. amputated digits: 35
                ± 10 (p < 0.05)
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Cohort Outcomes:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Total digits: 54 (4 thumbs, 50 fingers)</li>
              <li>Successful salvage: 34 digits (63%)</li>
              <li>Primary amputation: 15 digits (28%)</li>
              <li>Failed salvage → secondary amputation: 5 digits (9%)</li>
              <li>
                Secondary amputation rate of 13% among attempted salvage - lower
                than literature rates of 18-41%
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">
            Comparison to Other Severity Scores
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Score</th>
                  <th className="border p-2 text-left">Application</th>
                  <th className="border p-2 text-left">Sensitivity</th>
                  <th className="border p-2 text-left">Specificity</th>
                  <th className="border p-2 text-left">AUC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">MDSS</td>
                  <td className="border p-2">Digital injuries</td>
                  <td className="border p-2">60%</td>
                  <td className="border p-2">88%</td>
                  <td className="border p-2">0.87</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2">MESS</td>
                  <td className="border p-2">Lower extremity</td>
                  <td className="border p-2">35-72%</td>
                  <td className="border p-2">62-91%</td>
                  <td className="border p-2">0.6-0.8</td>
                </tr>
                <tr>
                  <td className="border p-2">MUES</td>
                  <td className="border p-2">Upper extremity (proximal)</td>
                  <td className="border p-2">43%</td>
                  <td className="border p-2">82%</td>
                  <td className="border p-2">Not reported</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold mt-6 mb-2">Supporting Literature</h3>
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded border text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Fufa D, Calfee R, Wall L, et al. Digit replantation: experience
                of two U.S. academic level-I trauma centers. J Bone Joint Surg
                Am. 2013;95(23):2127-2134.
              </li>
              <li>
                Wilkens SC, Claessen FMAP, Ogink PT, et al. Reoperation after
                combined injury of the index finger: repair versus immediate
                amputation. J Hand Surg. 2016;41(3):436-440.
              </li>
              <li>
                Chinta MS, Wilkens SC, Vlot MA, et al. Secondary surgery
                following initial replantation/revascularization or completion
                amputation in the hand or digits. Plast Reconstr Surg.
                2018;142(3):709-716.
              </li>
              <li>
                Urbaniak JR, Roth JH, Nunley JA, et al. The results of
                replantation after amputation of a single finger. J Bone Joint
                Surg Am. 1985;67(4):611-619.
              </li>
              <li>
                Wong S, Banhidy N, Kanapathy M, Nikkhah D. Outcomes of single
                digit replantation for amputation proximal to the flexor
                digitorum superficialis insertion: a systematic review with
                meta-analysis. Microsurgery. 2023;43(4):408-417.
              </li>
              <li>
                Ozer K, Kramer W, Gillani S, et al. Replantation versus revision
                of amputated fingers in patients air-transported to a level 1
                trauma center. J Hand Surg Am. 2010;35(6):936-940.
              </li>
              <li>
                Helfet DL, Howey T, Sanders R, Johansen K. Limb salvage versus
                amputation. Preliminary results of the Mangled Extremity
                Severity Score. Clin Orthop Relat Res. 1990;(256):80-86.
              </li>
              <li>
                Savetsky IL, Aschen SZ, Salibian AA, et al. A novel mangled
                upper extremity injury assessment score. Plast Reconstr Surg
                Glob Open. 2019;7(9):e2449.
              </li>
              <li>
                Pederson WC. Replantation. Plast Reconstr Surg.
                2001;107(3):823-841.
              </li>
              <li>
                Waikakul S, Sakkarnkosol S, Vanadurongwan V, Un-nanuntana A.
                Results of 1018 digital replantations in 552 patients. Injury.
                2000;31(1):33-40.
              </li>
              <li>
                Dec W. A meta-analysis of success rates for digit replantation.
                Tech Hand Up Extrem Surg. 2006;10(3):124-129.
              </li>
              <li>
                Chiu HY, Shieh SJ, Hsu HY. Multivariate analysis of factors
                influencing the functional recovery after finger replantation or
                revascularization. Microsurgery. 1995;16(10):713-717.
              </li>
            </ol>
          </div>

          <h3 className="font-bold mt-6 mb-2">Study Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              Retrospective single-center validation (prospective multi-center
              validation recommended)
            </li>
            <li>
              Expert panel majority from plastic surgery background (86%)
            </li>
            <li>
              Patient preferences and rehabilitation compliance not explicitly
              quantified
            </li>
            <li>Not applicable to pediatric populations</li>
            <li>
              Cultural and socioeconomic factors may influence salvage decisions
            </li>
          </ul>
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

export default MangledDigitScore;
