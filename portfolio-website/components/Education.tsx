"use client";

import { motion } from "motion/react";

export const Education = () => {
  return (
    <section id="education">
      <div className="max-w-[1200px] mx-auto p-4 md:p-8 mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, type: "spring" }}
          className="inline-block mb-20 text-6xl bg-linear-to-r from bg-fuchsia-600 to-sky-500 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, type: "spring" }}
          className="card mx-auto mb-15 border border-gray-700 rounded-4xl px-14 py-8 text-gray-200 text-left"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-2">
            <h3 className="text-3xl tracking-wider text-gray-200">
              Bachelor&apos;s degree in Computer Science
            </h3>
            <p className="italic text-gray-300">2017 - 2020</p>
          </div>

          <p className="inline-block mb-3 font-semibold bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent">
            West University &quot;Vasile Goldis&quot; of Arad
          </p>
        </motion.div>
      </div>
    </section>
  );
};
