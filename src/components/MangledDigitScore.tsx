import React, { useEffect, useMemo, useState } from "react";

type YesNo = "yes" | "no" | "";

type Criteria = {
  // Add every field you use in the UI (keep names identical to your select "name=")
  amputationLevel: YesNo;
  dorsalOblique: YesNo;
  boneLoss: YesNo;
  tendonInjury: YesNo;
  nailBed: YesNo;
  skinDefect: YesNo;
  ageOver50: YesNo;
  middlePhalanx: YesNo;
};

const MangledDigitScore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"calculator" | "about" | "evidence">("calculator");

  const [criteria, setCriteria] = useState<Criteria>({
    amputationLevel: "",
    dorsalOblique: "",
    boneLoss: "",
    tendonInjury: "",
    nailBed: "",
    skinDefect: "",
    ageOver50: "",
    middlePhalanx: "",
  });

  const criteriaFilled = useMemo(() => Object.values(criteria).every((v) => v !== ""), [criteria]);

  const [totalScore, setTotalScore] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<string>("");
  const [recommendationColor, setRecommendationColor] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value as YesNo }));
  };

  useEffect(() => {
    if (!criteriaFilled) {
      setTotalScore(0);
      setRecommendation("");
      setRecommendationColor("");
      return;
    }

    // Example scoring — replace with your exact MDSS scoring logic.
    // The important part for Netlify is: this compiles cleanly under strict TS.
    const score =
      (criteria.amputationLevel === "yes" ? 10 : 0) +
      (criteria.dorsalOblique === "yes" ? 8 : 0) +
      (criteria.boneLoss === "yes" ? 6 : 0) +
      (criteria.tendonInjury === "yes" ? 6 : 0) +
      (criteria.nailBed === "yes" ? 4 : 0) +
      (criteria.skinDefect === "yes" ? 4 : 0) +
      (criteria.ageOver50 === "yes" ? 4 : 0) +
      (criteria.middlePhalanx === "yes" ? 3 : 0);

    setTotalScore(score);

    if (score >= 35) {
      setRecommendation("High likelihood of amputation: Consider primary amputation");
      setRecommendationColor("bg-red-100 border-red-500 text-red-800");
    } else if (score >= 25) {
      setRecommendation("Borderline: Shared decision-making, consider salvage vs amputation");
      setRecommendationColor("bg-yellow-100 border-yellow-500 text-yellow-800");
    } else {
      setRecommendation("High likelihood of salvage: Consider salvage");
      setRecommendationColor("bg-green-100 border-green-500 text-green-800");
    }
  }, [criteria, criteriaFilled]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white p-4 rounded border">
        <h2 className="text-2xl font-bold text-[#0096B7]">Mangled Digit Severity Score (MDSS)</h2>

        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("calculator")}>
            Calculator
          </button>
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("about")}>
            About
          </button>
          <button className="px-3 py-1 border rounded" onClick={() => setActiveTab("evidence")}>
            Evidence
          </button>
        </div>

        {activeTab === "calculator" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {(
              [
                ["amputationLevel", "Amputation level (10 points)*"],
                ["dorsalOblique", "Dorsal oblique fracture (8 points)*"],
                ["boneLoss", "Bone loss (6 points)*"],
                ["tendonInjury", "Tendon injury (6 points)*"],
                ["nailBed", "Nail bed injury (4 points)*"],
                ["skinDefect", "Skin defect (4 points)*"],
                ["ageOver50", "Age > 50 years (4 points)*"], // keep &gt; if you prefer
                ["middlePhalanx", "Middle phalanx fracture (3 points)*"],
              ] as const
            ).map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <select
                  name={name}
                  value={criteria[name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            ))}

            {criteriaFilled && (
              <div className="md:col-span-2 mt-2">
                <div className="p-3 rounded border bg-[#0096B7] text-white">
                  <div className="font-bold">Total MDSS Score</div>
                  <div className="text-3xl font-bold">{totalScore}</div>
                </div>

                <div className={`mt-3 p-3 rounded border-l-4 ${recommendationColor}`}>
                  <div className="font-bold">Recommendation</div>
                  <div>{recommendation}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MangledDigitScore;
