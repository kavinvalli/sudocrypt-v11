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

export interface INotification {
  id: number;
  content: string;
  created_at: string;
}

interface INotificationProps {
  notifications: INotification[];
}

const Notifications: React.FC<INotificationProps> = ({
  notifications,
}: INotificationProps) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    content: "",
  });

  const sbf = useForm({});
  const handleChange = (e: any): void => setData(e.target.name, e.target.value);

  return (
    <>
      <Navbar authenticated={true} admin={true} />
      <div style={{ maxWidth: "1000px", paddingBottom: "100px" }}>
        <h3 className="text-xl">Create Form</h3>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            post("/admin/notifications", {
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
            <label htmlFor="content">Content</label>
            <input
              className="text-black"
              type="text"
              name="content"
              disabled={processing}
              placeholder="Notification Content"
              value={data.content}
              onChange={handleChange}
            />
            {errors.content && <div className="error">{errors.content}</div>}
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
              <th>Content</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(({ id, content, created_at }) => (
              <tr key={id}>
                <td>{content}</td>
                <td>{created_at}</td>
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
                      sbf.delete(`/admin/notifications/${id}`);
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
                    href={`/admin/notifications/${id}/edit`}
                  >
                    create
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Notifications;
