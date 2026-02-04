// If Mangled Digit tool is selected, show it
if (selectedTool === 'mangled-digit') {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* BIG RED WARNING BANNER */}
      <div className="bg-red-50 border-4 border-red-400 p-8 mb-6 text-center rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-2xl font-bold text-red-800"> IMPORTANT VALIDATION NOTICE </span>
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
        <MangledDigitScore />
      </div>
    </div>
  );
}
