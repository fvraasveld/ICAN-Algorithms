import React, { useState } from 'react';

const TMRHand = () => {
  const [activeTab, setActiveTab] = useState<string>("assessment");
  const [amputationLevel, setAmputationLevel] = useState<string>("");
  const [specificDigit, setSpecificDigit] = useState<string>("");

  const handleAmputationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmputationLevel(e.target.value);
    if (e.target.value !== "ray") {
      setSpecificDigit("");
    }
  };

  const getRecommendation = () => {
    if (!amputationLevel) return "Please select amputation level";
    
    if (amputationLevel === "dip") {
      return "DIP Amputation: Digital nerve to intrinsic muscle with dorsal approach";
    } else if (amputationLevel === "pip") {
      return "PIP Amputation: Digital nerve to interossei with mid-lateral approach";
    } else if (amputationLevel === "ray") {
      if (!specificDigit) return "Please select specific digit";
      return `Ray Amputation (${specificDigit}): Proper digital nerve to appropriate intrinsic muscle`;
    } else if (amputationLevel === "transmetacarpal") {
      return "Transmetacarpal: Common digital nerves to remaining intrinsic muscles";
    } else if (amputationLevel === "carpometacarpal") {
      return "Carpometacarpal: Median/ulnar branches to forearm muscles";
    }
    
    return "";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded">
        <strong>Note:</strong> This tool should be used as a supplement to, not a replacement for, clinical judgment.
      </div>

      <div className="bg-[#0096B7] text-white p-5 rounded-t-lg shadow">
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

      <div className="bg-white border-l border-r p-4">
        <h2 className="text-2xl font-bold text-[#0096B7]">Hand TMR Surgical Decision Algorithm</h2>
        <p className="text-gray-600">Personalized surgical approach for targeted muscle reinnervation in hand amputations</p>
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
        <div className="bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">Patient Assessment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amputation Level</label>
                  <select
                    value={amputationLevel}
                    onChange={handleAmputationChange}
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

                {amputationLevel === "ray" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Specific Digit</label>
                    <select
                      value={specificDigit}
                      onChange={(e) => setSpecificDigit(e.target.value)}
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
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-[#0096B7]">TMR Recommendation</h2>
              <div className="p-4 bg-gray-50 rounded border">
                <p className="text-gray-700">{getRecommendation()}</p>
              </div>
            </div>
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

export default HandTMRAlgorithm;
