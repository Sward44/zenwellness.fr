"use client";
import { useState, useEffect, useCallback, useContext } from "react";
import { useTheme } from "next-themes";
import {
  Zenwellness,
  Sun,
  Moon,
  UserIcon,
  Shopping,
  Login,
} from "@/components/logos/Logos";
// import { ThemeModeContext } from "@/components/theme/AppThemeProvider";
// import { useAuthModal } from "@/contexts/AuthModalContext";
import { signOut } from "next-auth/react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header({ session }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const [themes, setThemes] = useState("");
  // const { openModal } = useAuthModal();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const toggleTheme = useCallback(() => {
  //   const newMode = mode === "light" ? "dark" : "light";
  //   setMode(newMode);
  // }, [mode, setMode]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={`bg-marigold-yellow-100 dark:bg-wild-sand-900 dark:shadow-wild-sand-600 fixed flex w-full justify-between px-20 py-2 transition-transform ${!visible ? "-translate-y-full shadow-none dark:shadow-none" : "shadow-xl dark:shadow-xl"}`}
    >
      <div className="dark:drop-shadow-dark dark:hover:drop-shadow-dark-hover w-36 transition-all">
        <Zenwellness />
      </div>
      <div className="flex w-10 items-center justify-center">
        <ul className="flex">
          <li
            aria-describedby="theme-tooltip"
            role="tooltip"
            className="hover:bg-marigold-yellow-200 dark:hover:bg-wild-sand-700 group relative cursor-pointer rounded-full p-2 transition-colors"
            onClick={() =>
              setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
          >
            {resolvedTheme === "light" ? (
              <Sun className="fill-wild-sand-900" />
            ) : (
              <Moon className="fill-wild-sand-50" />
            )}
            <div
              id="theme-tooltip"
              role="tooltip"
              className="bottom bg-marigold-yellow-50 text-wild-sand-900 dark:bg-wild-sand-700 dark:text-wild-sand-50 absolute left-1/2 -translate-x-1/2 translate-y-3/4 transform rounded-md border border-none px-3 py-1 text-sm opacity-0 shadow-lg transition-all delay-200 group-hover:translate-y-1/2 group-hover:opacity-100"
            >
              {resolvedTheme === "light" ? "Clair" : "Sombre"}
            </div>
          </li>
          <li
            aria-describedby="user-tooltip"
            role="tooltip"
            className="hover:bg-marigold-yellow-200 dark:hover:bg-wild-sand-700 group relative cursor-pointer rounded-full p-2 transition-colors"
          >
            <Login className="fill-wild-sand-900 dark:fill-wild-sand-50" />
            <div
              id="user-tooltip"
              className="bottom bg-marigold-yellow-50 text-wild-sand-900 dark:bg-wild-sand-700 dark:text-wild-sand-50 absolute left-1/2 -translate-x-1/2 translate-y-3/4 transform rounded-md border border-none px-3 py-1 text-sm opacity-0 shadow-lg transition-all delay-200 group-hover:translate-y-1/2 group-hover:opacity-100"
            >
              Connexion
            </div>
          </li>
          <li
            aria-describedby="shop-tooltip"
            role="tooltip"
            className="hover:bg-marigold-yellow-200 dark:hover:bg-wild-sand-700 group relative cursor-pointer rounded-full p-2 transition-colors"
          >
            <Shopping className="fill-wild-sand-900 dark:fill-wild-sand-50" />
            <div
              id="shop-tooltip"
              className="bottom bg-marigold-yellow-50 text-wild-sand-900 dark:bg-wild-sand-700 dark:text-wild-sand-50 absolute left-1/2 -translate-x-1/2 translate-y-3/4 transform rounded-md border border-none px-3 py-1 text-sm opacity-0 shadow-lg transition-all delay-200 group-hover:translate-y-1/2 group-hover:opacity-100"
            >
              Shopping
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
