import React, { useState, useEffect } from "react";

const TMRPredictionTool = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    tmrType: "",
    sex: "",
    currentSmoker: "",
    opioidUse: "",
    depression: "",
    amputationLevel: "",
    painScore: "",
    anxiety: ""
  });

  // State for calculated risk
  const [riskLevel, setRiskLevel] = useState("");
  
  // State for recommendations
  const [recommendations, setRecommendations] = useState([]);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("assessment");
  
  // State to track if all required fields are filled
  const [allRequiredFieldsFilled, setAllRequiredFieldsFilled] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calculate risk score whenever form data changes
  useEffect(() => {
    calculateRisk();
    checkRequiredFields();
  }, [formData]);

  // Check if all required fields are filled based on TMR type
  const checkRequiredFields = () => {
    const { tmrType, sex, currentSmoker, opioidUse, depression, amputationLevel, painScore, anxiety } = formData;
    
    // Different required fields based on TMR type
    if (tmrType === "primary") {
      setAllRequiredFieldsFilled(
        tmrType !== "" && 
        sex !== "" && 
        currentSmoker !== "" && 
        opioidUse !== "" && 
        depression !== "" && 
        amputationLevel !== ""
      );
    } else if (tmrType === "secondary") {
      setAllRequiredFieldsFilled(
        tmrType !== "" && 
        currentSmoker !== "" && 
        opioidUse !== "" && 
        depression !== "" && 
        amputationLevel !== "" && 
        painScore !== "" && 
        anxiety !== ""
      );
    } else {
      setAllRequiredFieldsFilled(false);
    }
  };

  // Main risk calculation function
  const calculateRisk = () => {
    const { tmrType, sex, currentSmoker, opioidUse, depression, amputationLevel, painScore, anxiety } = formData;
    
    // Return early if essential fields are empty
    if (!tmrType) {
      setRiskLevel("");
      setRecommendations([]);
      return;
    }
    
    let riskScore = 0;
    let newRecommendations = [];
    
    // Primary TMR risk factors
    if (tmrType === "primary") {
      // Male sex (risk factor for primary TMR)
      if (sex === "male") {
        riskScore += 1;
      }
      
      // Current smoker
      if (currentSmoker === "yes") {
        riskScore += 1.5;
        newRecommendations.push("Consider smoking cessation program prior to surgery");
      }
      
      // Pre-operative opioid use
      if (opioidUse === "yes") {
        riskScore += 2;
        newRecommendations.push("Develop opioid tapering strategy before surgery");
      }
      
      // Depression
      if (depression === "yes") {
        riskScore += 1.5;
        newRecommendations.push("Psychological evaluation recommended");
      }
      
      // Proximal amputation
      if (amputationLevel === "proximal") {
        riskScore += 1;
      }
    }
    
    // Secondary TMR risk factors
    if (tmrType === "secondary") {
      // Current smoker
      if (currentSmoker === "yes") {
        riskScore += 2;
        newRecommendations.push("Consider smoking cessation program prior to surgery");
      }
      
      // High pain scores (>6 considered high)
      if (painScore && parseInt(painScore) > 6) {
        riskScore += 1.5;
        newRecommendations.push("Consider multimodal pain management approach");
      }
      
      // Anxiety
      if (anxiety === "yes") {
        riskScore += 1;
        newRecommendations.push("Pre-operative anxiety management recommended");
      }
      
      // Pre-operative opioid use
      if (opioidUse === "yes") {
        riskScore += 1.5;
        newRecommendations.push("Develop opioid tapering strategy before surgery");
      }
      
      // Depression
      if (depression === "yes") {
        riskScore += 1;
        newRecommendations.push("Psychological evaluation recommended");
      }
      
      // Proximal amputation
      if (amputationLevel === "proximal") {
        riskScore += 1;
      }
    }
    
    // Determine risk level based on calculated score
    if (riskScore >= 4) {
      setRiskLevel("High Risk");
      newRecommendations.push("Consider delaying surgery until modifiable risk factors are addressed");
    } else if (riskScore >= 2) {
      setRiskLevel("Moderate Risk");
      newRecommendations.push("Close monitoring recommended during perioperative period");
    } else if (riskScore > 0) {
      setRiskLevel("Low Risk");
    } else {
      setRiskLevel("Minimal Risk");
    }
    
    // Add standard recommendations
    if (formData.tmrType) {
      newRecommendations.push("Follow standard TMR protocols and post-operative care");
    }
    
    setRecommendations(newRecommendations);
  };

  // Get risk level color
  const getRiskLevelColor = () => {
    if (riskLevel === "High Risk") {
      return "bg-red-50 border-red-200 text-red-800";
    } else if (riskLevel === "Moderate Risk") {
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    } else if (riskLevel === "Low Risk" || riskLevel === "Minimal Risk") {
      return "bg-green-50 border-green-200 text-green-800";
    }
    return "bg-gray-100 border-gray-200";
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
          TMR Outcome Predictor Assessment Tool
        </h2>
        <p className="text-gray-600">
          Predicting outcomes following Targeted Muscle Reinnervation (TMR)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-l border-r bg-white">
        <button
          className={`px-4 py-2 ${
            activeTab === "assessment"
              ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("assessment")}
        >
          Assessment
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

      {/* Tab Content */}
      {activeTab === "assessment" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
          {/* Left Column - Assessment */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">
                Risk Factors
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">TMR Type*</label>
                  <select 
                    name="tmrType"
                    value={formData.tmrType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="primary">Primary TMR</option>
                    <option value="secondary">Secondary TMR</option>
                  </select>
                </div>

                {formData.tmrType === "primary" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Sex*</label>
                    <select 
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Current Smoker*</label>
                  <select 
                    name="currentSmoker"
                    value={formData.currentSmoker}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pre-operative Opioid Use*</label>
                  <select 
                    name="opioidUse"
                    value={formData.opioidUse}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Depression*</label>
                  <select 
                    name="depression"
                    value={formData.depression}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Amputation Level*</label>
                  <select 
                    name="amputationLevel"
                    value={formData.amputationLevel}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="distal">Distal (Transradial/Transtibial)</option>
                    <option value="proximal">Proximal (Transhumeral/Transfemoral)</option>
                  </select>
                </div>

                {formData.tmrType === "secondary" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Pain Score (0-10)*</label>
                      <input 
                        type="number"
                        min="0"
                        max="10"
                        name="painScore"
                        value={formData.painScore}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                        placeholder="Enter score..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Anxiety*</label>
                      <select 
                        name="anxiety"
                        value={formData.anxiety}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                      >
                        <option value="">Select...</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </>
                )}

                <p className="text-xs text-gray-500">* Required fields</p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="md:col-span-2">
            {allRequiredFieldsFilled ? (
              <div className="bg-white p-6 rounded shadow">
                <div className={`p-4 mb-4 rounded border-l-4 ${getRiskLevelColor()}`}>
                  <h2 className="text-xl font-bold">Risk Assessment:</h2>
                  <p className="text-lg font-medium">{riskLevel}</p>
                </div>

                {recommendations.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-3 text-[#0096B7]">
                      Clinical Recommendations
                    </h2>
                    <ul className="space-y-1">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-[#0096B7]">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Risk factor summary */}
                <div className="mt-8 bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-700">
                    Risk Factor Summary
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    This assessment evaluates major risk factors identified in our RVM model study for predicting TMR outcomes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded shadow">
                <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                  <h2 className="text-xl font-bold">TMR Risk Assessment</h2>
                  <p>Complete all required fields to view risk assessment results</p>
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
                    This tool helps predict outcomes following TMR surgery
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    Fill out all required fields to receive an evidence-based
                    risk assessment and personalized clinical recommendations
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-700">
                    Clinical Implications
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Identifying risk factors early can guide appropriate patient
                    preparation, expectation management, and potentially multimodal
                    treatment approaches to optimize TMR outcomes.
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
            About This Tool
          </h2>
          <p className="mb-4">
            The TMR Outcome Predictor Assessment Tool provides a standardized framework for 
            predicting outcomes following Targeted Muscle Reinnervation (TMR) surgery based on 
            patient-specific risk factors identified through clinical research using a Relevance Vector Machine (RVM) learning model.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Risk Factors for Suboptimal Outcomes
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <span className="font-medium">
                Male sex (for Primary TMR)
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Male patients may experience different outcomes compared to females during primary TMR procedures.
              </p>
            </li>
            <li>
              <span className="font-medium">
                Current smoking status
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Active smokers may have impaired wound healing and nerve regeneration, potentially reducing the efficacy of TMR.
              </p>
            </li>
            <li>
              <span className="font-medium">
                Pre-operative opioid use
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Patients using opioids preoperatively may have altered pain processing and more complex pain
                management needs postoperatively.
              </p>
            </li>
            <li>
              <span className="font-medium">
                Depression
              </span>
              <p className="text-sm text-gray-600 mt-1">
                The presence of depression can influence pain perception and potentially impact surgical outcomes.
              </p>
            </li>
            <li>
              <span className="font-medium">
                High pain scores (for Secondary TMR)
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Patients with higher preoperative pain scores may have central sensitization,
                potentially limiting pain relief from peripheral interventions.
              </p>
            </li>
            <li>
              <span className="font-medium">
                Anxiety (for Secondary TMR)
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Anxiety can affect pain perception and recovery, especially in secondary TMR procedures.
              </p>
            </li>
            <li>
              <span className="font-medium">
                Proximal amputation level
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Proximal amputations (transhumeral/transfemoral) may be associated with different recovery trajectories 
                compared to distal amputations (transradial/transtibial).
              </p>
            </li>
          </ol>

          <h3 className="font-bold mt-6 mb-2 text-lg">Clinical Application</h3>
          <p className="mb-4">
            This tool is intended for preoperative assessment to identify patients who might benefit
            from additional interventions before or after TMR surgery to optimize outcomes. The presence
            of risk factors does not necessarily contraindicate TMR, but rather suggests the need for
            careful patient preparation, expectation management, and potentially multimodal approaches.
          </p>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">
              Interdisciplinary Care for Amputees Network
            </h4>
            <p className="mt-1 text-sm">
              ICAN Algorithms provide evidence-based decision support tools for
              clinicians managing complex conditions in amputees,
              guiding individualized treatment and rehabilitation approaches.
            </p>
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
              This tool is based on machine learning research examining outcomes following TMR surgery and 
              factors associated with pain relief and functional improvement.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Primary Reference</h3>
          <div className="bg-gray-50 p-4 rounded border mb-4">
            <p className="font-medium">
              Raasveld FV, Zhang Z, Johnston BR, et al. Machine Learning Approach to Predict Pain Outcomes Following Primary and Secondary Targeted Muscle Reinnervation in Amputees. Ann Surg. 2025 (In Press).
            </p>
            <p className="mt-2 text-sm text-gray-600">
              This study utilized a Relevance Vector Machine (RVM) approach to identify key factors predicting outcomes following TMR surgery.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Supporting References</h3>
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded border text-sm">
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Raasveld FV, Mayrhofer-Schmid M, Johnston BR, et al. Targeted muscle reinnervation at the time of amputation to prevent the development of neuropathic pain. J Plast Reconstr Aesthet Surg. 2024;97:13-22.
              </li>
              <li>
                Dumanian GA, Potter BK, Mioton LM, et al. Targeted Muscle Reinnervation Treats Neuroma and Phantom Pain in Major Limb Amputees: A Randomized Clinical Trial. Ann Surg. 2019;270(2):238-246.
              </li>
              <li>
                Bowen JB, Wee CE, Kalik J, et al. Targeted Muscle Reinnervation to Improve Pain, Prosthetic Tolerance, and Bioprosthetic Outcomes in the Amputee. Adv Wound Care (New Rochelle). 2017;6(8):261-267.
              </li>
            </ol>
          </div>

          <h3 className="font-bold mt-6 mb-2">Evidence Summary</h3>
          <p className="mb-4">
            Our research utilizing a Relevance Vector Machine learning model identified several key factors that influence outcomes following TMR surgery. The model demonstrated different risk profiles for primary versus secondary TMR procedures.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded border">
              <h4 className="font-bold text-[#0096B7]">Primary TMR</h4>
              <ul className="list-disc pl-5 mt-2">
                <li>Preoperative opioid use</li>
                <li>Male sex</li>
                <li>Depression</li>
                <li>Current smoking status</li>
                <li>Proximal amputation level</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded border">
              <h4 className="font-bold text-[#0096B7]">Secondary TMR</h4>
              <ul className="list-disc pl-5 mt-2">
                <li>Current smoking status</li>
                <li>High preoperative pain scores</li>
                <li>Anxiety</li>
                <li>Preoperative opioid use</li>
                <li>Depression</li>
                <li>Proximal amputation level</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 p-4 mt-6 rounded text-sm text-gray-600 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">ICAN Algorithms</p>
            <p className="text-xs">Version 1.0 - May 2025</p>
          </div>
          <div className="text-right">
            <p>© Interdisciplinary Care for Amputees Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TMRPredictionTool;
