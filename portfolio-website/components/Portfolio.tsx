"use client";

import Image from "next/image";
import Link from "next/link";
import portfolioProject from "@/assets/portfolio-project.png";
import { motion } from "motion/react";

export const Portfolio = () => {
  return (
    <section id="portfolio">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-30">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            className="inline-block mb-20 text-6xl tracking-wide bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.h2>
        </div>
        <div className="grid-container">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            style={{ gridArea: "box-1" }}
            className="grid-item relative border-1 border-gray-800 rounded-2xl"
          >
            {/* <Image
              src={portfolioProject}
              fill
              className="z-[-1] object-cover object-top-left"
              alt="project"
            /> */}
            <div className="absolute z-[-1] inset-0 flex flex-col gap-4 justify-center items-center bg-linear-to-br from purple-950 to-blue-950 text-gray-300 rounded-2xl text-center">
              <h1 className="text-4xl">Placeholder Image</h1>
              <p className="text-2xl">to be replaced upon project completion</p>
              <p className="text-2xl">(hover card)</p>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col gap-4 justify-center items-start opacity-0 translate-y-4 transition hover:opacity-100 hover:translate-y-0 rounded-2xl p-4 bg-black/90 text-left text-gray-300">
              <Link
                href="https://github.com/catalin-catrina/portfolio/tree/master/social-media-angular-app"
                target="_blank"
                className="w-full h-full flex flex-col gap-4 justify-center items-start"
              >
                <h4 className="text-3xl">Social Media App (WIP)</h4>
                <p className="text-xl">(to be named upon completion)</p>
                <p className="text-xl">
                  Tech stack: Angular FE, Firebase BE, and Algolia as search
                  service
                </p>
                <p className="text-xl">
                  Features: user authentication, profile management, real-time
                  feed, notifications, chat system, and search functionality
                </p>
                <p className="text-xl">
                  Why this project stands out: Every UI component in this
                  application is designed and developed entirely by me, without
                  relying on third-party UI libraries such as Angular Material
                  or PrimeNG. While I typically use these libraries in
                  professional settings, my personal projects prioritize deeply
                  understanding how to implement the UI components that others
                  usually import.
                </p>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            style={{ gridArea: "box-2" }}
            className="grid-item relative border-1 border-gray-800 rounded-2xl"
          >
            <Image
              src={portfolioProject}
              fill
              className="z-[-1] object-cover object-center"
              alt="project"
            />
            <div className="absolute inset-0 z-10 flex flex-col gap-4 justify-center items-start opacity-0 translate-y-4 transition hover:opacity-100 hover:translate-y-0 rounded-2xl p-4 bg-black/90 text-left text-gray-300">
              <Link
                href=""
                className="w-full h-full flex flex-col gap-4 justify-center items-start"
              >
                <h4 className="text-3xl">Portfolio website</h4>
                <p className="text-xl">Built with Next.js and Framer Motion.</p>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            style={{ gridArea: "box-3" }}
            className="grid-item relative border-1 border-gray-800 rounded-2xl"
          >
            {/* <Image
              src={portfolioProject}
              fill
              className="z-[-1] object-cover object-center"
              alt="project"
            /> */}
            <div className="absolute z-[-1] inset-0 flex flex-col gap-4 justify-center items-center bg-linear-to-br from purple-950 to-blue-950 rounded-2xl text-gray-300 text-center">
              <h1 className="text-4xl">To Be Announced</h1>
              <p className="text-2xl">(hover card)</p>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col gap-4 justify-center items-start opacity-0 translate-y-4 transition hover:opacity-100 hover:translate-y-0 rounded-2xl p-4 bg-black/90 text-left text-gray-300">
              <Link
                href=""
                className="w-full h-full flex flex-col gap-4 justify-center items-start"
              >
                <h4 className="text-3xl">
                  UI UX Landing Page with 2D animations
                </h4>
                <p className="text-3xl">(ETA: May 1st 2025)</p>
                <p className="text-xl">to be named upon completion</p>
                <p className="text-xl">Tech stack: Next.js and Framer Motion</p>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            style={{ gridArea: "box-4" }}
            className="grid-item relative border-1 border-gray-800 rounded-2xl"
          >
            {/* <Image
              src={portfolioProject}
              fill
              className="z-[-1] object-cover object-[0%_50%]"
              alt="project"
            /> */}
            <div className="absolute z-[-1] inset-0 flex flex-col gap-4 justify-center items-center bg-linear-to-br from purple-950 to-blue-950 text-gray-300 rounded-2xl text-center">
              <h1 className="text-4xl">To Be Announced</h1>
              <p className="text-2xl">(hover card)</p>
            </div>
            <div className="absolute inset-0 z-10 opacity-0 translate-y-4 transition hover:opacity-100 hover:translate-y-0 rounded-2xl p-4 bg-black/90 text-left text-gray-300">
              <Link
                href=""
                className="w-full h-full flex flex-col gap-4 justify-center items-start"
              >
                <h4 className="text-3xl">Social Media App</h4>
                <p className="text-3xl">
                  Build the Angular Social Media project with React / Next.js
                </p>
                <p className="text-3xl">Not Started: ETA July 1st 2025</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
