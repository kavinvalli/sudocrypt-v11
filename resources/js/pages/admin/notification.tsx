import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Navbar from "../../components/Navbar";

export interface INotification {
  id: number;
  content: string;
}

interface IAdminLevelProps {
  notification: INotification;
}

const Notification: React.FC<IAdminLevelProps> = ({
  notification,
}: IAdminLevelProps) => {
  const { data, put, setData, processing, reset, errors } = useForm({
    content: notification.content,
  });

  const handleChange = (e: any): void => setData(e.target.name, e.target.value);

  return (
    <>
      <Navbar authenticated admin />
      <div>
        <h3 className="text-xl">Edit Form</h3>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            put(`/admin/notifications/${notification.id}`, {
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
            <label htmlFor="content">Content</label>
            <input
              className="text-black"
              type="text"
              name="content"
              disabled={processing}
              placeholder="Content"
              value={data.content}
              onChange={handleChange}
            />
            {errors.content && <div className="error">{errors.content}</div>}
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
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Notification;
