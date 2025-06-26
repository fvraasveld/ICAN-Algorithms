import React, { useState } from 'react';

const TMRHand = () => {
  const [activeTab, setActiveTab] = useState<string>("assessment");

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 p-3 mb-3 text-sm text-center text-yellow-800 rounded">
        <strong>Note:</strong> This tool is currently under construction.
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

      <div className="bg-gray-50 p-6 border-l border-r border-b rounded-b-lg">
        <div className="text-center py-12">
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Under Construction</h3>
            <p className="text-yellow-700">
              The Hand TMR Algorithm is currently being developed and will be available soon.
            </p>
          </div>
        </div>
      </div>

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
