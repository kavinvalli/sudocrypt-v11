import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { IShortlink } from "../../lib/types";
import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import { Inertia } from "@inertiajs/inertia";

interface IAdminLinksProps {
  links: IShortlink[];
}

const Links: React.FC<IAdminLinksProps> = ({ links }: IAdminLinksProps) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    shortlink: "",
    url: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as never, e.target.value as never);

  return (
    <Layout authenticated admin>
      <div className="home-container pb-32">
        <div className="mx-auto max-w-[1000px] w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              post("/admin/shortlinks", {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                  reset();
                },
              });
            }}
            className="my-10 flex flex-col items-center mx-auto gap-y-5 max-w-sm w-full"
          >
            <div className="w-full text-gray-600 focus-within:text-gray-300">
              <div className="text-center text-2xl font-bold text-gray-300">
                New Shortlink
              </div>
            </div>

            <TextInput
              name="shortlink"
              label="Shortlink"
              placeholder="discord"
              className="bg-dark-lighter"
              type="text"
              disabled={processing}
              error={errors.shortlink}
              value={data.shortlink}
              onChange={handleChange}
            />

            <TextInput
              name="url"
              label="Target"
              placeholder="https://discord.com"
              className="bg-dark-lighter"
              type="text"
              disabled={processing}
              error={errors.url}
              value={data.url}
              onChange={handleChange}
            />

            <div className="">
              <button type="submit" disabled={processing} className="button">
                Create
              </button>
            </div>
          </form>

          <table className="max-w-[1000px] w-full mx-auto divide-sudo divide-y bg-dark-lighter shadow-md">
            <thead>
              <tr className="bg-sudo text-white font-extrabold uppercase">
                <th className="p-3">Shortlink</th>
                <th className="p-3">URL</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sudo">
              {links.map(({ id, shortlink, url }) => (
                <tr key={id}>
                  <td className="p-3 text-center">{shortlink}</td>
                  <td className="p-3 text-center">{url}</td>
                  <td className="p-3 flex flex-col gap-y-2 items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        Inertia.delete(`/admin/shortlinks/${id}`, {
                          preserveScroll: true,
                        });
                      }}
                      className="!bg-red-600 !p-2 !text-xs button"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Links;
