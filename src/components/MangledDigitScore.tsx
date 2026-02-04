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
  const handleInputChange = (e) =&gt; {
    const { name, value } = e.target;
    setCriteria({
      ...criteria,
      [name]: value,
    });
  };

  // Calculate score based on criteria
  useEffect(() =&gt; {
    calculateScore();
  }, [criteria]);

  // Check if all required criteria are filled
  useEffect(() =&gt; {
    const allValues = Object.values(criteria);
    setCriteriaFilled(allValues.every((field) =&gt; field !== ""));
  }, [criteria]);

  // Calculate total score
  const calculateScore = () =&gt; {
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
    if (score &gt;= 35) {
      setRecommendation(
        "Low likelihood of salvage (88% specific for amputation): Consider amputation"
      );
      setRecommendationColor("bg-red-100 border-red-500 text-red-800");
    } else if (score &gt;= 25 && score < 35) {
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
    <div className="w-full max-w-6xl mx-auto"&gt;
      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded"&gt;
        <strong&gt;Note:</strong&gt; This tool should be used as a supplement to, not
        a replacement for, clinical judgment.
      </div&gt;

      {/* Header with ICAN styling and logo */}
      <div className="bg-[#0096B7] text-white p-5 rounded-t-lg shadow"&gt;
        <div className="flex items-center justify-between"&gt;
          <div className="flex items-center"&gt;
            {/* Logo with white border - no rounded edges */}
            <div className="bg-white p-0.5 border-0.5 border-white mr-4"&gt;
              <img
                src="https://i.ibb.co/jv6z7D3d/ICAN-logo-copy-2.png"
                alt="ICAN"
                className="h-28 w-auto"
              /&gt;
            </div&gt;
            <div&gt;
              <h1 className="text-3xl font-bold tracking-tight"&gt;
                ICAN/Algorithms
              </h1&gt;
              <div className="text-xs mt-1 font-light tracking-wide uppercase"&gt;
                Interdisciplinary Care for Amputees Network
              </div&gt;
            </div&gt;
          </div&gt;
        </div&gt;
      </div&gt;

      {/* Title bar */}
      <div className="bg-white border-l border-r p-4"&gt;
        <h2 className="text-2xl font-bold text-[#0096B7]"&gt;
          Mangled Digit Severity Score (MDSS)
        </h2&gt;
        <p className="text-gray-600"&gt;
          Determining salvageability of severe digital injuries
        </p&gt;
      </div&gt;

      {/* Tabs */}
      <div className="flex border-l border-r bg-white"&gt;
        <button
          className={`px-4 py-2 ${
            activeTab === "calculator"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() =&gt; setActiveTab("calculator")}
        &gt;
          Calculator
        </button&gt;
        <button
          className={`px-4 py-2 ${
            activeTab === "about"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() =&gt; setActiveTab("about")}
        &gt;
          About
        </button&gt;
        <button
          className={`px-4 py-2 ${
            activeTab === "evidence"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() =&gt; setActiveTab("evidence")}
        &gt;
          Evidence
        </button&gt;
      </div&gt;

      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 border-l border-r border-b rounded-b-lg"&gt;
          {/* Left Column - Assessment */}
          <div className="md:col-span-1"&gt;
            <div className="bg-white p-6 rounded shadow"&gt;
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]"&gt;
                MDSS Criteria
              </h2&gt;
              <div className="space-y-4"&gt;
                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Multilevel injury (9 points)*
                  </label&gt;
                  <select
                    name="multilevelInjury"
                    value={criteria.multilevelInjury}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Crush/avulsion mechanism (9 points)*
                  </label&gt;
                  <select
                    name="crushAvulsion"
                    value={criteria.crushAvulsion}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Psychiatric condition (7 points)*
                  </label&gt;
                  <select
                    name="psychiatric"
                    value={criteria.psychiatric}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Intraarticular fracture (7 points)*
                  </label&gt;
                  <select
                    name="intraarticular"
                    value={criteria.intraarticular}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Flexor tendon injury, zone II (7 points)*
                  </label&gt;
                  <select
                    name="flexorZoneII"
                    value={criteria.flexorZoneII}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Smoker (active) (5 points)*
                  </label&gt;
                  <select
                    name="smoker"
                    value={criteria.smoker}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Dysvascular digit (5 points)*
                  </label&gt;
                  <select
                    name="dysvascular"
                    value={criteria.dysvascular}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Both digital nerves injured (5 points)*
                  </label&gt;
                  <select
                    name="bothNerves"
                    value={criteria.bothNerves}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    ASA score of 3 or 4 (5 points)*
                  </label&gt;
                  <select
                    name="asaScore"
                    value={criteria.asaScore}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Dominant hand injury (-5 points)*
                  </label&gt;
                  <select
                    name="dominantHand"
                    value={criteria.dominantHand}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Proximal phalanx fracture (5 points)*
                  </label&gt;
                  <select
                    name="proximalPhalanx"
                    value={criteria.proximalPhalanx}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Skin defect (4 points)*
                  </label&gt;
                  <select
                    name="skinDefect"
                    value={criteria.skinDefect}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Age &gt; 50 years (4 points)*
                  </label&gt;
                  <select
                    name="ageOver50"
                    value={criteria.ageOver50}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <div&gt;
                  <label className="block text-sm font-medium mb-1"&gt;
                    Middle phalanx fracture (3 points)*
                  </label&gt;
                  <select
                    name="middlePhalanx"
                    value={criteria.middlePhalanx}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  &gt;
                    <option value=""&gt;Select...</option&gt;
                    <option value="yes"&gt;Yes</option&gt;
                    <option value="no"&gt;No</option&gt;
                  </select&gt;
                </div&gt;

                <p className="text-xs text-gray-500"&gt;* Required fields</p&gt;
              </div&gt;
            </div&gt;
          </div&gt;

          {/* Right Column - Results */}
          <div className="md:col-span-2"&gt;
            {criteriaFilled ? (
              <div className="bg-white p-6 rounded shadow"&gt;
                <div className="p-6 mb-4 rounded border-l-4 bg-[#0096B7] text-white"&gt;
                  <h2 className="text-xl font-bold"&gt;Total MDSS Score:</h2&gt;
                  <p className="text-4xl font-bold"&gt;{totalScore}</p&gt;
                  <p className="text-sm mt-2"&gt;Maximum possible: 70 points</p&gt;
                </div&gt;

                <div className={`p-4 mb-4 rounded border-l-4 ${recommendationColor}`}&gt;
                  <h2 className="text-xl font-bold mb-2"&gt;Recommendation:</h2&gt;
                  <p className="text-lg font-medium"&gt;{recommendation}</p&gt;
                </div&gt;

                {/* Summary of criteria */}
                <div className="mt-6 bg-gray-50 p-4 rounded"&gt;
                  <h3 className="font-bold text-gray-700 mb-3"&gt;
                    Criteria Assessment Summary
                  </h3&gt;
                  <ul className="space-y-2"&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.multilevelInjury === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.multilevelInjury === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Multilevel injury (9 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.crushAvulsion === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.crushAvulsion === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Crush/avulsion mechanism (9 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.psychiatric === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.psychiatric === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Psychiatric condition (7 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.intraarticular === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.intraarticular === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Intraarticular fracture (7 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.flexorZoneII === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.flexorZoneII === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Flexor tendon injury, zone II (7 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.smoker === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.smoker === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Active smoker (5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.dysvascular === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.dysvascular === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Dysvascular digit (5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.bothNerves === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.bothNerves === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Both digital nerves injured (5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.asaScore === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.asaScore === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;ASA score of 3 or 4 (5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.dominantHand === "yes"
                            ? "bg-orange-500"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.dominantHand === "yes" ? "-" : ""}
                      </span&gt;
                      <span&gt;Dominant hand injury (-5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.proximalPhalanx === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.proximalPhalanx === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Proximal phalanx fracture (5 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.skinDefect === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.skinDefect === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Skin defect (4 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.ageOver50 === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.ageOver50 === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Age &gt; 50 years (4 points)</span&gt;
                    </li&gt;
                    <li className="flex items-start"&gt;
                      <span
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-white text-xs ${
                          criteria.middlePhalanx === "yes"
                            ? "bg-[#0096B7]"
                            : "bg-gray-400"
                        }`}
                      &gt;
                        {criteria.middlePhalanx === "yes" ? "✓" : ""}
                      </span&gt;
                      <span&gt;Middle phalanx fracture (3 points)</span&gt;
                    </li&gt;
                  </ul&gt;
                </div&gt;

                {/* Interpretation Guide */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]"&gt;
                  <h4 className="font-bold text-[#0096B7] mb-2"&gt;
                    Score Interpretation
                  </h4&gt;
                  <ul className="text-sm space-y-1"&gt;
                    <li&gt;
                      <span className="font-medium"&gt;≥35:</span&gt; Low likelihood
                      of salvage (consider amputation)
                    </li&gt;
                    <li&gt;
                      <span className="font-medium"&gt;25-34:</span&gt; Intermediate
                      zone (case-by-case assessment)
                    </li&gt;
                    <li&gt;
                      <span className="font-medium"&gt;&lt;25:</span&gt; High
                      likelihood of salvage (consider salvage)
                    </li&gt;
                  </ul&gt;
                </div&gt;
              </div&gt;
            ) : (
              <div className="bg-white p-6 rounded shadow"&gt;
                <div className="bg-[#0096B7] text-white p-4 mb-4 rounded"&gt;
                  <h2 className="text-xl font-bold"&gt;
                    Mangled Digit Severity Score
                  </h2&gt;
                  <p&gt;Complete all criteria to calculate MDSS</p&gt;
                </div&gt;

                <div className="p-6 border rounded-lg bg-gray-50"&gt;
                  <div className="flex justify-center pb-4"&gt;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-[#0096B7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    &gt;
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      /&gt;
                    </svg&gt;
                  </div&gt;
                  <h3 className="text-lg text-center font-medium text-gray-700"&gt;
                    This tool helps determine the salvageability of severely
                    injured digits
                  </h3&gt;
                  <p className="mt-2 text-center text-gray-600"&gt;
                    Fill out all 14 criteria to receive a validated MDSS score
                    and personalized clinical recommendation
                  </p&gt;
                </div&gt;

                <div className="mt-6 p-4 bg-gray-50 rounded-lg"&gt;
                  <h3 className="font-bold text-gray-700"&gt;Clinical Context</h3&gt;
                  <p className="mt-1 text-sm text-gray-600"&gt;
                    The MDSS was developed through expert consensus and
                    validated to predict amputation versus salvage for mangled
                    digits. The score demonstrated an AUC of 0.87 with 88%
                    specificity in predicting amputation at a threshold of 35.
                  </p&gt;
                </div&gt;
              </div&gt;
            )}
          </div&gt;
        </div&gt;
      )}

      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg"&gt;
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]"&gt;
            About the MDSS
          </h2&gt;
          <p className="mb-4"&gt;
            The Mangled Digit Severity Score (MDSS) provides a structured
            framework for assessment, prognostication, and surgical
            decision-making for mangled digits. The MDSS was developed through
            a consensus of expert hand surgeons and validated to predict
            amputation versus salvage outcomes.
          </p&gt;

          <h3 className="font-bold mt-6 mb-2 text-lg"&gt;
            The 14 MDSS Criteria
          </h3&gt;
          <p className="mb-4"&gt;
            Each criterion was assigned a weight (ranging from 3 to 9 points)
            based on its relative importance in determining functional salvage
            versus failure:
          </p&gt;

          <div className="bg-gray-50 p-4 rounded-lg mb-4"&gt;
            <h4 className="font-bold text-gray-700 mb-2"&gt;
              High-Impact Criteria (7-9 points):
            </h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm"&gt;
              <li&gt;
                <span className="font-medium"&gt;Multilevel injury (9):</span&gt;{" "}
                Injuries at multiple levels within the digit
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Crush/avulsion mechanism (9):
                </span&gt;{" "}
                High-energy injury creating wide zone of tissue damage
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;Psychiatric condition (7):</span&gt;{" "}
                May affect compliance with rehabilitation
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Intraarticular fracture (7):
                </span&gt;{" "}
                Joint involvement affecting future mobility
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Flexor tendon injury, zone II (7):
                </span&gt;{" "}
                "No man's land" - critical area for tendon function
              </li&gt;
            </ul&gt;
          </div&gt;

          <div className="bg-gray-50 p-4 rounded-lg mb-4"&gt;
            <h4 className="font-bold text-gray-700 mb-2"&gt;
              Moderate-Impact Criteria (4-5 points):
            </h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm"&gt;
              <li&gt;
                <span className="font-medium"&gt;Active smoker (5):</span&gt; Impairs
                healing and microvascular outcomes
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;Dysvascular digit (5):</span&gt;{" "}
                Compromised blood supply
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Both digital nerves injured (5):
                </span&gt;{" "}
                Bilateral nerve loss affecting sensibility
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;ASA score 3 or 4 (5):</span&gt;{" "}
                Systemic comorbidities
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Proximal phalanx fracture (5):
                </span&gt;{" "}
                Structural injury to digit base
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;Skin defect (4):</span&gt; Soft
                tissue loss requiring coverage
              </li&gt;
              <li&gt;
                <span className="font-medium"&gt;Age &gt; 50 years (4):</span&gt;{" "}
                Decreased regenerative capacity
              </li&gt;
            </ul&gt;
          </div&gt;

          <div className="bg-gray-50 p-4 rounded-lg mb-4"&gt;
            <h4 className="font-bold text-gray-700 mb-2"&gt;
              Lower-Impact Criteria (3 points):
            </h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm"&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Middle phalanx fracture (3):
                </span&gt;{" "}
                Distal skeletal injury
              </li&gt;
            </ul&gt;
          </div&gt;

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 mb-4"&gt;
            <h4 className="font-bold text-orange-800 mb-2"&gt;
              Protective Factor:
            </h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm text-orange-800"&gt;
              <li&gt;
                <span className="font-medium"&gt;
                  Dominant hand injury (-5):
                </span&gt;{" "}
                Functional importance may warrant more aggressive salvage
                attempts
              </li&gt;
            </ul&gt;
          </div&gt;

          <h3 className="font-bold mt-6 mb-2 text-lg"&gt;
            Development Methodology
          </h3&gt;
          <p className="mb-4"&gt;
            The MDSS was developed using a modified Delphi process involving 67
            hand surgeons at seven trauma centers. After an initial importance
            rating survey, two iterative rounds were performed with seven expert
            panelists to achieve consensus on 14 factors and their weights.
            Internal consistency was high (Cronbach's α = 0.88).
          </p&gt;

          <h3 className="font-bold mt-6 mb-2 text-lg"&gt;
            Clinical Validation
          </h3&gt;
          <p className="mb-4"&gt;
            The MDSS was validated on 54 mangled digits (20 underwent
            amputation, 34 were salvaged successfully). The scoring system
            demonstrated:
          </p&gt;
          <ul className="list-disc pl-5 space-y-2 mb-4"&gt;
            <li&gt;Area Under the Curve (AUC) of 0.87</li&gt;
            <li&gt;
              At threshold ≥35: 60% sensitivity, 88% specificity for amputation
              (PPV 75%)
            </li&gt;
            <li&gt;
              At threshold &lt;25: 85% specificity for successful salvage (NPV
              88%)
            </li&gt;
            <li&gt;
              Mean MDSS: 21 ± 11 for salvaged digits vs. 35 ± 10 for amputated
              digits (p &lt; 0.05)
            </li&gt;
          </ul&gt;

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]"&gt;
            <h4 className="font-bold text-[#0096B7]"&gt;Important Caveats</h4&gt;
            <ul className="mt-2 text-sm space-y-1"&gt;
              <li&gt;
                • The MDSS is not suitable for application in children
              </li&gt;
              <li&gt;
                • Thumb injuries should be salvaged more aggressively due to
                functional importance
              </li&gt;
              <li&gt;
                • When multiple digits are injured, threshold may be adjusted
              </li&gt;
              <li&gt;
                • Individual patient preferences and compliance should be
                considered
              </li&gt;
              <li&gt;
                • Final clinical decision should incorporate surgeon judgment
                and patient discussion
              </li&gt;
            </ul&gt;
          </div&gt;
        </div&gt;
      )}

      {activeTab === "evidence" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg"&gt;
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]"&gt;
            Evidence Base
          </h2&gt;

          <div className="bg-blue-50 p-4 rounded border-l-4 border-[#0096B7] mb-4"&gt;
            <p className="font-medium"&gt;
              The MDSS was developed and validated based on expert consensus and
              clinical outcomes research published in the Journal of Hand
              Surgery.
            </p&gt;
          </div&gt;

          <h3 className="font-bold mt-4 mb-2"&gt;Primary Research Article</h3&gt;
          <div className="p-4 bg-gray-50 rounded border mb-6"&gt;
            <p className="font-medium"&gt;
              Luan A, Friedrich J, Giladi A, Mithani SK, Rhee P, Safa B, Strohl
              A, Eberlin KR.
            </p&gt;
            <p className="text-sm mt-1"&gt;
              The Mangled Digit Severity Score: Determining Salvageability of
              Severe Digital Injuries.
            </p&gt;
            <p className="text-sm text-gray-600 mt-1"&gt;
              J Hand Surg Am. 2025;50(4):407-415.
            </p&gt;
            <p className="text-sm text-gray-600"&gt;
              doi: 10.1016/j.jhsa.2024.12.014
            </p&gt;
          </div&gt;

          <h3 className="font-bold mt-6 mb-2"&gt;Study Design</h3&gt;
          <ul className="list-disc pl-5 space-y-2 mb-4"&gt;
            <li&gt;
              <span className="font-medium"&gt;Development Phase:</span&gt; Modified
              Delphi process with 67 hand surgeons, followed by consensus rating
              by 7 expert panelists (mean 12 years experience)
            </li&gt;
            <li&gt;
              <span className="font-medium"&gt;Validation Phase:</span&gt;{" "}
              Retrospective review of 54 mangled digits treated at a level 1
              trauma center (2019-2020) with minimum 3-year follow-up
            </li&gt;
            <li&gt;
              <span className="font-medium"&gt;Response Rate:</span&gt; 54% (36/67)
              for initial survey; 100% (7/7) for expert panel rounds
            </li&gt;
          </ul&gt;

          <h3 className="font-bold mt-6 mb-2"&gt;Key Findings</h3&gt;
          <div className="bg-gray-50 p-4 rounded mb-4"&gt;
            <h4 className="font-medium mb-2"&gt;Performance Metrics:</h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm"&gt;
              <li&gt;
                Area Under the Curve (AUC): 0.87 - excellent discrimination
                between salvage and amputation outcomes
              </li&gt;
              <li&gt;
                At MDSS ≥35: Sensitivity 60%, Specificity 88%, PPV 75% for
                amputation
              </li&gt;
              <li&gt;
                At MDSS &lt;25: Sensitivity 85% for salvage, Specificity 85%,
                NPV 88%
              </li&gt;
              <li&gt;
                Mean MDSS for salvaged digits: 21 ± 11 vs. amputated digits: 35
                ± 10 (p &lt; 0.05)
              </li&gt;
            </ul&gt;
          </div&gt;

          <div className="bg-gray-50 p-4 rounded mb-4"&gt;
            <h4 className="font-medium mb-2"&gt;Cohort Outcomes:</h4&gt;
            <ul className="list-disc pl-5 space-y-1 text-sm"&gt;
              <li&gt;Total digits: 54 (4 thumbs, 50 fingers)</li&gt;
              <li&gt;Successful salvage: 34 digits (63%)</li&gt;
              <li&gt;Primary amputation: 15 digits (28%)</li&gt;
              <li&gt;Failed salvage → secondary amputation: 5 digits (9%)</li&gt;
              <li&gt;
                Secondary amputation rate of 13% among attempted salvage - lower
                than literature rates of 18-41%
              </li&gt;
            </ul&gt;
          </div&gt;

          <h3 className="font-bold mt-6 mb-2"&gt;
            Comparison to Other Severity Scores
          </h3&gt;
          <div className="overflow-x-auto"&gt;
            <table className="min-w-full text-sm border"&gt;
              <thead className="bg-gray-100"&gt;
                <tr&gt;
                  <th className="border p-2 text-left"&gt;Score</th&gt;
                  <th className="border p-2 text-left"&gt;Application</th&gt;
                  <th className="border p-2 text-left"&gt;Sensitivity</th&gt;
                  <th className="border p-2 text-left"&gt;Specificity</th&gt;
                  <th className="border p-2 text-left"&gt;AUC</th&gt;
                </tr&gt;
              </thead&gt;
              <tbody&gt;
                <tr&gt;
                  <td className="border p-2 font-medium"&gt;MDSS</td&gt;
                  <td className="border p-2"&gt;Digital injuries</td&gt;
                  <td className="border p-2"&gt;60%</td&gt;
                  <td className="border p-2"&gt;88%</td&gt;
                  <td className="border p-2"&gt;0.87</td&gt;
                </tr&gt;
                <tr className="bg-gray-50"&gt;
                  <td className="border p-2"&gt;MESS</td&gt;
                  <td className="border p-2"&gt;Lower extremity</td&gt;
                  <td className="border p-2"&gt;35-72%</td&gt;
                  <td className="border p-2"&gt;62-91%</td&gt;
                  <td className="border p-2"&gt;0.6-0.8</td&gt;
                </tr&gt;
                <tr&gt;
                  <td className="border p-2"&gt;MUES</td&gt;
                  <td className="border p-2"&gt;Upper extremity (proximal)</td&gt;
                  <td className="border p-2"&gt;43%</td&gt;
                  <td className="border p-2"&gt;82%</td&gt;
                  <td className="border p-2"&gt;Not reported</td&gt;
                </tr&gt;
              </tbody&gt;
            </table&gt;
          </div&gt;

          <h3 className="font-bold mt-6 mb-2"&gt;Supporting Literature</h3&gt;
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded border text-sm"&gt;
            <ol className="list-decimal pl-5 space-y-2"&gt;
              <li&gt;
                Fufa D, Calfee R, Wall L, et al. Digit replantation: experience
                of two U.S. academic level-I trauma centers. J Bone Joint Surg
                Am. 2013;95(23):2127-2134.
              </li&gt;
              <li&gt;
                Wilkens SC, Claessen FMAP, Ogink PT, et al. Reoperation after
                combined injury of the index finger: repair versus immediate
                amputation. J Hand Surg. 2016;41(3):436-440.
              </li&gt;
              <li&gt;
                Chinta MS, Wilkens SC, Vlot MA, et al. Secondary surgery
                following initial replantation/revascularization or completion
                amputation in the hand or digits. Plast Reconstr Surg.
                2018;142(3):709-716.
              </li&gt;
              <li&gt;
                Urbaniak JR, Roth JH, Nunley JA, et al. The results of
                replantation after amputation of a single finger. J Bone Joint
                Surg Am. 1985;67(4):611-619.
              </li&gt;
              <li&gt;
                Wong S, Banhidy N, Kanapathy M, Nikkhah D. Outcomes of single
                digit replantation for amputation proximal to the flexor
                digitorum superficialis insertion: a systematic review with
                meta-analysis. Microsurgery. 2023;43(4):408-417.
              </li&gt;
              <li&gt;
                Ozer K, Kramer W, Gillani S, et al. Replantation versus revision
                of amputated fingers in patients air-transported to a level 1
                trauma center. J Hand Surg Am. 2010;35(6):936-940.
              </li&gt;
              <li&gt;
                Helfet DL, Howey T, Sanders R, Johansen K. Limb salvage versus
                amputation. Preliminary results of the Mangled Extremity
                Severity Score. Clin Orthop Relat Res. 1990;(256):80-86.
              </li&gt;
              <li&gt;
                Savetsky IL, Aschen SZ, Salibian AA, et al. A novel mangled
                upper extremity injury assessment score. Plast Reconstr Surg
                Glob Open. 2019;7(9):e2449.
              </li&gt;
              <li&gt;
                Pederson WC. Replantation. Plast Reconstr Surg.
                2001;107(3):823-841.
              </li&gt;
              <li&gt;
                Waikakul S, Sakkarnkosol S, Vanadurongwan V, Un-nanuntana A.
                Results of 1018 digital replantations in 552 patients. Injury.
                2000;31(1):33-40.
              </li&gt;
              <li&gt;
                Dec W. A meta-analysis of success rates for digit replantation.
                Tech Hand Up Extrem Surg. 2006;10(3):124-129.
              </li&gt;
              <li&gt;
                Chiu HY, Shieh SJ, Hsu HY. Multivariate analysis of factors
                influencing the functional recovery after finger replantation or
                revascularization. Microsurgery. 1995;16(10):713-717.
              </li&gt;
            </ol&gt;
          </div&gt;

          <h3 className="font-bold mt-6 mb-2"&gt;Study Limitations</h3&gt;
          <ul className="list-disc pl-5 space-y-2 text-sm"&gt;
            <li&gt;
              Retrospective single-center validation (prospective multi-center
              validation recommended)
            </li&gt;
            <li&gt;
              Expert panel majority from plastic surgery background (86%)
            </li&gt;
            <li&gt;
              Patient preferences and rehabilitation compliance not explicitly
              quantified
            </li&gt;
            <li&gt;Not applicable to pediatric populations</li&gt;
            <li&gt;
              Cultural and socioeconomic factors may influence salvage decisions
            </li&gt;
          </ul&gt;
        </div&gt;
      )}

      {/* Footer */}
      <div className="bg-gray-50 p-4 mt-6 rounded text-sm text-gray-600 border"&gt;
        <div className="flex justify-between items-center"&gt;
          <div&gt;
            <p className="font-medium"&gt;ICAN Algorithms</p&gt;
            <p className="text-xs"&gt;Version 1.0 - February 2025</p&gt;
          </div&gt;
          <div className="text-right"&gt;
            <p&gt;© Interdisciplinary Care for Amputees Network</p&gt;
          </div&gt;
        </div&gt;
      </div&gt;
    </div&gt;
  );
};

export default MangledDigitScore;
