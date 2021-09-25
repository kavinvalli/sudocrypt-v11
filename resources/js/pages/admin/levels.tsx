import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr td {
    text-align: center;
  }
  th,
  td {
    padding: 15px 10px;
  }
  tbody tr:nth-child(even) {
    background: #ffffff10;
  }
  thead tr {
    background: white;
    color: #333;
  }
`;

interface IFormProps {
  url: string;
  post: any;
  processing: boolean;
  buttonLabel: string;
}

export interface ILevel {
  id: number;
  question: string;
  answer: string;
  circle: {
    id: number;
    name: string;
  };
  source_hint: string;
  points: number;
  people_number: number;
}

interface ICircle {
  id: number;
  name: string;
}

interface IAdminLevelsProps {
  levels: ILevel[];
  circles: ICircle[];
}

const Levels: React.FC<IAdminLevelsProps> = ({
  levels,
  circles,
}: IAdminLevelsProps) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    question: "",
    answer: "",
    source_hint: "",
    points: 0,
    circle_id: 0,
  });

  const sbf = useForm({});
  const handleChange = (e: any): void => setData(e.target.name, e.target.value);

  return (
    <>
      <Navbar authenticated={true} admin={true} />
      <div style={{ maxWidth: "1000px", paddingBottom: "100px" }}>
        <h3 className="text-xl">Edit Form</h3>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            post("/admin/levels", {
              preserveState: true,
              onSuccess: () => {
                reset();
              },
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
        <Table>
          <thead>
            <tr>
              <th>Level No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Circle</th>
              <th>Points</th>
              <th>Source Hint</th>
              <th>Number of people on this</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {levels.map(
              ({
                id,
                question,
                answer,
                circle,
                source_hint,
                points,
                people_number,
              }) => (
                <tr key={id}>
                  <td>{id - 1}</td>
                  <td>{question}</td>
                  <td>{answer}</td>
                  <td>{circle.name}</td>
                  <td>{points}</td>
                  <td>{source_hint}</td>
                  <td>{people_number}</td>
                  <td>
                    <button
                      disabled={sbf.processing}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        padding: "8px 13px",
                        textTransform: "uppercase",
                      }}
                      onClick={(e: any) => {
                        e.preventDefault();
                        sbf.delete(`/admin/levels/${id}`);
                      }}
                    >
                      delete
                    </button>
                    <Link
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        padding: "8px 13px",
                        textTransform: "uppercase",
                      }}
                      href={`/admin/levels/${id}/edit`}
                    >
                      edit
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Levels;
