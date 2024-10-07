"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link"; // Importando o componente Link

export default function Home() {
  const textAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
    viewport: { once: false },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative flex flex-col items-center justify-center h-screen bg-[#09090b] gap-4 w-full">
        <div
          className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-no-repeat opacity-30 animate-moving-background"
          style={{
            animation: "moveBackground 30s ease-in-out infinite",
          }}></div>

        <motion.p
          className="border rounded-full px-4 py-2 text-white backdrop-blur-lg bg-white/10 border-white/20"
          initial={textAnimation.initial}
          whileInView={textAnimation.whileInView}
          transition={{ ...textAnimation.transition, delay: 0 }}
          viewport={textAnimation.viewport}>
          New version now available!
        </motion.p>

        <motion.h2
          className="relative text-4xl md:text-8xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-2xl"
          initial={textAnimation.initial}
          whileInView={textAnimation.whileInView}
          transition={{ ...textAnimation.transition, delay: 0.1 }}
          viewport={textAnimation.viewport}>
          Revolutionary Approach <br /> To Web Creativity
        </motion.h2>

        <motion.p
          className="w-full px-4 md:px-0 md:w-[800px] text-white text-xl text-center"
          initial={textAnimation.initial}
          whileInView={textAnimation.whileInView}
          transition={{ ...textAnimation.transition, delay: 0.2 }}
          viewport={textAnimation.viewport}>
          Your intelligent AI partner, blending knowledge, creativity, and
          problem-solving to empower your ideas, enhance productivity, and bring
          innovative solutions to life—wherever you need them.
        </motion.p>

        <Link href="/generative" className="z-10">
          <Button className="mt-8 w-fit text-lg py-6 flex gap-2 rounded-full">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="h-fit py-[100px] flex flex-col items-center justify-center gap-8 p-8 md:w-[1200px] w-full ">
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 w-full">
          <motion.h2
            className="text-6xl flex-1"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.3 }}
            viewport={textAnimation.viewport}>
            Simple, Clear,
            <br /> Useful for
          </motion.h2>

          <motion.p
            className="flex-2 text-gray-400 text-right"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.4 }}
            viewport={textAnimation.viewport}>
            Over 300,000 users enjoy the simplicity of <br />
            <b>Elysium</b> in their everyday work.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 w-full">
          <motion.div
            className="border rounded-xl p-8 flex flex-col mt-6 w-full md:w-[48%] bg-gradient-to-br from-[#09090b] via-[#09090b] to-[#240a36] bg-opacity-10"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.5 }}
            viewport={textAnimation.viewport}>
            <h2 className="text-white text-4xl font-bold">Developers</h2>
            <p className="w-full text-gray-400 text-md mt-4">
              Empower developers to reach their full potential by explaining
              code snippets, providing debugging assistance, and offering a wide
              range of support.
            </p>
            <Link href="/generative">
              <Button
                variant="outline"
                className="mt-5 w-fit text-md py-6 px-8 flex gap-2 rounded-xl">
                Get Started
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="border rounded-xl p-8 flex flex-col mt-6 w-full md:w-[48%] bg-gradient-to-bl from-[#09090b] via-[#09090b] to-[#240a36] bg-opacity-10"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.7 }}
            viewport={textAnimation.viewport}>
            <h2 className="text-white text-4xl font-bold">Designers</h2>
            <p className="w-full text-gray-400 text-md mt-4">
              Enable designers to unlock their full creative potential by
              offering guidance on design principles, providing feedback on
              projects, and delivering a variety of resources and support.
            </p>
            <Link href="/generative">
              <Button
                variant="outline"
                className="mt-5 w-fit text-md py-6 px-8 flex gap-2 rounded-xl">
                Get Started
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="border rounded-xl p-8 flex flex-col w-full md:w-[48%] bg-gradient-to-tr from-[#09090b] via-[#09090b] to-[#240a36] bg-opacity-10"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.8 }}
            viewport={textAnimation.viewport}>
            <h2 className="text-white text-4xl font-bold">Marketers</h2>
            <p className="w-full text-gray-400 text-md mt-4">
              Equip marketers with tools to strategize effectively, analyze
              trends, and implement impactful campaigns to boost engagement and
              growth.
            </p>
            <Link href="/generative">
              <Button
                variant="outline"
                className="mt-5 w-fit text-md py-6 px-8 flex gap-2 rounded-xl">
                Get Started
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="border rounded-xl p-8 flex flex-col w-full md:w-[48%] bg-gradient-to-tl from-[#09090b] via-[#09090b] to-[#240a36] bg-opacity-10"
            initial={textAnimation.initial}
            whileInView={textAnimation.whileInView}
            transition={{ ...textAnimation.transition, delay: 0.9 }}
            viewport={textAnimation.viewport}>
            <h2 className="text-white text-4xl font-bold">Normal Use Cases</h2>
            <p className="w-full text-gray-400 text-md mt-4">
              Discover a variety of normal use cases for everyday users,
              designed to enhance productivity, streamline tasks, and improve
              overall efficiency.
            </p>
            <Link href="/generative">
              <Button
                variant="outline"
                className="mt-5 w-fit text-md py-6 px-8 flex gap-2 rounded-xl">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {
        //footer
      }

      <div className="w-full bg-[#09090b] text-gray-400 p-8 flex text-center justify-center items-center gap-8">
        <p> All Rights Reserved, 2024 João Silva</p>
      </div>
    </div>
  );
}
