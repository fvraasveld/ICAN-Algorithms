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

const TMRHand = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    amputationLevel: "",
    specificDigit: "",
    neuromaPain: "",
    previousSurgeries: "",
    prostheticNeeds: "",
    motorFunction: "",
    timeSinceAmputation: "",
  });

  const [recommendations, setRecommendations] = useState<Recommendations>({
    donorNerve: "",
    targetMuscle: "",
    approach: "",
    additionalNotes: [],
    alternatives: "",
  });

  const [activeTab, setActiveTab] = useState<string>("assessment");
  const [allRequiredFieldsFilled, setAllRequiredFieldsFilled] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
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
    
    if (amputationLevel === "ray") {
      requiredFields.push(specificDigit);
    }
    
    setAllRequiredFieldsFilled(requiredFields.every(field => field !== ""));
  }, [patientData]);

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
    
    if (amputationLevel === "dip") {
      newRecommendations.donorNerve = "Digital nerve (proximal stump)";
      newRecommendations.targetMuscle = "Intrinsic muscle or FDP muscle belly";
      newRecommendations.approach = "Dorsal approach with identification of proper digital nerve";
      newRecommendations.additionalNotes = [
        "Consider nerve-to-nerve coaptation if significant stump requires mobility",
        "Limit dissection to prevent injury to adjacent structures"
      ];
      newRecommendations.alternatives = "Consider simple neuroma excision or RPNI technique";
    } else if (amputationLevel === "pip") {
      newRecommendations.donorNerve = "Digital nerve (proximal stump)";
      newRecommendations.targetMuscle = "Intrinsic muscle (interossei or lumbrical)";
      newRecommendations.approach = "Mid-lateral approach with preservation of extensor mechanism";
      newRecommendations.additionalNotes = [
        "Identify and protect FDP tendon during dissection",
        "Ensure tension-free coaptation"
      ];
      newRecommendations.alternatives = "Consider RPNI or nerve-to-nerve repair";
    } else if (amputationLevel === "ray") {
      if (specificDigit === "thumb") {
        newRecommendations.donorNerve = "Proper digital nerve of thumb";
        newRecommendations.targetMuscle = "Thenar muscles (APB or opponens pollicis)";
        newRecommendations.approach = "Curved incision at the base of thumb";
      } else if (specificDigit === "index") {
        newRecommendations.donorNerve = "Proper digital nerve of index finger";
        newRecommendations.targetMuscle = "First dorsal interosseous";
        newRecommendations.approach = "Dorsal or mid-lateral approach";
      } else if (specificDigit === "middle") {
        newRecommendations.donorNerve = "Proper digital nerve of middle finger";
        newRecommendations.targetMuscle = "Second dorsal or palmar interosseous";
        newRecommendations.approach = "Dorsal approach with metacarpal preservation";
      } else if (specificDigit === "ring") {
        newRecommendations.donorNerve = "Proper digital nerve of ring finger";
        newRecommendations.targetMuscle = "Third dorsal or palmar interosseous";
        newRecommendations.approach = "Dorsal approach with ulnar protection";
      } else if (specificDigit === "small") {
        newRecommendations.donorNerve = "Proper digital nerve of small finger";
        newRecommendations.targetMuscle = "Hypothenar muscles (ADM or ODM)";
        newRecommendations.approach = "Ulnar mid-lateral approach";
      }
      newRecommendations.additionalNotes = ["Maintain neurovascular bundle integrity"];
      newRecommendations.alternatives = "Ray transposition may be considered";
    } else if (amputationLevel === "transmetacarpal") {
      newRecommendations.donorNerve = "Common or proper digital nerves";
      newRecommendations.targetMuscle = "Remaining intrinsic muscles";
      newRecommendations.approach = "Dorsal approach with motor point identification";
      newRecommendations.additionalNotes = ["Map motor entry points prior to coaptation"];
      newRecommendations.alternatives = "Consider muscle burial if targets unavailable";
    } else if (amputationLevel === "carpometacarpal") {
      newRecommendations.donorNerve = "Median and ulnar nerve branches";
      newRecommendations.targetMuscle = "Proximal forearm muscles";
      newRecommendations.approach = "Extended carpal tunnel approach";
      newRecommendations.additionalNotes = ["Consider separate nerve targets"];
      newRecommendations.alternatives = "Conventional neuroma management";
    }
    
    if (prostheticNeeds === "yes") {
      newRecommendations.additionalNotes.push("Coordinate with prosthetist");
    }
    
    if (neuromaPain === "severe") {
      newRecommendations.additionalNotes.push("Consider hybrid TMR-RPNI procedure");
    }
    
    setRecommendations(newRecommendations);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded">
        <strong>Note:</strong> This tool should be used as a supplement to, not a replacement for, clinical judgment.
      </div>

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

      <div className="bg-white border-l border-r p-4">
        <h2 className="text-2xl font-bold text-[#0096B7]">Hand TMR Surgical Decision Algorithm</h2>
        <p className="text-gray-600">Personalized surgical approach for targeted muscle reinnervation in hand and digital amputations</p>
      </div>

      <div className="flex border-l border-r bg-white">
        <button
          className={`px-4 py-2 ${activeTab === "assessment" ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]" : "text-gray-600"}`}
          onClick={() => setActiveTab("assessment")}
        >
          Assessment
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "about" ? "border-b-2 border-[#0096B7] font-medium text-[#0096B7]" : "text-gray-600"}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>

      {activeTab === "assessment" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Patient Assessment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">1. Amputation Level*</label>
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
                    <label className="block text-sm font-medium mb-1">2. Specific Digit*</label>
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
                  <h3 className="text-lg font-bold mb-3 text-[#0096B7]">Technical Considerations</h3>
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
                  <h3 className="text-lg text-center font-medium text-gray-700">
                    This tool provides personalized TMR surgical approach for hand amputations
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    Fill out all patient assessment fields to receive customized recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-white p-6 border-l border-r border-b rounded-b-lg">
          <h2 className="text-xl font-bold mb-4 text-[#0096B7]">About This Tool</h2>
          <p className="mb-4">
            The Hand TMR Surgical Decision Algorithm provides a standardized framework for 
            approaching targeted muscle reinnervation in hand and digital amputations.
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#0096B7]">
            <h4 className="font-bold text-[#0096B7]">Interdisciplinary Care for Amputees Network</h4>
            <p className="mt-1 text-sm">Evidence-based decision support for hand TMR procedures.</p>
          </div>
        </div>
      )}

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

export default TMRHand;
