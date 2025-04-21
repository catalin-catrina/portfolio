"use client";

import { motion } from "motion/react";

export const Experience = () => {
  return (
    <section id="experience">
      <div className="max-w-[1200px] mx-auto mb-30 px-4 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, type: "spring" }}
          className="inline-block mb-20 text-6xl bg-linear-to-r from bg-fuchsia-600 to-sky-500 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>
        <div className="relative flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 2, type: "spring" }}
            className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-700 z-[-1]"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            className="card mb-15 border border-gray-700 rounded-4xl px-8 md:px-14 py-8 text-gray-200 text-left w-full md:w-2/3"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-2">
              <h3 className="text-3xl tracking-wider text-gray-200">
                Frontend Developer
              </h3>
              <p className="italic text-gray-300">Aug 2022 - Feb 2025</p>
            </div>

            <p className="inline-block mb-3 font-semibold bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent">
              Cognizant Softvision
            </p>
            <p className="text-lg/8 text-gray-200 tracking-wide">
              - Worked in an{" "}
              <span className="font-semibold text-sky-500">Agile (Kanban</span>)
              environment to maintain and improve an established{" "}
              <span className="font-semibold text-sky-500">
                healthcare provider application
              </span>{" "}
              using <span className="font-semibold text-sky-500">Angular</span>.
              <br />
              - Debugged and resolve complex issues within the existing
              codebase, enhancing application stability and user experience.
              <br />- Implemented design updates and UI refinements to improve
              the application&apos;s look and feel while maintaining
              consistency.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            className="card self-end mb-15 border border-gray-700 rounded-4xl px-8 md:px-14 py-8 text-gray-200 text-left w-full md:w-2/3"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-2">
              <h3 className="text-3xl tracking-wider text-gray-200">
                Frontend Developer
              </h3>
              <p className="italic text-gray-300">Mar 2022 - Aug 2022</p>
            </div>

            <p className="inline-block mb-3 font-semibold bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent">
              Isidors Software Solutions
            </p>
            <p className="text-lg/8 text-gray-200 tracking-wide">
              - Worked in an{" "}
              <span className="font-semibold text-sky-500">Agile (Scrum)</span>{" "}
              envrionment to develop essential UI components for an{" "}
              <span className="font-semibold text-sky-500">
                internal application
              </span>
              , contributing to a robust and user-friendly platform.
              <br />- Engaged in code reviews and implemented best practices to
              ensure high-quality, scalable solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, type: "spring" }}
            className="card border border-gray-700 rounded-4xl px-8 md:px-14 py-8 text-gray-200 text-left w-full md:w-2/3"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-2">
              <h3 className="text-3xl tracking-wider text-gray-200">
                Frontend Developer
              </h3>
              <p className="italic text-gray-300">Nov 2020 - Oct 2021</p>
            </div>

            <p className="inline-block mb-3 font-semibold bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent">
              eLearning & Software
            </p>
            <p className="text-lg/8 text-gray-200 tracking-wide">
              - Worked in a{" "}
              <span className="font-semibold text-sky-500">Waterfall</span>{" "}
              environment{" "}
              <span className="font-semibold text-sky-500">
                for clients in the education and e-learning industry
              </span>{" "}
              to <span className="font-semibold text-sky-500">redesign</span>{" "}
              Moodle themes using{" "}
              <span className="font-semibold text-sky-500">Figma</span> , in
              order to boost user engagement and align with specific client
              requirements.
              <br />-{" "}
              <span className="font-semibold text-sky-500">
                Integrated designs
              </span>{" "}
              into clean, responsive, mobile-first web interfaces.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
