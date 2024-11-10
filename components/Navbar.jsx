"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status whenever token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    };

    // Check initial auth state
    checkAuth();

    // Set up an interval to check auth state periodically
    const intervalId = setInterval(checkAuth, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", { method: "GET" });
      if (res.ok) {
        Cookies.remove("token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </Link>
          </div>

          <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link href="/all-recipes" className="block md:px-4 transition hover:text-yellow-700">
                    <span>All recipes</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="block md:px-4 transition hover:text-yellow-700">
                    <span>Cart</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                >
                  <span className="block text-yellow-900 font-semibold text-sm">Logout</span>
                </button>
              ) : (
                <>
                  <Link href="/register">
                    <button
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center transition sm:w-max"
                    >
                      <span className="block text-yellow-800 font-semibold text-sm">Sign up</span>
                    </button>
                  </Link>
                  <Link href="/login">
                    <button
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">Login</span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;