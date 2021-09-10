import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

interface IFormProps {
  url: string;
  post: any;
  processing: boolean;
  buttonLabel: string;
}

// const SingleButtonForm: React.FC<IFormProps> = ({
//   url,
//   post,
//   processing,
//   buttonLabel,
// }: IFormProps) => {
//   return (
//     <form
//       onSubmit={(e: any) => {
//         e.preventDefault();
//         post(url);
//       }}
//     >
//       <button
//         type="submit"
//         disabled={processing}
//         style={{
//           fontWeight: "bold",
//           fontSize: "0.9rem",
//           padding: "10px 15px",
//           textTransform: "uppercase",
//         }}
//       >
//         {buttonLabel}
//       </button>
//     </form>
//   );
// };

export interface ILevel {
  id: number;
  question: string;
  answer: string;
  circle_id: number;
  source_hint: string;
  points: number;
}

interface ICircle {
  id: number;
  name: string;
}

interface IAdminLevelProps {
  level: ILevel;
  circles: ICircle[];
}

const Level: React.FC<IAdminLevelProps> = ({
  level,
  circles,
}: IAdminLevelProps) => {
  const { data, put, setData, processing, reset, errors } = useForm({
    question: level.question,
    answer: level.answer,
    source_hint: level.source_hint,
    points: level.points,
    circle_id: level.circle_id,
  });

  const handleChange = (e: any): void => setData(e.target.name, e.target.value);

  return (
    <>
      <Navbar authenticated admin />
      <div>
        <h3 className="text-xl">Create Form</h3>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            // post(`/admin/levels/${level.id}`, {
            //   _method: "put",
            //   preserveState: true,
            //   onSuccess: () => {
            //     reset();
            //   },
            // });
            put(`/admin/levels/${level.id}`, {
              preserveState: true,
              onSuccess: () => reset(),
            });
          }}
          style={{
            maxWidth: "640px",
            width: "100%",
            margin: "50px auto",
            marginTop: "0",
          }}
        >
          <div className="input-group">
            <label htmlFor="question">Question</label>
            <input
              className="text-black"
              type="text"
              name="question"
              disabled={processing}
              placeholder="Long Question text here..."
              value={data.question}
              onChange={handleChange}
            />
            {errors.question && <div className="error">{errors.question}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="answer">Answer</label>
            <input
              className="text-black"
              type="text"
              name="answer"
              disabled={processing}
              placeholder="answerhere"
              value={data.answer}
              onChange={handleChange}
            />
            {errors.answer && <div className="error">{errors.answer}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="points">Points</label>
            <input
              className="text-black"
              type="number"
              name="points"
              disabled={processing}
              placeholder="250"
              value={data.points}
              onChange={handleChange}
            />
            {errors.points && <div className="error">{errors.points}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="source_hint">Source Hint</label>
            <input
              className="text-black"
              type="text"
              name="source_hint"
              disabled={processing}
              placeholder="This is a hint"
              value={data.source_hint}
              onChange={handleChange}
            />
            {errors.source_hint && (
              <div className="error">{errors.source_hint}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="url">Circle</label>
            <select
              className="text-black"
              name="circle_id"
              id="circle_id"
              disabled={processing}
              value={data.circle_id}
              onChange={handleChange}
            >
              <option value="">Circle</option>
              {circles.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors.circle_id && (
              <div className="error">{errors.circle_id}</div>
            )}
          </div>

          <div className="input-group">
            <button
              type="submit"
              disabled={processing}
              style={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                padding: "10px 15px",
                textTransform: "uppercase",
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Level;
