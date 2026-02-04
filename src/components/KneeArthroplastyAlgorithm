import React, { useState, useEffect } from "react";

const KneeArthroplastyAlgorithm = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("algorithm");

  // State for algorithm inputs
  const [algorithmInputs, setAlgorithmInputs] = useState({
    symptomOnset: "",
    painLocation: "",
    motorWeakness: "",
    conservativeTreatment: "",
    diagnosticBlock: "",
    blockResponse: "",
    emgPerformed: "",
  });

  const [algorithmResult, setAlgorithmResult] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [resultColor, setResultColor] = useState("");
  const [inputsFilled, setInputsFilled] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlgorithmInputs({
      ...algorithmInputs,
      [name]: value,
    });
  };

  // Calculate results based on inputs
  useEffect(() => {
    const allValues = Object.values(algorithmInputs);
    const requiredFields = [
      algorithmInputs.symptomOnset,
      algorithmInputs.painLocation,
      algorithmInputs.motorWeakness,
      algorithmInputs.conservativeTreatment,
    ];
    
    // Check if diagnostic block fields are needed
    if (algorithmInputs.diagnosticBlock === "yes") {
      requiredFields.push(algorithmInputs.blockResponse);
    }
    
    setInputsFilled(requiredFields.every((field) => field !== ""));

    if (inputsFilled) {
      generateRecommendations();
    }
  }, [algorithmInputs, inputsFilled]);

  const generateRecommendations = () => {
    const {
      symptomOnset,
      painLocation,
      motorWeakness,
      conservativeTreatment,
      diagnosticBlock,
      blockResponse,
      emgPerformed,
    } = algorithmInputs;

    let result = "";
    let recs = [];
    let color = "";

    // Check if conservative treatment was adequate
    if (conservativeTreatment === "no") {
      result = "Continue Conservative Management";
      color = "bg-orange-100 border-orange-500 text-orange-800";
      recs = [
        "Minimum 3-6 months of non-operative treatment recommended",
        "Pharmacologic management:",
        "• Gabapentinoids (gabapentin 300mg TID or pregabalin 75-150mg BID)",
        "• NSAIDs for inflammatory component",
        "• Topical lidocaine 5% patches or capsaicin cream",
        "Physical therapy:",
        "• Desensitization therapy",
        "• Scar mobilization",
        "• Functional training",
        "Consider interventional pain procedures:",
        "• Ultrasound-guided nerve blocks (diagnostic and therapeutic)",
        "• Genicular nerve radiofrequency ablation",
        "Reassess after adequate trial of conservative measures",
      ];
    } else {
      // Adequate conservative treatment completed
      // Determine surgical approach based on symptoms

      if (motorWeakness === "yes") {
        // Motor weakness present - likely CPN involvement
        result = "Surgical Intervention Recommended: Common Peroneal Nerve (CPN) Decompression";
        color = "bg-green-100 border-green-500 text-green-800";
        
        if (symptomOnset === "acute") {
          recs = [
            "ACUTE CPN PALSY PROTOCOL:",
            "• Early surgical decompression recommended (within 3 months preferred)",
            "• Studies show full recovery when performed within 18 days post-KA",
            "• Earlier intervention associated with better motor recovery",
            "",
            "Surgical Technique:",
            "• Oblique longitudinal incision from lateral knee to fibular head",
            "• Release peroneal tunnel and all compression sites",
            "• Decompress intermuscular septae",
            "• Consider lateral sural nerve decompression if indicated",
            "",
            "Additional Nerves to Consider:",
            "• Superficial peroneal nerve (SPN) decompression if symptoms present",
            "• Deep peroneal nerve (DPN) if anterior compartment involvement",
            "",
            "Expected Outcomes:",
            "• 100% improvement rate in motor function (based on study data)",
            "• Mean pain score post-op: 0.9/10",
            "• Recovery typically within 3 months",
          ];
        } else {
          recs = [
            "DELAYED CPN PALSY PROTOCOL:",
            "• Surgical decompression still beneficial even years after KA",
            "• EMG helpful but not always diagnostic",
            "• Case reports show improvement even 10 years post-KA",
            "",
            "Surgical Technique:",
            "• Oblique longitudinal incision from lateral knee to fibular head",
            "• Release peroneal tunnel and all compression sites",
            "• Decompress intermuscular septae",
            "• Consider lateral sural nerve decompression if indicated",
            "",
            "Additional Nerves to Consider:",
            "• Superficial peroneal nerve (SPN) decompression if symptoms present",
            "• Deep peroneal nerve (DPN) if anterior compartment involvement",
            "",
            "Expected Outcomes:",
            "• Significant improvement in motor function",
            "• Pain relief in lateral knee symptoms",
            "• Functional recovery over several months",
          ];
        }
      } else if (painLocation === "lateral") {
        // Lateral pain without motor weakness - still likely CPN compression
        result = "Surgical Intervention Recommended: Common Peroneal Nerve (CPN) Decompression";
        color = "bg-green-100 border-green-500 text-green-800";
        recs = [
          "LATERAL KNEE PAIN PROTOCOL:",
          "• CPN compression can cause pain without motor symptoms",
          "• Positive Tinel's sign at fibular neck is diagnostic",
          "",
          "Surgical Technique:",
          "• Oblique longitudinal incision from lateral knee to fibular head",
          "• Release peroneal tunnel and all compression sites",
          "• Decompress intermuscular septae",
          "• Consider lateral sural nerve decompression (performed in 54.5% of cases)",
          "",
          "Additional Considerations:",
          "• Lateral femoral cutaneous nerve (LFCN) involvement",
          "• Superficial peroneal nerve (SPN)",
          "• Deep peroneal nerve (DPN)",
          "",
          "Expected Outcomes:",
          "• Mean pain score post-op: 0.9/10 (excellent pain relief)",
          "• Quality of life comparable to general population",
          "• 95.5% patient-reported improvement",
        ];
      } else if (painLocation === "medial" || painLocation === "anterior") {
        // Medial or anterior pain - likely saphenous nerve or IPBSN
        if (diagnosticBlock === "yes" && blockResponse === "positive") {
          result = "Surgical Intervention Recommended: Saphenous Nerve Neurectomy with Active Management";
          color = "bg-green-100 border-green-500 text-green-800";
          recs = [
            "MEDIAL/ANTERIOR KNEE PAIN PROTOCOL:",
            "• Positive diagnostic block confirms peripheral nerve involvement",
            "• Saphenous nerve or infrapatellar branch (IPBSN) most commonly involved",
            "",
            "Surgical Technique - Active Nerve Management Preferred:",
            "1. Targeted Muscle Reinnervation (TMR):",
            "   • Transect symptomatic nerve proximal to painful area",
            "   • Coapt proximal end to motor branch of vastus medialis",
            "   • Provides physiologic target for axonal regeneration",
            "   • Prevents symptomatic neuroma formation",
            "",
            "2. Regenerative Peripheral Nerve Interface (RPNI):",
            "   • Transect symptomatic nerve",
            "   • Place nerve into small free muscle graft",
            "   • Alternative to TMR when motor targets unavailable",
            "",
            "Nerves to Consider:",
            "• Saphenous nerve (primary)",
            "• Infrapatellar branch of saphenous nerve (IPBSN)",
            "• Genicular nerves",
            "• Retinacular nerves",
            "• Anterior cutaneous branch of obturator nerve (ACBON)",
            "",
            "Expected Outcomes:",
            "• 91.7% patient-reported improvement (study: 11/12 patients)",
            "• Mean pain score: 5.0/10 (better than pre-operative baseline)",
            "• No revision surgeries required in study cohort",
            "• Lower recurrence vs. passive nerve management",
          ];
        } else if (diagnosticBlock === "yes" && blockResponse === "negative") {
          result = "Peripheral Nerve Surgery NOT Indicated";
          color = "bg-red-100 border-red-500 text-red-800";
          recs = [
            "Negative diagnostic block suggests pain is NOT from isolated peripheral nerve",
            "",
            "Differential Diagnoses to Consider:",
            "• Mechanical/prosthetic issues (loosening, malposition)",
            "• Intra-articular pathology",
            "• Complex regional pain syndrome (CRPS)",
            "• Centralized pain syndrome",
            "• Referred pain from lumbar spine",
            "",
            "Recommended Next Steps:",
            "• Comprehensive pain evaluation",
            "• Consider pain medicine consultation",
            "• Imaging studies (X-ray, CT, MRI) to evaluate prosthesis",
            "• Rule out infection or inflammatory processes",
            "• Consider psychology/psychiatry evaluation",
            "• May need multidisciplinary pain management approach",
          ];
        } else {
          result = "Diagnostic Nerve Block Recommended";
          color = "bg-yellow-100 border-yellow-500 text-yellow-800";
          recs = [
            "DIAGNOSTIC WORKUP:",
            "• Ultrasound-guided nerve block essential for medial/anterior pain",
            "• Use mixture of lidocaine and bupivacaine",
            "• Positive response: >50% pain relief during anesthetic effect",
            "",
            "Target Nerves for Block:",
            "• Saphenous nerve (distal thigh)",
            "• Infrapatellar branch of saphenous nerve",
            "• Genicular nerves",
            "",
            "Interpretation:",
            "• Positive block (>50% relief) → Proceed with surgical evaluation",
            "• Negative block → Consider alternative diagnoses",
            "• Partial response → May indicate mixed pain generators",
            "",
            "After Positive Block:",
            "• Confirm anatomic location of painful nerve",
            "• Plan surgical approach (TMR vs. RPNI)",
            "• Set realistic patient expectations",
            "• Optimize medical comorbidities before surgery",
          ];
        }
      } else if (painLocation === "combined") {
        // Both lateral and medial pain
        result = "Surgical Intervention Recommended: Combined Approach";
        color = "bg-blue-100 border-blue-500 text-blue-800";
        recs = [
          "COMBINED LATERAL AND MEDIAL SYMPTOMS:",
          "• Requires comprehensive surgical approach",
          "• Address both CPN and saphenous nerve territories",
          "",
          "Surgical Strategy:",
          "1. Common Peroneal Nerve Decompression:",
          "   • Release peroneal tunnel",
          "   • Decompress intermuscular septae",
          "   • Include lateral sural nerve if indicated",
          "",
          "2. Saphenous Nerve Neurectomy with Active Management:",
          "   • TMR to vastus medialis motor branch (preferred)",
          "   • Or RPNI if motor targets unavailable",
          "   • Consider additional branches (IPBSN, genicular)",
          "",
          "Considerations:",
          "• Can be performed in single stage if patient appropriate",
          "• More complex pathology may result in variable outcomes",
          "• Study data shows lower physical function scores in combined group",
          "• Still significant improvement: 100% patients reported benefit",
          "",
          "Expected Outcomes:",
          "• Mean pain score: 5.6/10",
          "• Quality of life index: 0.751 (vs. 0.851 general population)",
          "• Functional improvement despite complex presentation",
        ];
      }
    }

    setAlgorithmResult(result);
    setRecommendations(recs);
    setResultColor(color);
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
          Knee Arthroplasty Nerve Management Algorithm
        </h2>
        <p className="text-gray-600">
          Surgical management of peripheral nerve symptoms following knee
          arthroplasty
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-l border-r bg-white">
        <button
          className={`px-4 py-2 ${
            activeTab === "algorithm"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("algorithm")}
        >
          Algorithm
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

      {activeTab === "algorithm" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
          {/* Left Column - Inputs */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                Clinical Assessment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Timing of symptom onset after knee arthroplasty*
                  </label>
                  <select
                    name="symptomOnset"
                    value={algorithmInputs.symptomOnset}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="acute">Acute (within days to weeks)</option>
                    <option value="delayed">Delayed (months to years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary location of pain/symptoms*
                  </label>
                  <select
                    name="painLocation"
                    value={algorithmInputs.painLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="medial">Medial knee</option>
                    <option value="anterior">Anterior knee</option>
                    <option value="lateral">Lateral knee/leg</option>
                    <option value="combined">Combined (medial + lateral)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Motor weakness present (foot drop, dorsiflexion/eversion
                    weakness)*
                  </label>
                  <select
                    name="motorWeakness"
                    value={algorithmInputs.motorWeakness}
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
                    Adequate conservative treatment completed (minimum 3-6
                    months)*
                  </label>
                  <select
                    name="conservativeTreatment"
                    value={algorithmInputs.conservativeTreatment}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {algorithmInputs.conservativeTreatment === "yes" &&
                  algorithmInputs.motorWeakness === "no" &&
                  (algorithmInputs.painLocation === "medial" ||
                    algorithmInputs.painLocation === "anterior" ||
                    algorithmInputs.painLocation === "combined") && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Diagnostic nerve block performed?*
                        </label>
                        <select
                          name="diagnosticBlock"
                          value={algorithmInputs.diagnosticBlock}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      {algorithmInputs.diagnosticBlock === "yes" && (
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Response to diagnostic block (&gt;50% pain relief)*
                          </label>
                          <select
                            name="blockResponse"
                            value={algorithmInputs.blockResponse}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                          >
                            <option value="">Select...</option>
                            <option value="positive">
                              Positive (&gt;50% relief)
                            </option>
                            <option value="negative">
                              Negative (&lt;50% relief)
                            </option>
                          </select>
                        </div>
                      )}
                    </>
                  )}

                {algorithmInputs.motorWeakness === "yes" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      EMG/nerve conduction studies performed?
                    </label>
                    <select
                      name="emgPerformed"
                      value={algorithmInputs.emgPerformed}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes - confirms neuropathy</option>
                      <option value="no">No</option>
                      <option value="negative">Yes - but negative/normal</option>
                    </select>
                  </div>
                )}

                <p className="text-xs text-gray-500">* Required fields</p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="md:col-span-2">
            {inputsFilled ? (
              <div className="bg-white p-6 rounded shadow">
                <div className={`p-4 mb-4 rounded border-l-4 ${resultColor}`}>
                  <h2 className="text-xl font-bold mb-2">
                    Clinical Recommendation:
                  </h2>
                  <p className="text-lg font-medium">{algorithmResult}</p>
                </div>

                {recommendations.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-bold text-gray-700 mb-3">
                      Detailed Management Plan:
                    </h3>
                    <div className="space-y-1 text-sm">
                      {recommendations.map((rec, index) => (
                        <div key={index}>
                          {rec === "" ? (
                            <div className="h-2"></div>
                          ) : rec.includes(":") && rec.includes("PROTOCOL") ? (
                            <p className="font-bold text-[#0096B7] mt-3 mb-1">
                              {rec}
                            </p>
                          ) : rec.includes(":") && !rec.includes("•") ? (
                            <p className="font-bold mt-2">{rec}</p>
                          ) : (
                            <p className="ml-2">{rec}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 bg-blue-50 rounded border border-[#0096B7]">
                  <h4 className="font-bold text-[#0096B7] mb-2">
                    Key Clinical Pearls:
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <span className="font-medium">Patient Selection:</span>{" "}
                      Realistic expectations, absence of significant
                      psychological comorbidities
                    </li>
                    <li>
                      • <span className="font-medium">Timing:</span> Median time
                      to surgery in study: 29.5 months post-KA
                    </li>
                    <li>
                      • <span className="font-medium">Overall Success:</span>{" "}
                      95.5% patient-reported improvement in study cohort
                    </li>
                    <li>
                      • <span className="font-medium">Quality of Life:</span>{" "}
                      Post-op QOL (EQ-5D-5L: 0.861) matches general population
                      (0.851)
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded shadow">
                <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                  <h2 className="text-xl font-bold">
                    Knee Arthroplasty Nerve Management
                  </h2>
                  <p>Complete all required fields for clinical recommendations</p>
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg text-center font-medium text-gray-700">
                    This algorithm guides surgical management of neuropathic
                    symptoms after knee arthroplasty
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    Based on a retrospective study of 27 extremities with 95.5%
                    patient-reported improvement
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-700">
                    Common Presentations
                  </h3>
                  <ul className="mt-2 text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#0096B7]">•</span>
                      <span>
                        <span className="font-medium">
                          Neuropathic pain (89%):
                        </span>{" "}
                        Burning, shooting, electrical pain with allodynia
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#0096B7]">•</span>
                      <span>
                        <span className="font-medium">Foot drop (7%):</span>{" "}
                        Common peroneal nerve palsy affecting ~0.4% of TKA
                        patients
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#0096B7]">•</span>
                      <span>
                        <span className="font-medium">
                          Risk factors for neuropathic pain:
                        </span>{" "}
                        Psychiatric comorbidity (53.8%), smoking (50%), CRPS
                        (8%)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
            About This Algorithm
          </h2>
          <p className="mb-4">
            This evidence-based algorithm provides a structured approach to the
            surgical management of peripheral nerve symptoms following knee
            arthroplasty (KA). The algorithm integrates both traditional nerve
            decompression and emerging active nerve management techniques (TMR
            and RPNI) for comprehensive management.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">Clinical Background</h3>
          <p className="mb-4">
            Over 650,000 knee arthroplasties are performed annually in the United
            States. Among patients who develop chronic post-surgical pain at 3
            months after TKA, the prevalence of neuropathic pain is 53-74%.
            Peroneal nerve palsy affects approximately 0.4% of all TKA patients,
            with higher rates (1.9%) in patients with valgus deformities.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              Impact of Untreated Symptoms:
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Quality of Life:</span> Health
                utility scores 34% lower than patients without complications
              </li>
              <li>
                <span className="font-medium">Mental Health:</span> Higher rates
                of anxiety (42% vs. 19%) and depression (38% vs. 12%)
              </li>
              <li>
                <span className="font-medium">Healthcare Costs:</span> Additional
                $7,000-$13,000 per patient annually
              </li>
              <li>
                <span className="font-medium">Function:</span> Delayed return to
                normal activities and work
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2 text-lg">Algorithm Development</h3>
          <p className="mb-4">
            This algorithm is based on a retrospective study and cross-sectional
            survey of 26 patients (27 extremities) who underwent peripheral nerve
            surgery for symptoms following KA at a tertiary care center. The study
            evaluated presentation, treatment, and outcomes with a median follow-up
            of 1.9 years (IQR: 1.1-4.2).
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Three Surgical Approaches
          </h3>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">
                1. Nerve Decompression (40.7% of cases)
              </h4>
              <p className="text-sm mb-2">
                <span className="font-medium">Indications:</span> Lateral knee
                pain and/or motor weakness (foot drop)
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Technique:</span> CPN decompression
                in peroneal tunnel, release of intermuscular septae, often with
                lateral sural nerve decompression
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Outcomes:</span>
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Mean pain score: 0.9/10 (excellent pain relief)</li>
                <li>100% improvement in motor function (3/3 patients with palsy)</li>
                <li>Quality of life: 0.944 (exceeds general population)</li>
                <li>All patients (100%) reported improvement</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">
                2. Neurectomy with Active Nerve Management (48.1% of cases)
              </h4>
              <p className="text-sm mb-2">
                <span className="font-medium">Indications:</span> Medial or
                anterior knee pain, positive diagnostic nerve block
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Techniques:</span>
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1 mb-2">
                <li>
                  <span className="font-medium">TMR (Targeted Muscle Reinnervation):</span> Coapt
                  nerve to motor branch (e.g., vastus medialis)
                </li>
                <li>
                  <span className="font-medium">RPNI (Regenerative Peripheral Nerve Interface):</span> Place
                  nerve into free muscle graft
                </li>
              </ul>
              <p className="text-sm mb-2">
                <span className="font-medium">Outcomes:</span>
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>91.7% patient-reported improvement (11/12 patients)</li>
                <li>Mean pain score: 5.0/10</li>
                <li>Quality of life: 0.840</li>
                <li>No revision surgeries required (vs. 6% in literature)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">
                3. Combined Approach (11.1% of cases)
              </h4>
              <p className="text-sm mb-2">
                <span className="font-medium">Indications:</span> Both lateral and
                medial symptoms
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Technique:</span> CPN decompression +
                saphenous nerve neurectomy with active management
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Outcomes:</span>
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>100% patient-reported improvement (3/3 patients)</li>
                <li>Mean pain score: 5.6/10</li>
                <li>Quality of life: 0.751</li>
                <li>More complex pathology, variable functional outcomes</li>
              </ul>
            </div>
          </div>

          <h3 className="font-bold mt-6 mb-2 text-lg">Patient Selection</h3>
          <p className="mb-2">Surgical candidacy requires:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              Localized pain corresponding to specific peripheral nerve
              distributions
            </li>
            <li>
              Pain refractory to 3-6 months of conservative management
              (medications, PT, interventional procedures)
            </li>
            <li>
              Positive response to diagnostic nerve block (for saphenous nerve
              symptoms)
            </li>
            <li>Absence of significant psychological comorbidities</li>
            <li>Realistic expectations about surgical outcomes</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">
              Differentiating Pain Types
            </h4>
            <div className="mt-2 text-sm">
              <p className="font-medium mb-1">Neuropathic Pain Characteristics:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Burning, shooting, or electrical-type quality</li>
                <li>Numbness and/or paresthesias</li>
                <li>Allodynia (pain from non-painful stimuli)</li>
                <li>Hyperalgesia (exaggerated pain response)</li>
                <li>Positive Tinel's sign over nerve</li>
              </ul>
              <p className="font-medium mb-1">
                Nociceptive Pain Characteristics:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Related to movement or mechanical stress</li>
                <li>Aching, throbbing quality</li>
                <li>Associated with prosthetic issues (loosening, malposition)</li>
                <li>May require different management approach</li>
              </ul>
            </div>
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
              This algorithm is based on a retrospective study and cross-sectional
              survey published in Arthroplasty journal, evaluating peripheral nerve
              surgery outcomes following knee arthroplasty.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Primary Research Article</h3>
          <div className="p-4 bg-gray-50 rounded border mb-6">
            <p className="font-medium">
              van Varsseveld OC, Raasveld FV, Liu WC, McCarty J, Hundepool CA,
              Zuidam JM, Valerio IL, Eberlin KR.
            </p>
            <p className="text-sm mt-1">
              Surgical management of peripheral nerve symptoms following knee
              arthroplasty.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Arthroplasty. 2025;7:27.
            </p>
            <p className="text-sm text-gray-600">
              doi: 10.1186/s42836-025-00315-0
            </p>
          </div>

          <h3 className="font-bold mt-6 mb-2">Study Design and Population</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Design:</span> Retrospective cohort
                with cross-sectional survey
              </li>
              <li>
                <span className="font-medium">Setting:</span> Tertiary care center
                in Northeastern United States (2012-2024)
              </li>
              <li>
                <span className="font-medium">Population:</span> 26 patients, 27
                treated lower extremities
              </li>
              <li>
                <span className="font-medium">Age:</span> Median 67.0 years (IQR:
                58.0-71.8)
              </li>
              <li>
                <span className="font-medium">Follow-up:</span> Median 1.9 years
                (IQR: 1.1-4.2)
              </li>
              <li>
                <span className="font-medium">Survey completion:</span> 80.8%
                (21/26 patients)
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Patient Characteristics</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Demographics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
              <li>61.5% female</li>
              <li>100% white race</li>
              <li>Median BMI: 29.0 kg/m² (IQR: 26.7-34.4)</li>
            </ul>
            <h4 className="font-medium mb-2">Comorbidities:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
              <li>Psychiatric comorbidities: 53.8%</li>
              <li>Smoking (current or former): 50.0%</li>
              <li>Preoperative opioid use: 46.2%</li>
              <li>Preoperative neuromodulator use: 50.0%</li>
              <li>History of chronic pain: 92.3%</li>
              <li>CRPS (diagnosed post-KA): 7.7%</li>
              <li>Diabetes: 15.4%</li>
            </ul>
            <h4 className="font-medium mb-2">KA Characteristics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Total knee arthroplasty: 88.9%</li>
              <li>Partial knee arthroplasty: 11.1%</li>
              <li>Indication: Primary osteoarthritis (85.2%)</li>
              <li>Valgus deformity: 11.1%</li>
              <li>Varus deformity: 14.8%</li>
              <li>
                Multiple KAs in same leg before nerve surgery: 18.5%
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Clinical Outcomes</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Primary Outcomes:</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm mb-3">
              <li>
                <span className="font-medium">
                  Patient Global Impression of Change (PGIC):
                </span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>Very much improved: 40.9% (9/22)</li>
                  <li>Much improved: 27.3% (6/22)</li>
                  <li>Minimally improved: 27.3% (6/22)</li>
                  <li>No change: 4.5% (1/22)</li>
                  <li>Overall improvement: 95.5%</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">
                  Quality of Life (EQ-5D-5L):
                </span>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>Overall: 0.861 ± 0.105</li>
                  <li>US general population: 0.851 ± 0.205</li>
                  <li>Post-op QOL matches general population</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-medium mb-2">Secondary Outcomes by Treatment Group:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Outcome</th>
                    <th className="border p-2 text-left">Neurectomy (n=12)</th>
                    <th className="border p-2 text-left">Decompression (n=7)</th>
                    <th className="border p-2 text-left">Combined (n=3)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">Pain (NRS)</td>
                    <td className="border p-2">5.0 ± 3.2</td>
                    <td className="border p-2">0.9 ± 1.4</td>
                    <td className="border p-2">5.6 ± 2.0</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Pain Interference (PROMIS)</td>
                    <td className="border p-2">62.7 ± 6.4</td>
                    <td className="border p-2">51.9 ± 10.9</td>
                    <td className="border p-2">64.2 ± 6.4</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Physical Function (PROMIS)</td>
                    <td className="border p-2">38.5 ± 4.0</td>
                    <td className="border p-2">48.8 ± 10.4</td>
                    <td className="border p-2">34.8 ± 4.1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">QOL (EQ-5D-5L)</td>
                    <td className="border p-2">0.840 ± 0.079</td>
                    <td className="border p-2">0.944 ± 0.096</td>
                    <td className="border p-2">0.751 ± 0.090</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Improvement Rate</td>
                    <td className="border p-2">91.7% (11/12)</td>
                    <td className="border p-2">100% (7/7)</td>
                    <td className="border p-2">100% (3/3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="font-bold mt-6 mb-2">Surgical Techniques and Timing</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">
                  Median time from KA to nerve surgery:
                </span>{" "}
                29.5 months (IQR: 12.5-71.0)
              </li>
              <li>
                <span className="font-medium">Diagnostic nerve blocks:</span>{" "}
                Performed in 59.3% of cases, 81.3% had pain relief
              </li>
              <li>
                <span className="font-medium">Previous nerve surgery:</span>{" "}
                18.5% had prior procedures in same neurotome
              </li>
              <li>
                <span className="font-medium">Additional nerve procedures:</span>{" "}
                69.2% had concurrent treatment of additional nerves (retinacular,
                genicular, ACBON)
              </li>
              <li>
                <span className="font-medium">Revision rate:</span> 0% (no
                revisions required in study cohort)
              </li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Motor Recovery Outcomes</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="text-sm mb-2">
              <span className="font-medium">CPN Palsy Patients (n=3):</span>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>All classified as incomplete palsy at presentation</li>
              <li>100% (3/3) had motor recovery after CPN decompression</li>
              <li>Improved dorsiflexion and eversion strength</li>
              <li>Better outcomes with earlier intervention</li>
            </ul>
          </div>

          <h3 className="font-bold mt-6 mb-2">Supporting Literature</h3>
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded border text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Singh JA, Yu S, Chen L, Cleveland JD. Rates of total joint
                replacement in the United States: future projections to 2020-2040.
                J Rheumatol. 2019;46(9):1134-40.
              </li>
              <li>
                Bertram W, Howells N, White SP, et al. Prevalence and patterns of
                neuropathic pain in people with chronic post-surgical pain after
                TKA. Bone Joint J. 2024;106-B(6):582-8.
              </li>
              <li>
                Wylde V, Hewlett S, Learmonth ID, Dieppe P. Persistent pain after
                joint replacement: prevalence, sensory qualities, and postoperative
                determinants. Pain. 2011;152(3):566-72.
              </li>
              <li>
                Carender CN, Bedard NA, An Q, Brown TS. Common peroneal nerve
                injury and recovery after total knee arthroplasty: a systematic
                review. Arthroplasty Today. 2020;6(4):662-7.
              </li>
              <li>
                Phillips JRA, Hopwood B, Arthur C, Stroud R, Toms AD. The natural
                history of pain and neuropathic pain after knee replacement. Bone
                Joint J. 2014;96-B(9):1227-33.
              </li>
              <li>
                Dellon AL. Postarthroplasty "palsy" and systemic neuropathy: a
                peripheral nerve management algorithm. Ann Plast Surg.
                2005;55(6):638-42.
              </li>
              <li>
                Johnson DB Jr, Marfo KA, Zochowski CG, et al. Acute common
                peroneal nerve decompression after total knee arthroplasty.
                Orthopedics. 2021;44(4):e556-e562.
              </li>
              <li>
                Park JH, Restrepo C, Norton R, et al. Common peroneal nerve palsy
                following total knee arthroplasty: prognostic factors and course
                of recovery. J Arthroplasty. 2013;28(9):1538-42.
              </li>
              <li>
                Zywiel MG, Mont MA, McGrath MS, et al. Peroneal nerve dysfunction
                after total knee arthroplasty: characterization and treatment. J
                Arthroplasty. 2011;26(3):379-85.
              </li>
              <li>
                Nahabedian MY, Johnson CA. Operative management of neuromatous
                knee pain: patient selection and outcome. Ann Plast Surg.
                2001;46(1):15-22.
              </li>
              <li>
                Shi SM, Meister DW, Graner KC, Ninomiya JT. Selective denervation
                for persistent knee pain after TKA: a report of 50 cases. J
                Arthroplasty. 2017;32(3):968-73.
              </li>
              <li>
                Eberlin KR, Ducic I. Surgical algorithm for neuroma management: a
                changing treatment paradigm. Plast Reconstr Surg Glob Open.
                2018;6(10):e1952.
              </li>
            </ol>
          </div>

          <h3 className="font-bold mt-6 mb-2">Study Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Small sample size (27 extremities) limits statistical power</li>
            <li>Retrospective single-center design</li>
            <li>Lack of pre-operative outcome data (PGIC used for meaningful change)</li>
            <li>80.8% follow-up completion rate (possible selection bias)</li>
            <li>
              Median follow-up of 1.9 years (longer-term data needed for durability)
            </li>
            <li>
              Heterogeneous patient population with varied comorbidities
            </li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">Future Directions:</h4>
            <ul className="text-sm space-y-1 text-yellow-800">
              <li>
                • Prospective multi-center studies with larger cohorts needed
              </li>
              <li>
                • Standardized preoperative and postoperative outcome measures
              </li>
              <li>
                • Longer follow-up to assess durability and late complications
              </li>
              <li>
                • Validated neuropathic pain assessment tools (DN4, PainDETECT)
              </li>
              <li>
                • KA-specific functional outcomes (Oxford Knee Score)
              </li>
              <li>• Cost-effectiveness analysis of peripheral nerve interventions</li>
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

export default KneeArthroplastyAlgorithm;
