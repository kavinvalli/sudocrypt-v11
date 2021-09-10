import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Navbar from "../../components/Navbar";

interface iAdminProps {
  users: number;
  discord_accounts: number;
  attempts: number;
}

const Admin: React.FC<iAdminProps> = ({
  users,
  discord_accounts,
  attempts,
}: iAdminProps) => {
  return (
    <div>
      <Navbar authenticated={true} admin={true} />
      <p>Users: {users}</p>
      <p>Discord Accounts: {discord_accounts}</p>
      <p>Attempts: {attempts}</p>
      <br />
      <Link href="/admin/shortlinks">Links</Link>
      <br />
      <Link href="/admin/users">Users</Link>
      <br />
      <Link href="/admin/circles">Circles</Link>
      <br />
      <Link href="/admin/levels">Levels</Link>
      <br />
      <Link href="/admin/notifications">Notifications</Link>
    </div>
  );
};

export default Admin;
