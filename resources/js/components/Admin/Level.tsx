import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { ILevel } from "../../lib/types";
import TextInput from "../TextInput";

interface ILevelProps {
  level?: ILevel & {
    attempts_count: number;
    users_count: number;
    solves_count: number;
  };
}

const Level: React.FC<ILevelProps> = ({ level }: ILevelProps) => {
  const { data, setData, errors, put, processing } = useForm({
    question: level?.question,
    answer: level?.answer,
    points: String(level?.points),
    source_hint: level?.source_hint,
  });

  return (
    <div>
      <form
        className="w-full block"
        onSubmit={(e) => {
          e.preventDefault();
          put(`/admin/levels/${level?.id}`, {
            preserveState: true,
            preserveScroll: true,
          });
        }}
      >
        <div className="my-3 w-full text-gray-600 focus-within:text-gray-300">
          <label
            htmlFor="question"
            className="uppercase text-sm font-bold mb-1 block transition"
          >
            Question
          </label>
          <textarea
            className="bg-dark text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4"
            placeholder="What is the nature of life?"
            name="question"
            value={data.question}
            onChange={(e) => setData("question", e.target.value)}
          />
          {errors.question && (
            <div className="text-sm text-red-500 pt-2">{errors.question}</div>
          )}
        </div>
        <TextInput
          name="answer"
          label="Answer"
          placeholder="verylonganswer"
          className="bg-dark focus:outline-none"
          containerClassName="my-5"
          type="text"
          disabled={processing}
          error={errors.answer}
          value={data.answer}
          onChange={(e) => setData("answer", e.target.value)}
        />
        <TextInput
          name="points"
          label="Points"
          placeholder="1000"
          className="bg-dark focus:outline-none"
          containerClassName="my-5"
          type="number"
          disabled={processing}
          error={errors.points}
          value={data.points}
          onChange={(e) => setData("points", String(e.target.value))}
        />
        <div className="my-3 w-full text-gray-600 focus-within:text-gray-300">
          <label
            htmlFor="source_hint"
            className="uppercase text-sm font-bold mb-1 block transition"
          >
            source_hint
          </label>
          <textarea
            className="bg-dark text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4"
            placeholder="What is the nature of life?"
            name="source_hint"
            value={data.source_hint}
            onChange={(e) => setData("source_hint", e.target.value)}
          />
          {errors.source_hint && (
            <div className="text-sm text-red-500 pt-2">
              {errors.source_hint}
            </div>
          )}
        </div>
        <div className="flex justify-end w-full">
          <button type="submit" className="button">
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default Level;
