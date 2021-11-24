import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import TextInput from "../TextInput";

interface ICircleProps {
  circle?: { id: number; name: string; levels: number[] };
}

const Circle: React.FC<ICircleProps> = ({ circle }: ICircleProps) => {
  const { data, setData, errors, put, processing } = useForm({
    name: circle?.name,
  });

  return (
    <div>
      <form
        className="w-full block"
        onSubmit={(e) => {
          e.preventDefault();
          put(`/admin/circles/${circle?.id}`, {
            preserveState: true,
            preserveScroll: true,
          });
        }}
      >
        <TextInput
          name="name"
          label="Circle Name"
          placeholder="Circle Name"
          className="bg-dark focus:outline-none"
          containerClassName="my-5"
          type="text"
          disabled={processing}
          error={errors.name}
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
        />
        <div className="flex justify-end w-full">
          <button type="submit" className="button">
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default Circle;
