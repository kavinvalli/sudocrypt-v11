import { Link } from "@inertiajs/inertia-react";
import React, { useState, useEffect } from "react";

interface IIndexProps {
  authenticated: boolean;
  name?: string;
  admin?: boolean;
}

const Navbar: React.FC<IIndexProps> = ({
  authenticated,
  name,
  admin,
}: IIndexProps) => {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (!authenticated) return;
    fetch(
      `https://ui-avatars.com/api/?name=${name}&background=FD1F4A&color=fff`
    )
      .then((res) => res.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setAvatar(imageObjectURL);
      });
  }, []);
  return (
    <nav className="flex justify-between items-center p-6">
      <Link href="/">
        <img src="/img/logo-blue.png" width="50" height="50" alt="" />
      </Link>
      {authenticated ? (
        <div className="flex items-center justify-center">
          {admin && (
            <Link href="/admin" className="mx-3">
              Admin
            </Link>
          )}
          <Link href="/leaderboard" className="mx-3">
            Leaderboard
          </Link>
          {name && (
            <Link href="/me" className="mx-3">
              <img
                src={avatar}
                className="rounded-full"
                width="50"
                height="50"
              />
            </Link>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
