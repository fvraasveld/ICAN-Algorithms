import React, { useEffect, useMemo, useState } from "react";

type YesNo = "yes" | "no" | "";
type SymptomOnset = "acute" | "delayed" | "";
type PainLocation = "medial" | "lateral" | "anterior" | "posterior" | "diffuse" | "";

type AlgorithmInputs = {
  symptomOnset: SymptomOnset;
  painLocation: PainLocation;
  motorWeakness: YesNo;
  conservativeTreatment: YesNo;
  diagnosticBlock: YesNo;
  blockResponse: "good" | "partial" | "none" | "";
  emgPerformed: YesNo;
};

const KneeArthroplastyAlgorithm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"algorithm" | "about" | "evidence">("algorithm");

  const [algorithmInputs, setAlgorithmInputs] = useState<AlgorithmInputs>({
    symptomOnset: "",
    painLocation: "",
    motorWeakness: "",
    conservativeTreatment: "",
    diagnosticBlock: "",
    blockResponse: "",
    emgPerformed: "",
  });

  const inputsFilled = useMemo(
    () => Object.values(algorithmInputs).every((v) => v !== ""),
    [algorithmInputs]
  );

  const [algorithmResult, setAlgorithmResult] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [resultColor, setResultColor] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAlgorithmInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!inputsFilled) {
      setAlgorithmResult("");
      setRecommendations([]);
      setResultColor("");
      return;
    }

    const {
      symptomOnset,
      motorWeakness,
      conservativeTreatment,
      diagnosticBlock,
      blockResponse,
      emgPerformed,
    } = algorithmInputs;

    let result = "";
    let recs: string[] = [];
    let color = "";

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
      if (motorWeakness === "yes") {
        result = "Surgical Intervention Recommended: Common Peroneal Nerve (CPN) Decompression";
        color = "bg-green-100 border-green-500 text-green-800";

        recs =
          symptomOnset === "acute"
            ? [
                "ACUTE CPN PALSY PROTOCOL:",
                "• Early surgical decompression recommended (within 3 months preferred)",
                "• Earlier intervention associated with better motor recovery",
                "",
                "Surgical Technique:",
                "• Oblique longitudinal incision from lateral knee to fibular head",
                "• Release peroneal tunnel and all compression sites",
                "• Decompress intermuscular septae",
                "",
                "Expected Outcomes:",
                "• Improvement in motor function is most likely when treated early",
              ]
            : [
                "DELAYED CPN PALSY PROTOCOL:",
                "• Surgical decompression can still be beneficial even years after KA",
                "• EMG may help but is not always diagnostic",
                "",
                "Surgical Technique:",
                "• Oblique longitudinal incision from lateral knee to fibular head",
                "• Release peroneal tunnel and all compression sites",
                "• Decompress intermuscular septae",
                "",
                "Expected Outcomes:",
                "• Functional improvement is possible even in delayed presentations",
              ];
      } else {
        // No motor weakness → pain-predominant pathway
        if (diagnosticBlock === "no") {
          result = "Perform Diagnostic Nerve Block";
          color = "bg-yellow-100 border-yellow-500 text-yellow-800";
          recs = [
            "Consider ultrasound-guided diagnostic block of suspected nerve",
            "A strong temporary response supports peripheral nerve source",
          ];
        } else {
          if (blockResponse === "good") {
            result = "Surgical Intervention Considered (Peripheral Nerve-Targeted)";
            color = "bg-green-100 border-green-500 text-green-800";
            recs = [
              "Good response to block suggests peripheral nerve pain generator",
              "Consider targeted decompression/neurolysis based on exam and distribution",
              "Consider neuroma management strategy when identified",
              emgPerformed === "no" ? "Consider EMG if motor symptoms develop" : "EMG already performed",
            ];
          } else if (blockResponse === "partial") {
            result = "Mixed Pain Generator - Optimize Non-Operative + Consider Targeted Workup";
            color = "bg-yellow-100 border-yellow-500 text-yellow-800";
            recs = [
              "Partial block response suggests mixed peripheral/central contributors",
              "Optimize medications + PT + consider repeat targeted diagnostic workup",
            ];
          } else {
            result = "Low Likelihood of Isolated Peripheral Nerve Pain Generator";
            color = "bg-red-100 border-red-500 text-red-800";
            recs = [
              "No block response reduces likelihood of a single peripheral nerve generator",
              "Consider alternative diagnoses (mechanical, referred, centralized pain)",
              "Consider multidisciplinary pain evaluation",
            ];
          }
        }
      }
    }

    setAlgorithmResult(result);
    setRecommendations(recs);
    setResultColor(color);
  }, [algorithmInputs, inputsFilled]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white p-4 rounded border">
        <h2 className="text-2xl font-bold text-[#0096B7]">Knee Arthroplasty Nerve Management</h2>

        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("algorithm")}>
            Algorithm
          </button>
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("about")}>
            About
          </button>
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("evidence")}>
            Evidence
          </button>
        </div>

        {activeTab === "algorithm" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Symptom onset*</label>
              <select name="symptomOnset" value={algorithmInputs.symptomOnset} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="acute">Acute</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Motor weakness*</label>
              <select name="motorWeakness" value={algorithmInputs.motorWeakness} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adequate conservative treatment?*</label>
              <select name="conservativeTreatment" value={algorithmInputs.conservativeTreatment} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Diagnostic block performed?*</label>
              <select name="diagnosticBlock" value={algorithmInputs.diagnosticBlock} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Block response*</label>
              <select name="blockResponse" value={algorithmInputs.blockResponse} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="good">Good</option>
                <option value="partial">Partial</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">EMG performed?*</label>
              <select name="emgPerformed" value={algorithmInputs.emgPerformed} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {inputsFilled && (
              <div className="md:col-span-2 mt-2">
                <div className={`p-3 rounded border-l-4 ${resultColor}`}>
                  <div className="font-bold">Result</div>
                  <div>{algorithmResult}</div>
                </div>
                {recommendations.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KneeArthroplastyAlgorithm;
