import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";

interface INavbarProps {
  authenticated?: boolean;
  name?: string;
  admin?: boolean;
}

const Navbar: React.FC<INavbarProps> = ({
  // authenticated,
  // name,
  // admin,
}: INavbarProps) => {
  const {
    authenticated,
    auth: { user: { admin } },
  } = usePage<IPageProps>().props;

  // const [avatar, setAvatar] = useState("");
  // useEffect(() => {
  //   if (!authenticated) return;
  //   fetch(
  //     `https://ui-avatars.com/api/?name=${name}&background=FD1F4A&color=fff`
  //   )
  //     .then((res) => res.blob())
  //     .then((imageBlob) => {
  //       const imageObjectURL = URL.createObjectURL(imageBlob);
  //       setAvatar(imageObjectURL);
  //     });
  // }, []);
  
  return (
    <nav className="absolute bottom-5 right-10 p-6 transform -rotate-90 translate-x-full origin-left font-bold text-sudo text-2xl uppercase">
      {authenticated && (
        <div className="flex items-center justify-center">
          <Link href="/" className="mx-5">
            Home
          </Link>
          {admin && (
            <Link href="/admin" className="mx-5">
              Admin
            </Link>
          )}
          <Link href="/leaderboard" className="mx-5">
            Leaderboard
          </Link>
          <Link href="/about" className="mx-5">
            About
          </Link>
          <Link href="/auth/logout" className="mx-5">
            Logout
          </Link>
          {/* name && (
            <Link href="/me" className="mx-3">
              <img
                src={avatar}
                className="rounded-full"
                width="50"
                height="50"
              />
            </Link>
          ) */}
        </div>
      )}
    </nav>
  );
};

Navbar.defaultProps = {
  admin: false,
};

export default Navbar;
