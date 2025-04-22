"use client";

import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

import { motion, Variants } from "motion/react";

import heroImg from "@/assets/hero.png";

export const Hero = () => {
  const chars = (line: string) => Array.from(line);

  const intro = `Hi there 👋 I'm Catalin.
I am a Frontend Developer with 4 years of industry experience, proficient in both Angular and React. I excel at integrating fully‑responsive, mobile‑first designs using advanced CSS, and bring them to life with polished 2D animations, both custom and powered by GSAP or Framer Motion.`;

  const isMobile = useIsMobile(1024);

  const H1 = isMobile ? "h1" : motion.h1;
  const H2 = isMobile ? "h2" : motion.h2;
  const SPAN = isMobile ? "span" : motion.span;
  const A = isMobile ? "a" : motion.a;

  const headerContainerVariant = isMobile
    ? ({} as Variants)
    : {
        start: { y: -50 },
        end: {
          y: 0,
          transition: {
            duration: 0.3,
            staggerChildren: 0.03,
            type: "spring",
          },
        },
      };

  const subheaderContainerVariant = isMobile
    ? ({} as Variants)
    : {
        start: { y: 0 },
        end: {
          transition: {
            duration: 0.5,
            delay: 0.9,
            delayChildren: 1.2,
            staggerChildren: 0.01,
            type: "spring",
          },
        },
      };

  const spanVariant = isMobile
    ? ({} as Variants)
    : {
        start: { opacity: 0 },
        end: {
          opacity: 1,
          transition: { duration: 0.05, type: "spring" },
        },
      };

  return (
    <section id="about">
      <div className="relative mt-10 mb-30">
        <div className="absolute right-[8%] bottom-[25%] w-[22vw] h-[22vw] max-w-[300px] max-h-[260px] rounded-full bg-fuchsia-700 blur-2xl opacity-10 blend-mode-overlay"></div>
        <div className="absolute right-[20%] bottom-[20%] w-[15vw] h-[15vw] max-w-[250px] max-h-[200px] rounded-full bg-violet-700 blur-2xl opacity-10 blend-mode-overlay"></div>
        <div className="absolute right-[30%] bottom-[25%] w-[20vw] h-[20vw] max-w-[300px] max-h-[260px] rounded-full bg-blue-700 blur-2xl opacity-10 blend-mode-overlay"></div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:gap-8 w-full md:w-[85%] lg:w-[initial] mx-auto">
            <div className="flex flex-col justify-center items-center gap-10 w-full md-w-[80%] lg:w-2/4 mb-0 lg:mb-20">
              <H1
                variants={headerContainerVariant}
                initial="start"
                animate="end"
                className="text-5xl lg:text-7xl text-center lg:text-left bg-linear-to-r from-fuchsia-600 via-sky-500 to-sky-500 bg-clip-text text-transparent leading-15 md:leading-20 lg:leading-25 tracking-wide uppercase"
              >
                {"Frontend Developer".split("").map((letter, index) => (
                  <SPAN key={index} variants={spanVariant}>
                    {letter}
                  </SPAN>
                ))}
              </H1>
              <div className="flex flex-col gap-15 lg:gap-10">
                <H2
                  variants={subheaderContainerVariant}
                  initial="start"
                  animate="end"
                  className="text-xl md:text-2xl text-center lg:text-left text-gray-200 leading-10 lg:leading-12 tracking-wide"
                >
                  {intro.split("\n").map((line, lineIdx) => (
                    <span key={`line-${lineIdx}`} className="block">
                      {chars(line).map((ch, chIdx) => (
                        <SPAN key={chIdx} variants={spanVariant}>
                          {ch}
                        </SPAN>
                      ))}
                    </span>
                  ))}
                </H2>
                <A
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.5, duration: 0.3 }}
                  href="mailto:catalin.catrina@outlook.com"
                  className="cta-button relative sm:w-[70%] md:w-[50%] lg:w-[initial] lg:self-start mx-auto lg:mx-[initial] text-gray-200 px-6 py-4 text-xl lg:hover:translate-y-[-4px] lg:transition lg:active:scale-[0.95]"
                >
                  Contact Me
                </A>
              </div>
            </div>
            <div className="hidden w-[80%] md:w-2/3 lg:w-1/3 lg:flex justify-center mr-12 lg:mr-0 mt-35">
              <Image src={heroImg} alt="profile photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
