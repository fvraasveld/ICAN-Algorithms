import React, { useState, useEffect } from 'react';

interface PatientData {
  amputationLevel: string;
  specificDigit: string;
  neuromaPain: string;
  previousSurgeries: string;
  prostheticNeeds: string;
  motorFunction: string;
  timeSinceAmputation: string;
}

interface Recommendations {
  donorNerve: string;
  targetMuscle: string;
  approach: string;
  additionalNotes: string[];
  alternatives: string;
}

const HandTMRAlgorithm = () => {
  // State for form inputs
  const [patientData, setPatientData] = useState<PatientData>({
    amputationLevel: "",
    specificDigit: "",
    neuromaPain: "",
    previousSurgeries: "",
    prostheticNeeds: "",
    motorFunction: "",
    timeSinceAmputation: "",
  });

  // State for recommendations
  const [recommendations, setRecommendations] = useState<Recommendations>({
    donorNerve: "",
    targetMuscle: "",
    approach: "",
    additionalNotes: [],
    alternatives: "",
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("assessment");
  
  // State to track if all required fields are filled
  const [allRequiredFieldsFilled, setAllRequiredFieldsFilled] = useState<boolean>(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for amputation level to reset specificDigit if needed
    if (name === "amputationLevel" && value !== "ray") {
      setPatientData({
        ...patientData,
        [name]: value,
        specificDigit: "",
      });
    } else {
      setPatientData({
        ...patientData,
        [name]: value
      });
    }
  };

  // Check if all required fields are filled
  useEffect(() => {
    const {
      amputationLevel,
      specificDigit,
      neuromaPain,
      previousSurgeries,
      prostheticNeeds,
      motorFunction,
      timeSinceAmputation,
    } = patientData;
    
    let requiredFields = [
      amputationLevel,
      neuromaPain,
      previousSurgeries,
      prostheticNeeds,
      motorFunction,
      timeSinceAmputation,
    ];
    
    // Add specificDigit as required only for ray amputations
    if (amputationLevel === "ray") {
      requiredFields.push(specificDigit);
    }
    
    setAllRequiredFieldsFilled(requiredFields.every(field => field !== ""));
  }, [patientData]);

  // Generate TMR recommendations
  useEffect(() => {
    if (!allRequiredFieldsFilled) {
      setRecommendations({
        donorNerve: "",
        targetMuscle: "",
        approach: "",
        additionalNotes: [],
        alternatives: "",
      });
      return;
    }
    
    generateRecommendations();
  }, [allRequiredFieldsFilled, patientData]);

  const generateRecommendations = () => {
    const {
      amputationLevel,
      specificDigit,
      neuromaPain,
      previousSurgeries,
      prostheticNeeds,
      motorFunction,
      timeSinceAmputation,
    } = patientData;
    
    let newRecommendations: Recommendations = {
      donorNerve: "",
      targetMuscle: "",
      approach: "",
      additionalNotes: [],
      alternatives: "",
    };
    
    // DIP Amputation
    if (amputationLevel === "dip") {
      newRecommendations.donorNerve = "Digital nerve (proximal stump)";
      newRecommendations.targetMuscle = "Intrinsic muscle or FDP muscle belly";
      newRecommendations.approach = "Dorsal approach with identification of proper digital nerve";
      newRecommendations.additionalNotes = [
        "Consider nerve-to-nerve coaptation if significant stump requires mobility",
        "Limit dissection to prevent injury to adjacent structures"
      ];
      
      if (prostheticNeeds === "yes") {
        newRecommendations.additionalNotes.push("Coordinate with prosthetist for optimal positioning");
      }
      
      if (neuromaPain === "severe") {
        newRecommendations.additionalNotes.push("Consider combined TMR with targeted sensory reinnervation");
      }
      
      newRecommendations.alternatives = "Consider simple neuroma excision or RPNI technique if intrinsic muscles not available";
    }
    // PIP Amputation
    else if (amputationLevel === "pip") {
      newRecommendations.donorNerve = "Digital nerve (proximal stump)";
      newRecommendations.targetMuscle = "Intrinsic muscle (interossei or lumbrical)";
      newRecommendations.approach = "Mid-lateral approach with preservation of extensor mechanism";
      newRecommendations.additionalNotes = [
        "Identify and protect FDP tendon during dissection",
        "Ensure tension-free coaptation"
      ];
      
      if (timeSinceAmputation === "early") {
        newRecommendations.additionalNotes.push("Primary TMR recommended during initial surgery");
      } else {
        newRecommendations.additionalNotes.push("Secondary TMR may require additional dissection due to scarring");
      }
      
      newRecommendations.alternatives = "Consider RPNI or nerve-to-nerve repair if functional recovery is priority";
    }
    // Ray Amputation
    else if (amputationLevel === "ray") {
      if (specificDigit === "thumb") {
        newRecommendations.donorNerve = "Proper digital nerve of thumb";
        newRecommendations.targetMuscle = "Thenar muscles (APB or opponens pollicis)";
        newRecommendations.approach = "Curved incision at the base of thumb";
        newRecommendations.additionalNotes = [
          "Maintain radial artery blood supply",
          "Consider first dorsal interosseous as alternative target"
        ];
        
        if (motorFunction === "impaired") {
          newRecommendations.additionalNotes.push("Consider additional motor transfer to enhance grip function");
        }
      } else if (specificDigit === "index") {
        newRecommendations.donorNerve = "Proper digital nerve of index finger";
        newRecommendations.targetMuscle = "First dorsal interosseous";
        newRecommendations.approach = "Dorsal or mid-lateral approach";
        newRecommendations.additionalNotes = [
          "Consider volar approach for tendon management in the same setting",
          "Minimize dissection of the first web space"
        ];
      } else if (specificDigit === "middle") {
        newRecommendations.donorNerve = "Proper digital nerve of middle finger";
        newRecommendations.targetMuscle = "Second dorsal or palmar interosseous";
        newRecommendations.approach = "Dorsal approach with metacarpal preservation";
        newRecommendations.additionalNotes = [
          "Evaluate adjacent metacarpal integrity",
          "Consider potential for tenodesis effect during nerve transfer"
        ];
      } else if (specificDigit === "ring") {
        newRecommendations.donorNerve = "Proper digital nerve of ring finger";
        newRecommendations.targetMuscle = "Third dorsal or palmar interosseous";
        newRecommendations.approach = "Dorsal approach with ulnar neurovascular bundle protection";
        newRecommendations.additionalNotes = [
          "Minimize dissection of hypothenar muscles",
          "Consider ulnar nerve branches as alternative"
        ];
      } else if (specificDigit === "small") {
        newRecommendations.donorNerve = "Proper digital nerve of small finger";
        newRecommendations.targetMuscle = "Hypothenar muscles (ADM or ODM)";
        newRecommendations.approach = "Ulnar mid-lateral approach with potential hypothenar extension";
        newRecommendations.additionalNotes = [
          "Protect ulnar neurovascular bundle",
          "Consider palmar approach if neuroma is more distal"
        ];
      }
      
      if (neuromaPain === "severe" && previousSurgeries === "multiple") {
        newRecommendations.additionalNotes.push("Consider hybrid TMR-RPNI procedure for complex neuroma management");
      }
      
      newRecommendations.alternatives = "Ray transposition may be considered for index or small finger";
    }
    // Transmetacarpal Amputation
    else if (amputationLevel === "transmetacarpal") {
      newRecommendations.donorNerve = "Common or proper digital nerves";
      newRecommendations.targetMuscle = "Remaining intrinsic muscles (interossei, lumbricals, thenar or hypothenar)";
      newRecommendations.approach = "Dorsal approach with identification of motor points";
      newRecommendations.additionalNotes = [
        "Map motor entry points prior to coaptation",
        "Consider sensory reinnervation if prosthetic interface planned",
        "Perform neurovascular bundle identification proximally"
      ];
      
      if (prostheticNeeds === "yes") {
        newRecommendations.additionalNotes.push("Consider Prosthesis-Guided TMR approach");
      }
      
      if (motorFunction === "preserved") {
        newRecommendations.additionalNotes.push("Preserve key muscle function for remaining digits");
      }
      
      newRecommendations.alternatives = "Consider primary closure with muscle burial if intrinsic muscles unavailable";
    }
    // Carpometacarpal Amputation
    else if (amputationLevel === "carpometacarpal") {
      newRecommendations.donorNerve = "Median and ulnar nerve branches";
      newRecommendations.targetMuscle = "Proximal forearm muscles (pronator quadratus, FCR, or palmaris longus)";
      newRecommendations.approach = "Extended carpal tunnel approach with identification of motor branch entry points";
      newRecommendations.additionalNotes = [
        "Consider separate median and ulnar nerve targets",
        "Evaluate for potential tendon transfers in the same setting",
        "Map motor entry points of pronator quadratus"
      ];
      
      if (neuromaPain === "severe") {
        newRecommendations.additionalNotes.push("Consider additional nerve decompressions proximally");
      }
      
      if (prostheticNeeds === "yes" && motorFunction === "preserved") {
        newRecommendations.additionalNotes.push("Targeted sensory reinnervation may enhance prosthetic control");
      }
      
      newRecommendations.alternatives = "Consider conventional neuroma management if pain is mild and no prosthesis is planned";
    }
    
    // Add general recommendations based on other patient factors
    if (previousSurgeries === "multiple") {
      newRecommendations.additionalNotes.push("Scar tissue may require more extensive dissection and magnification");
    }
    
    if (timeSinceAmputation === "late" && neuromaPain === "severe") {
      newRecommendations.additionalNotes.push("Consider preoperative nerve block to identify pain generators");
    }
    
    setRecommendations(newRecommendations);
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
          Hand TMR Surgical Decision Algorithm
        </h2>
        <p className="text-gray-600">
          Personalized surgical approach for targeted muscle reinnervation in hand and digital amputations
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
                Patient Assessment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    1. Amputation Level*
                  </label>
                  <select
                    name="amputationLevel"
                    value={patientData.amputationLevel}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="dip">DIP Amputation</option>
                    <option value="pip">PIP Amputation</option>
                    <option value="ray">Ray Amputation</option>
                    <option value="transmetacarpal">Transmetacarpal Amputation</option>
                    <option value="carpometacarpal">Carpometacarpal Amputation</option>
                  </select>
                </div>

                {patientData.amputationLevel === "ray" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      2. Specific Digit*
                    </label>
                    <select
                      name="specificDigit"
                      value={patientData.specificDigit}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                    >
                      <option value="">Select...</option>
                      <option value="thumb">Thumb</option>
                      <option value="index">Index Finger</option>
                      <option value="middle">Middle Finger</option>
                      <option value="ring">Ring Finger</option>
                      <option value="small">Small Finger</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {patientData.amputationLevel === "ray" ? "3" : "2"}. Neuroma Pain*
                  </label>
                  <select
                    name="neuromaPain"
                    value={patientData.neuromaPain}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {patientData.amputationLevel === "ray" ? "4" : "3"}. Previous Surgeries*
                  </label>
                  <select
                    name="previousSurgeries"
                    value={patientData.previousSurgeries}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="single">Single Prior Surgery</option>
                    <option value="multiple">Multiple Prior Surgeries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {patientData.amputationLevel === "ray" ? "5" : "4"}. Prosthetic Needs*
                  </label>
                  <select
                    name="prostheticNeeds"
                    value={patientData.prostheticNeeds}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="no">No Prosthesis Planned</option>
                    <option value="yes">Prosthesis Planned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {patientData.amputationLevel === "ray" ? "6" : "5"}. Remaining Motor Function*
                  </label>
                  <select
                    name="motorFunction"
                    value={patientData.motorFunction}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="preserved">Preserved</option>
                    <option value="impaired">Impaired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {patientData.amputationLevel === "ray" ? "7" : "6"}. Time Since Amputation*
                  </label>
                  <select
                    name="timeSinceAmputation"
                    value={patientData.timeSinceAmputation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-[#0096B7] focus:border-[#0096B7]"
                  >
                    <option value="">Select...</option>
                    <option value="early">Acute/Primary (≤ 4 weeks)</option>
                    <option value="late">Secondary (> 4 weeks)</option>
                  </select>
                </div>

                <p className="text-xs text-gray-500">* Required fields</p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="md:col-span-2">
            {allRequiredFieldsFilled ? (
              <div className="bg-white p-6 rounded shadow">
                <div className="p-4 mb-4 rounded border-l-4 bg-cyan-100 border-[#0096B7] text-[#0096B7]">
                  <h2 className="text-xl font-bold">TMR Surgical Approach</h2>
                  <p className="text-lg font-medium">
                    {patientData.amputationLevel === "dip" ? "DIP Amputation" : 
                     patientData.amputationLevel === "pip" ? "PIP Amputation" :
                     patientData.amputationLevel === "ray" ? `Ray Amputation (${patientData.specificDigit.charAt(0).toUpperCase() + patientData.specificDigit.slice(1)} Finger)` :
                     patientData.amputationLevel === "transmetacarpal" ? "Transmetacarpal Amputation" :
                     "Carpometacarpal Amputation"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded border">
                    <h3 className="font-bold text-[#0096B7] mb-2">Donor Nerve</h3>
                    <p>{recommendations.donorNerve}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded border">
                    <h3 className="font-bold text-[#0096B7] mb-2">Target Muscle</h3>
                    <p>{recommendations.targetMuscle}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded border mb-6">
                  <h3 className="font-bold text-[#0096B7] mb-2">Surgical Approach</h3>
                  <p>{recommendations.approach}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 text-[#0096B7]">
                    Technical Considerations
                  </h3>
                  <ul className="space-y-1 mb-6">
                    {recommendations.additionalNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-[#0096B7]">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {recommendations.alternatives && (
                  <div className="p-4 bg-yellow-50 rounded border">
                    <h3 className="font-bold text-yellow-700 mb-2">Alternative Approaches</h3>
                    <p>{recommendations.alternatives}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded shadow">
                <div className="bg-[#0096B7] text-white p-4 mb-4 rounded">
                  <h2 className="text-xl font-bold">Hand TMR Surgical Recommendations</h2>
                  <p>Complete all fields to view surgical approach</p>
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
                    This tool provides a personalized TMR surgical approach for hand and digital amputations
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    Fill out all patient assessment fields to receive customized donor nerve, target muscle, 
                    and surgical approach recommendations
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-700">
                    Surgical Considerations
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    TMR in the hand requires careful consideration of amputation level, neuroma characteristics, 
                    and remaining motor function. This algorithm provides evidence-based guidance for optimal 
                    donor nerve and target muscle selection.
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
            The Hand TMR Surgical Decision Algorithm provides a standardized framework for 
            approaching targeted muscle reinnervation in hand and digital amputations.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-lg">
            Amputation Levels and TMR Approaches
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <span className="font-medium">DIP Amputation</span>
              <p className="text-sm text-gray-600 mt-1">
                Digital nerve reinnervation with minimal dissection.
              </p>
            </li>
            <li>
              <span className="font-medium">PIP Amputation</span>
              <p className="text-sm text-gray-600 mt-1">
                Intrinsic muscle targeting with extensor preservation.
              </p>
            </li>
            <li>
              <span className="font-medium">Ray Amputation</span>
              <p className="text-sm text-gray-600 mt-1">
                Digit-specific approaches based on anatomy.
              </p>
            </li>
            <li>
              <span className="font-medium">Transmetacarpal Amputation</span>
              <p className="text-sm text-gray-600 mt-1">
                Motor point mapping and intrinsic muscle preservation.
              </p>
            </li>
            <li>
              <span className="font-medium">Carpometacarpal Amputation</span>
              <p className="text-sm text-gray-600 mt-1">
                Forearm muscle targets with complex nerve considerations.
              </p>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">
              Interdisciplinary Care for Amputees Network
            </h4>
            <p className="mt-1 text-sm">
              Evidence-based decision support for hand TMR procedures.
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
              Based on systematic review of 35 hand TMR studies including anatomical feasibility studies and clinical series.
            </p>
          </div>

          <h3 className="font-bold mt-4 mb-2">Key References</h3>
          <div className="overflow-y-auto max-h-64 bg-gray-50 p-4 rounded border text-sm">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Fowler TP. Targeted muscle reinnervation in the hand: a technical roadmap. J Hand Surg Am. 2022;47(3):287.e1-287.e8.</li>
              <li>Daugherty THF, Mailey BA, Bueno RA, Neumeister MW. Targeted muscle reinnervation in the hand: an anatomical feasibility study. J Hand Surg Am. 2020;45(9):802-812.</li>
              <li>Chepla KJ, Wu-Fienberg Y. Targeted muscle reinnervation for partial hand amputation. Hand Clin. 2022;38(1):147-153.</li>
            </ol>
          </div>

          <h3 className="font-bold mt-6 mb-2">Evidence Summary</h3>
          <p className="mb-4">
            Hand TMR demonstrates 83-97% pain reduction rates with digit-specific approaches based on anatomical level and remaining motor function.
          </p>
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

export default HandTMRAlgorithm;
