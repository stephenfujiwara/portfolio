import React from "react";
import { motion } from "framer-motion";

export default function Description({ ...props }) {
  return (
    <motion.div
      initial={{ x: -10 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute z-10 bg-gradient-to-b from-white to-blue-400 h-screen w-1/4 px-5 py-20"
    >
      <h1 className="font-roadgeek text-2xl text-[#434343] mb-8">
        {props.title}
      </h1>
      <img src={props.demo} />
      <h2 className="italic font-silka text-[18px] mx-0 mt-4 mb-[1px]">
        {"Technologies"}
      </h2>
      <h3 className="font-lato text-[12px] mx-0 mt-0 mb-[12px]">
        {props.technologies}
      </h3>
      <h2 className="italic font-silka text-[18px] mx-0 mt-4 mb-[1px]">
        {"Year"}
      </h2>
      <h3 className="font-lato text-[12px] mx-0 mt-0 mb-[12px]">
        {props.year}
      </h3>
      <p className="font-lato text-[12px] mx-0 mt-6 mb-8">
        {props.description}
      </p>
      <span className="italic font-silka">
        {"Visit website:"}
        <a
          className="font-lato text-[14px] ml-1"
          href={props.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {"let's go!"}
        </a>
      </span>
      <br />
      <motion.a
        whileHover={{ scale: 0.8 }}
        className="inline-block my-4"
        href={props.source}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="github-original.svg" width={50} height={50} />
      </motion.a>
    </motion.div>
  );
}
