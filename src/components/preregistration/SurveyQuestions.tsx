"use client";

import React, { useState } from "react";
import type { QuestionDef } from "@/lib/programQuestions";

const isTextType = (type: string) =>
  type === "TEXT" || type === "SHORT_TEXT" || type === "LONG_TEXT";

const isMultiType = (type: string) =>
  type === "MULTIPLE_OPTION" || type === "MULTI_OPTION";

/**
 * Renders a program's survey questions (from shared definitions) as form
 * fields. Single-select answers are tracked in state so conditional
 * (`dependsOn`) questions can reveal/hide.
 */
const SurveyQuestions: React.FC<{ questions: QuestionDef[] }> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow";

  return (
    <>
      {questions.map((q) => {
        if (q.dependsOn && answers[q.dependsOn.id] !== q.dependsOn.value) {
          return null;
        }

        const multi = isMultiType(q.type);

        return (
          <div key={q.id} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {q.pill && (
              <span className="inline-block bg-[#F3E8FF] text-[#6024D0] rounded-full px-3 py-1 text-xs font-medium mb-5">
                {q.pill}
              </span>
            )}
            <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
              {q.content}
            </p>

            {isTextType(q.type) ? (
              <textarea
                name={q.id}
                rows={4}
                required={q.required}
                placeholder={q.placeholder}
                className={`${inputClass} resize-none`}
              />
            ) : (
              <div className="space-y-3">
                {q.options?.map((opt, i) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={q.id}
                      value={opt}
                      // `required` on a radio group requires a selection; skip
                      // for checkboxes so it doesn't force every box checked.
                      required={q.required && !multi && i === 0}
                      onChange={() => {
                        if (!multi) {
                          setAnswers((prev) => ({ ...prev, [q.id]: opt }));
                        }
                      }}
                      className={`w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer ${
                        multi ? "rounded" : ""
                      }`}
                    />
                    <span className="text-xs md:text-sm text-gray-700 group-hover:text-black">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SurveyQuestions;
