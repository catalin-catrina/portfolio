"use client";

import Image from "next/image";

import html from "@/assets/html.svg";
import css from "@/assets/css.svg";
import sass from "@/assets/sass.svg";
import bootstrap from "@/assets/bootstrap.svg";
import tailwind from "@/assets/tailwind.svg";
import javascript from "@/assets/javascript.svg";
import typescript from "@/assets/sass.svg";
import angular from "@/assets/angular.svg";
import react from "@/assets/react.svg";
import nextjs from "@/assets/next-js.svg";
import karma from "@/assets/karma.svg";
import jasmine from "@/assets/jasmine.svg";
import jest from "@/assets/jest.svg";
import figma from "@/assets/figma.svg";
import framer from "@/assets/framer.svg";
import { motion } from "motion/react";

export const Skills = () => {
  return (
    <section id="skills">
      <div className="max-w-[1200px] mx-auto mb-30 px-4 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, type: "spring" }}
          className="inline-block mx-auto mb-20 bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent text-6xl leading-15 tracking-wide"
        >
          Skills
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, type: "spring" }}
          className="grid grid-cols-5 gap-10 justify-items-center"
        >
          <Image src={html} width={100} height={100} alt="html icon" />
          <Image src={css} width={100} height={100} alt="css icon" />
          <Image src={sass} width={100} height={100} alt="sass icon" />
          <Image
            src={bootstrap}
            width={100}
            height={100}
            alt="bootstrap icon"
          />
          <Image src={tailwind} width={100} height={100} alt="tailwind icon" />
          <Image
            src={javascript}
            width={100}
            height={100}
            alt="javascript icon"
          />
          <Image
            src={typescript}
            width={100}
            height={100}
            alt="typescript icon"
          />
          <Image src={angular} width={100} height={100} alt="angular icon" />
          <Image src={react} width={100} height={100} alt="react icon" />
          <Image src={nextjs} width={100} height={100} alt="nextjs icon" />
          <Image src={karma} width={100} height={100} alt="karma icon" />
          <Image src={jasmine} width={100} height={100} alt="jasmine icon" />
          <Image src={jest} width={100} height={100} alt="jest icon" />
          <Image src={figma} width={100} height={100} alt="figma icon" />
          <Image src={framer} width={100} height={100} alt="framer icon" />
        </motion.div>
      </div>
    </section>
  );
};
