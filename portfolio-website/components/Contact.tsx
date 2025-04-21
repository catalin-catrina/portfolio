"use client";

import { motion } from "motion/react";

import linkedin from "@/assets/linkedin.svg";
import github from "@/assets/github.svg";
import Image from "next/image";
import { ContactForm } from "./ContactForm";
import Link from "next/link";

export const Contact = () => {
  return (
    <section id="contact">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-30">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 lg:gap-0 text-center lg:text-left text-gray-200">
          <div className="flex flex-col gap-8 w-full lg:w-2/5">
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 3, type: "spring" }}
              className="inline-block text-5xl tracking-wide bg-linear-to-r from-fuchsia-600 to-sky-500 bg-clip-text text-transparent"
            >
              Do you have a project to discuss?
            </motion.h2>

            <h4 className="text-4xl mb-4">Get In Touch</h4>

            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
              <div>
                <h5 className="text-4xl mb-2">Contact</h5>
                <a href="mailto:catalin.catrina@outlook.com" className="text-xl">
                  catalin.catrina@outlook.com
                </a>
              </div>
              <div className="flex flex-col gap-4 uppercase text-xl">
                <h5>My Socials</h5>
                <div className="flex justify-center items-center gap-2">
                  <Link
                    href="https://www.linkedin.com/in/catalin-catrina/"
                    target="_blank"
                  >
                    <Image
                      src={linkedin}
                      width={45}
                      height={45}
                      alt="linkedin icon"
                    />
                  </Link>
                  <Link
                    href="https://github.com/catalin-catrina"
                    target="_blank"
                  >
                    <Image
                      src={github}
                      width={40}
                      height={40}
                      alt="github icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 lg:w-2/5 text-left">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
