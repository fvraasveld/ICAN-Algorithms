import React, { useState } from "react";
import TMRPredictionTool from './components/TMRPredictionTool';
import CentralPainCriteriaAssessment from './components/CentralizedPainCriteria';
import TMRCentersMap from './components/TMRLiteratureMap';components/TMRLiteratureMap';

const ICANAlgorithmsLanding = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Tool data - REAL ICAN tools with correct categories
  const tools = [
    {
      id: 'tmr-predictor',
      title: 'TMR Outcome Predictor in Amputees',
      description: 'Predicting outcomes following Targeted Muscle Reinnervation (TMR) in amputee patients',
      category: 'Surgical Planning',
      status: 'Available',
      icon: '🎯'
    },
    {
      id: 'central-pain',
      title: 'Central Pain Assessment Following PNI',
      description: 'Evaluating centralized pain following peripheral nerve injury (PNI)',
      category: 'Surgical Planning',
      status: 'Available', 
      icon: '⚡'
    },
    {
      id: 'knee-arthroplasty',
      title: 'Knee Arthroplasty Nerve Management',
      description: 'Surgical management of peripheral nerve symptoms following knee arthroplasty',
      category: 'Surgical Planning',
      status: 'Under Construction',
      icon: '🦵'
    },
    {
      id: 'tmr-hand',
      title: 'TMR Algorithm for Hand',
      description: 'Specialized TMR assessment and planning for hand amputations',
      category: 'Surgical Planning',
      status: 'Under Construction',
      icon: '✋'
    },
    {
      id: 'tmr-map',
      title: 'TMR World Map',
      description: 'Interactive global map of TMR research centers and publications',
      category: 'Education & Training',
      status: 'Available',
      icon: '🗺️'
    }
  ];

  // Group tools by category - includes Treatment Planning
  const toolsByCategory = tools.reduce((acc: Record<string, any[]>, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, any[]>);

  const handleToolSelect = (toolId: string) => {
    if (toolId === 'tmr-predictor') {
      setSelectedTool('tmr-predictor');
    } else if (toolId === 'central-pain') {
      setSelectedTool('central-pain');
    } else if (toolId === 'tmr-map') {
      setSelectedTool('tmr-map');
    }
    // TMR Hand is under construction - no navigation needed
  };

  const goBack = () => {
    setSelectedTool(null);
  };

  // If TMR tool is selected, show it
  if (selectedTool === 'tmr-predictor') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* BIG RED WARNING BANNER */}
        <div className="bg-red-50 border-4 border-red-400 p-8 mb-6 text-center rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-2xl font-bold text-red-800">⚠️ IMPORTANT VALIDATION NOTICE ⚠️</span>
          </div>
          <p className="text-xl font-bold text-red-800 mb-2">
            These evidence-based algorithms have been developed through our research and literature review, 
            but have NOT yet been externally validated.
          </p>
          <p className="text-lg font-semibold text-red-700">
            These tools should ONLY be used as a supplement to, not a replacement for, clinical judgment.
          </p>
        </div>
        <div className="bg-white p-4 border-b">
          <button 
            onClick={goBack}
            className="text-[#0096B7] hover:underline flex items-center mb-2"
          >
            ← Back to ICAN Algorithms
          </button>
          <TMRPredictionTool />
        </div>
      </div>
    );
  }

  // If Central Pain tool is selected, show it
  if (selectedTool === 'central-pain') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* BIG RED WARNING BANNER */}
        <div className="bg-red-50 border-4 border-red-400 p-8 mb-6 text-center rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-2xl font-bold text-red-800">⚠️ IMPORTANT VALIDATION NOTICE ⚠️</span>
          </div>
          <p className="text-xl font-bold text-red-800 mb-2">
            These evidence-based algorithms have been developed through our research and literature review, 
            but have NOT yet been externally validated.
          </p>
          <p className="text-lg font-semibold text-red-700">
            These tools should ONLY be used as a supplement to, not a replacement for, clinical judgment.
          </p>
        </div>
        <div className="bg-white p-4 border-b">
          <button 
            onClick={goBack}
            className="text-[#0096B7] hover:underline flex items-center mb-2"
          >
            ← Back to ICAN Algorithms
          </button>
          <CentralPainCriteriaAssessment />
        </div>
      </div>
    );
  }

  // If TMR Map is selected, show it
  if (selectedTool === 'tmr-map') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* BIG RED WARNING BANNER */}
        <div className="bg-red-50 border-4 border-red-400 p-8 mb-6 text-center rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-2xl font-bold text-red-800">⚠️ IMPORTANT VALIDATION NOTICE ⚠️</span>
          </div>
          <p className="text-xl font-bold text-red-800 mb-2">
            These evidence-based algorithms have been developed through our research and literature review, 
            but have NOT yet been externally validated.
          </p>
          <p className="text-lg font-semibold text-red-700">
            These tools should ONLY be used as a supplement to, not a replacement for, clinical judgment.
          </p>
        </div>
        <div className="bg-white p-4 border-b">
          <button 
            onClick={goBack}
            className="text-[#0096B7] hover:underline flex items-center mb-2"
          >
            ← Back to ICAN Algorithms
          </button>
          <TMRCentersMap />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* BIG RED WARNING BANNER */}
      <div className="bg-red-50 border-4 border-red-400 p-8 mb-6 text-center rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-2xl font-bold text-red-800">⚠️ IMPORTANT VALIDATION NOTICE ⚠️</span>
        </div>
        <p className="text-xl font-bold text-red-800 mb-2">
          These evidence-based algorithms have been developed through our research and literature review, 
          but have NOT yet been externally validated.
        </p>
        <p className="text-lg font-semibold text-red-700">
          These tools should ONLY be used as a supplement to, not a replacement for, clinical judgment.
        </p>
      </div>

      {/* Header with ICAN styling and logo */}
      <div className="bg-[#0096B7] text-white p-6 rounded-t-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo with white border */}
            <div className="bg-white p-0.5 border-0.5 border-white mr-6">
              <img
                src="https://i.ibb.co/jv6z7D3d/ICAN-logo-copy-2.png"
                alt="ICAN"
                className="h-32 w-auto"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                ICAN/Algorithms
              </h1>
              <div className="text-sm font-light tracking-wide uppercase mb-1">
                Interdisciplinary Care for Amputees Network
              </div>
              <div className="text-base font-medium">
                Evidence-Based Clinical Decision Support Tools
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white border-l border-r p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0096B7] mb-4">
            Clinical Decision Support Algorithms
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Welcome to ICAN Algorithms, a comprehensive suite of evidence-based tools designed to support 
            clinical decision-making in amputee care. Each algorithm has been developed through rigorous 
            research and validation to provide standardized, objective assessments for complex clinical scenarios.
          </p>
        </div>

        {/* Statistics - REMOVED fake numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-[#0096B7]">5</div>
            <div className="text-sm text-gray-600">Clinical Algorithms</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-[#0096B7]">Research-Based</div>
            <div className="text-sm text-gray-600">Evidence Foundation</div>
          </div>
        </div>
      </div>

      {/* Tools by Category */}
      <div className="bg-gray-50 border-l border-r border-b rounded-b-lg p-6">
        {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-bold text-[#0096B7] mb-4 flex items-center">
              <span className="mr-2">
                {category === 'Surgical Planning' ? '🔧' : 
                 category === 'Education & Training' ? '📚' : '🏥'}
              </span>
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <div 
                  key={tool.id}
                                      className={`
                    bg-white p-6 rounded-lg border-2 shadow-sm transition-all duration-200
                    ${tool.status === 'Available' 
                      ? 'hover:shadow-md hover:border-[#0096B7] cursor-pointer hover:scale-105' 
                      : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                  onClick={() => tool.status === 'Available' && handleToolSelect(tool.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-medium
                      ${tool.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : tool.status === 'Under Construction'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {tool.status}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {tool.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  
                  {tool.status === 'Available' && (
                    <div className="flex items-center text-[#0096B7] text-sm font-medium">
                      Launch Tool
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-white border border-gray-200 rounded-lg mt-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#0096B7] mb-4">About ICAN</h3>
            <p className="text-gray-700 mb-4">
              The Interdisciplinary Care for Amputees Network (ICAN) is dedicated to improving 
              outcomes for amputees through evidence-based research, clinical protocols, and 
              educational initiatives.
            </p>
            <p className="text-gray-700">
              Our algorithms represent years of collaborative research across multiple institutions, 
              providing clinicians with validated tools to enhance patient care and optimize outcomes.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-[#0096B7] mb-4">Research Foundation</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-[#0096B7]">•</span>
                Systematic reviews and meta-analyses
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#0096B7]">•</span>
                Machine learning and predictive modeling
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#0096B7]">•</span>
                Multi-center validation studies
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#0096B7]">•</span>
                Clinical outcome assessments
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 mt-6 rounded text-sm text-gray-600 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">ICAN Algorithms Platform</p>
            <p className="text-xs">Version 2.0 - June 2025</p>
          </div>
          <div className="text-right">
            <p>© Interdisciplinary Care for Amputees Network</p>
            <p className="text-xs">For research and clinical use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICANAlgorithmsLanding;
