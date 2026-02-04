import React, { ChangeEvent, useMemo, useState } from "react";

/**
 * STRICT TYPES (noImplicitAny-safe)
 */
type YesNo = "" | "yes" | "no";

type NeuromaType = "" | "terminal" | "continuity" | "weightBearing" | "multiple";

type ScreeningCriteria = {
  clinicalSuspicion: YesNo;
  tinel: YesNo;
  pain: YesNo;
  sensoryDeficit: YesNo;
};

type NonOpCriteria = {
  gabapentinoids: YesNo;
  nsaids: YesNo;
  topicalMedications: YesNo;
  desensitization: YesNo;
  physicalTherapy: YesNo;
};

type OpCriteria = {
  failedConservative: YesNo;
  functionalImpairment: YesNo;
  locationIdentified: YesNo;
  neuromaType: NeuromaType;
};

type SelectOption<T extends string> = { value: T; label: string };

const YESNO_OPTIONS: SelectOption<YesNo>[] = [
  { value: "", label: "Select…" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const NEUROMA_TYPE_OPTIONS: SelectOption<NeuromaType>[] = [
  { value: "", label: "Select…" },
  { value: "terminal", label: "Terminal neuroma (non–weight bearing)" },
  { value: "continuity", label: "Neuroma-in-continuity" },
  { value: "weightBearing", label: "Weight-bearing location" },
  { value: "multiple", label: "Multiple/complex neuromas" },
];

function allYesNoAnswered(obj: Record<string, string>): boolean {
  return Object.values(obj).every((v) => v === "yes" || v === "no");
}

function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function SelectField<T extends string>(props: {
  label: string;
  name: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  helper?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-900" htmlFor={props.name}>
        {props.label}
      </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {props.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {props.helper ? <div className="text-xs text-gray-600">{props.helper}</div> : null}
    </div>
  );
}

export default function HandNeuromaAlgorithm(): JSX.Element {
  const [screeningCriteria, setScreeningCriteria] = useState<ScreeningCriteria>({
    clinicalSuspicion: "",
    tinel: "",
    pain: "",
    sensoryDeficit: "",
  });

  const [nonOpCriteria, setNonOpCriteria] = useState<NonOpCriteria>({
    gabapentinoids: "",
    nsaids: "",
    topicalMedications: "",
    desensitization: "",
    physicalTherapy: "",
  });

  const [opCriteria, setOpCriteria] = useState<OpCriteria>({
    failedConservative: "",
    functionalImpairment: "",
    locationIdentified: "",
    neuromaType: "",
  });

  /**
   * Typed handlers (NO implicit any)
   */
  const handleScreeningChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScreeningCriteria((prev) => ({
      ...prev,
      [name as keyof ScreeningCriteria]: value as YesNo,
    }));
  };

  const handleNonOpChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNonOpCriteria((prev) => ({
      ...prev,
      [name as keyof NonOpCriteria]: value as YesNo,
    }));
  };

  const handleOpChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "neuromaType") {
      setOpCriteria((prev) => ({
        ...prev,
        neuromaType: value as NeuromaType,
      }));
      return;
    }

    setOpCriteria((prev) => ({
      ...prev,
      [name as Exclude<keyof OpCriteria, "neuromaType">]: value as YesNo,
    }));
  };

  /**
   * Derived flags + recommendations (NO untyped [] anywhere)
   */
  const screeningComplete = useMemo(() => allYesNoAnswered(screeningCriteria), [screeningCriteria]);
  const nonOpComplete = useMemo(() => allYesNoAnswered(nonOpCriteria), [nonOpCriteria]);

  const screeningPass = useMemo(() => {
    if (!screeningComplete) return null;
    // require all four screening criteria YES to proceed (edit logic if your intent differs)
    const ok =
      screeningCriteria.clinicalSuspicion === "yes" &&
      screeningCriteria.tinel === "yes" &&
      screeningCriteria.pain === "yes" &&
      screeningCriteria.sensoryDeficit === "yes";
    return ok;
  }, [screeningComplete, screeningCriteria]);

  const nonOpPass = useMemo(() => {
    if (!nonOpComplete) return null;
    // "Failed conservative care" if at least ONE attempted and inadequate relief.
    // Here we treat "yes" as tried/attempted. Adjust if your semantics differ.
    const triedAny =
      nonOpCriteria.gabapentinoids === "yes" ||
      nonOpCriteria.nsaids === "yes" ||
      nonOpCriteria.topicalMedications === "yes" ||
      nonOpCriteria.desensitization === "yes" ||
      nonOpCriteria.physicalTherapy === "yes";

    return triedAny;
  }, [nonOpComplete, nonOpCriteria]);

  const opEligibilityComplete = useMemo(() => {
    const baseAnswered =
      opCriteria.failedConservative !== "" &&
      opCriteria.functionalImpairment !== "" &&
      opCriteria.locationIdentified !== "" &&
      opCriteria.neuromaType !== "";
    return baseAnswered;
  }, [opCriteria]);

  const opEligible = useMemo(() => {
    if (!opEligibilityComplete) return null;
    return (
      opCriteria.failedConservative === "yes" &&
      opCriteria.functionalImpairment === "yes" &&
      opCriteria.locationIdentified === "yes" &&
      opCriteria.neuromaType !== ""
    );
  }, [opEligibilityComplete, opCriteria]);

  const opRecommendations: string[] = useMemo(() => {
    // If not eligible (or incomplete), provide either nothing or a clear message
    if (opEligible !== true) {
      const msgs: string[] = [];
      if (opEligible === false) {
        msgs.push("Surgery is not currently indicated based on the selected criteria.");
        msgs.push("Optimize conservative care and confirm pain generator (e.g., diagnostic block).");
      }
      return msgs;
    }

    const type = opCriteria.neuromaType;

    const recsByType: Record<Exclude<NeuromaType, "">, string[]> = {
      terminal: [
        "Terminal neuroma in non–weight bearing location.",
        "Primary surgical options:",
        "• Targeted Muscle Reinnervation (TMR) if expendable motor targets available",
        "• Regenerative Peripheral Nerve Interface (RPNI)",
        "• Nerve capping / relocation into muscle (selected cases)",
        "Adjuncts: address scar tethering; ensure tension-free coaptation; consider vein wrap if indicated.",
      ],
      continuity: [
        "Neuroma-in-continuity.",
        "Primary surgical options:",
        "• Neurolysis with internal neurolysis if fascicular continuity present (selected cases)",
        "• Resection and reconstruction with nerve graft/conduit when appropriate",
        "• Consider TMR/RPNI if distal target/continuity is not salvageable",
        "Adjuncts: treat external compression; evaluate for proximal entrapment.",
      ],
      weightBearing: [
        "Neuroma in weight-bearing / high-contact location.",
        "Primary surgical options:",
        "• Relocation away from contact surface",
        "• TMR/RPNI to reduce recurrent neuroma formation",
        "• Protective soft tissue coverage / padding strategies",
        "Adjuncts: footwear/orthotics modifications; scar management.",
      ],
      multiple: [
        "Multiple / complex neuromas.",
        "Primary surgical options:",
        "• Prioritize dominant pain generator(s) (consider staged approach)",
        "• Combine TMR/RPNI where feasible",
        "• Consider multidisciplinary evaluation (hand surgery + pain management + therapy)",
        "Adjuncts: optimize neuropathic pain meds; desensitization; graded motor imagery when appropriate.",
      ],
    };

    if (type === "") return [];
    return recsByType[type];
  }, [opCriteria.neuromaType, opEligible]);

  /**
   * Render
   */
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Hand Neuroma Algorithm</h1>
        <p className="text-sm text-gray-700">
          Structured screening, non-operative optimization, and operative decision support.
        </p>
      </header>

      {/* Screening */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">1) Screening</h2>
        <p className="mt-1 text-sm text-gray-700">
          Confirm clinical suspicion and signs consistent with symptomatic neuroma.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            label="Clinical suspicion of neuroma"
            name="clinicalSuspicion"
            value={screeningCriteria.clinicalSuspicion}
            options={YESNO_OPTIONS}
            onChange={handleScreeningChange}
          />
          <SelectField
            label="Tinel’s sign over suspected neuroma"
            name="tinel"
            value={screeningCriteria.tinel}
            options={YESNO_OPTIONS}
            onChange={handleScreeningChange}
          />
          <SelectField
            label="Neuropathic pain phenotype"
            name="pain"
            value={screeningCriteria.pain}
            options={YESNO_OPTIONS}
            onChange={handleScreeningChange}
          />
          <SelectField
            label="Sensory deficit in nerve distribution"
            name="sensoryDeficit"
            value={screeningCriteria.sensoryDeficit}
            options={YESNO_OPTIONS}
            onChange={handleScreeningChange}
          />
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
          {!screeningComplete ? (
            <span className="text-gray-700">Complete all screening fields to see guidance.</span>
          ) : screeningPass ? (
            <span className="font-medium">Screening suggests neuroma is likely. Proceed to non-operative optimization.</span>
          ) : (
            <span className="font-medium">
              Screening does not strongly support neuroma. Reassess differential diagnosis and consider imaging/diagnostic
              block.
            </span>
          )}
        </div>
      </section>

      {/* Non-operative */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">2) Non-operative optimization</h2>
        <p className="mt-1 text-sm text-gray-700">Document conservative measures attempted.</p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            label="Gabapentinoids trialed"
            name="gabapentinoids"
            value={nonOpCriteria.gabapentinoids}
            options={YESNO_OPTIONS}
            onChange={handleNonOpChange}
            helper={<span>Many patients need titration; some achieve &gt;50% relief when effective.</span>}
          />
          <SelectField
            label="NSAIDs trialed"
            name="nsaids"
            value={nonOpCriteria.nsaids}
            options={YESNO_OPTIONS}
            onChange={handleNonOpChange}
          />
          <SelectField
            label="Topical medications trialed"
            name="topicalMedications"
            value={nonOpCriteria.topicalMedications}
            options={YESNO_OPTIONS}
            onChange={handleNonOpChange}
          />
          <SelectField
            label="Desensitization therapy"
            name="desensitization"
            value={nonOpCriteria.desensitization}
            options={YESNO_OPTIONS}
            onChange={handleNonOpChange}
          />
          <SelectField
            label="Physical/hand therapy"
            name="physicalTherapy"
            value={nonOpCriteria.physicalTherapy}
            options={YESNO_OPTIONS}
            onChange={handleNonOpChange}
          />
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
          {!nonOpComplete ? (
            <span className="text-gray-700">Complete all non-operative fields to see guidance.</span>
          ) : nonOpPass ? (
            <span className="font-medium">Conservative care documented. If persistent disabling pain, consider operative criteria.</span>
          ) : (
            <span className="font-medium">Conservative care appears not yet attempted. Optimize non-operative management first.</span>
          )}
        </div>
      </section>

      {/* Operative criteria */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">3) Operative decision support</h2>
        <p className="mt-1 text-sm text-gray-700">
          Consider surgery when conservative care has failed and neuroma is confirmed as the pain generator.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            label="Failed conservative care"
            name="failedConservative"
            value={opCriteria.failedConservative}
            options={YESNO_OPTIONS}
            onChange={handleOpChange}
          />
          <SelectField
            label="Functionally limiting pain"
            name="functionalImpairment"
            value={opCriteria.functionalImpairment}
            options={YESNO_OPTIONS}
            onChange={handleOpChange}
          />
          <SelectField
            label="Pain generator location identified"
            name="locationIdentified"
            value={opCriteria.locationIdentified}
            options={YESNO_OPTIONS}
            onChange={handleOpChange}
            helper={
              <span>
                Diagnostic block can support localization: &gt;50% pain relief supports neuroma as generator.
              </span>
            }
          />
          <SelectField
            label="Neuroma category / context"
            name="neuromaType"
            value={opCriteria.neuromaType}
            options={NEUROMA_TYPE_OPTIONS}
            onChange={handleOpChange}
          />
        </div>

        <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-900">Recommendation</div>
              <div className="mt-1 text-sm text-gray-700">
                {opEligibilityComplete ? (
                  opEligible ? (
                    <span className="font-medium text-green-700">Operative management is reasonable based on inputs.</span>
                  ) : (
                    <span className="font-medium text-amber-700">
                      Operative management not indicated yet (based on inputs).
                    </span>
                  )
                ) : (
                  <span className="text-gray-600">Complete all operative fields to see recommendations.</span>
                )}
              </div>
            </div>
          </div>

          {opRecommendations.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-800">
              {opRecommendations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <footer className="text-xs text-gray-500">
        Note: This tool provides structured guidance and does not replace clinical judgment.
      </footer>
    </div>
  );
}
