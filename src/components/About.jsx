/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { gitLogo, linkedinLogo, XLogo } from "../assets";
const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and .net.
        I&apos;m a quick learner and collaborate closely with clients to create
        efficient, scalable, and user-friendly solutions that solve real-world
        problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <span className=" flex gap-4 items-center mt-5 ">
        <a
          href="https://github.com/abinashchhetri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className=" h-12 " src={gitLogo} alt="Github" />
        </a>
        <a
          href="https://www.linkedin.com/in/abinash-chhetri-790690315/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className=" h-12 " src={linkedinLogo} alt="LinkedIn" />
        </a>
        <a
          href="https://x.com/AbinashChhetri0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className=" h-12 " src={XLogo} alt="X" />
        </a>
      </span>

      <div className="mt-20 flex flex-wrap items-center justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};
export default SectionWrapper(About, "about");
