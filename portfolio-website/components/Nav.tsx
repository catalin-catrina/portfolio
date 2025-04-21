"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import hamburgerIcon from "@/assets/hamburger.svg";
import closeIcon from "@/assets/close.svg";

const NAV_ITEMS = [
  { id: 0, title: "About", path: "#about" },
  { id: 1, title: "Skills", path: "#skills" },
  { id: 2, title: "Experience", path: "#experience" },
  { id: 3, title: "Portfolio", path: "#portfolio" },
  { id: 4, title: "Education", path: "#education" },
  { id: 5, title: "Contact", path: "#contact" },
];

export const Nav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-10 z-50">
      <div className="max-w-[1200px] lg:mx-auto px-4 md:px-8 text-gray-300">
        <motion.nav
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="nav-bg px-4 lg:px-0 py-10 border border-gray-700 rounded-3xl my-10 text-xl"
        >
          <div className="flex justify-end md:justify-between items-center px-5">
            <div className="hidden md:block border-custom">
              <h3 className="text-base text-gray-300 pr-8">
                Built with Next.js, Tailwind and Framer Motion
              </h3>
            </div>
            <ul className="hidden lg:flex gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="text-lg tracking-wider">
                  <Link
                    href={item.path}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Image
              src={mobileNavOpen ? closeIcon : hamburgerIcon}
              onClick={() =>
                setMobileNavOpen((prevIsMobileNavOpen) => !prevIsMobileNavOpen)
              }
              width={40}
              height={40}
              className="lg:hidden relative z-20
             inline-block"
              alt="Hamburger navigation icon"
            />

            <AnimatePresence>
              {mobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="fixed top-0 left-0 w-full h-full flex justify-center items-center text-center bg-black z-10"
                >
                  <ul className="flex flex-col gap-10">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id} className="text-5xl">
                        <Link
                          href={item.path}
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>
    </header>
  );
};
