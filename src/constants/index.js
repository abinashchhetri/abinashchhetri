import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  tripguide,
  threejs,
  NaxaLabs,
  RRINTERIOR,
  Trigon,
  RupakNepali,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: ".net Maui ",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Junior Full Stack Developer",
    company_name: "Naksa Labs",
    icon: NaxaLabs,
    iconBg: "#383E56",
    date: "Jan 2021 - Dec 2024",
    link: "https://www.facebook.com/abinash.chhetri.311",
    points: [
      "Developing and maintaining web applications using MEARN Technology.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Backend developer for RRINTERIOR",
    company_name: "RRINTERIOR",
    icon: RRINTERIOR,
    iconBg: "#383E56",
    date: "May 2023 - Dec 2023",
    points: [
      "Developing and maintaining backend using typescript mongodb express  node  and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing fast. scalable and secure backed.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    link: "https://rr-interior-frontend.vercel.app/",
  },
  {
    title: "Freelance Single Page Web Development",
    company_name: "Trigon",
    icon: Trigon,
    iconBg: "#ffffff",
    date: "Jan 2023 - Jan 2023 (about 3 days)",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Solo developed resposive website from design to deployment",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in Design reviews and quality check with the stake holders",
    ],
    link: "https://www.trigontoursandtravel.com.np/",
  },
  {
    title: "Freelance Project for Potfolio Website of Rupak Nepali",
    company_name: "Rupak Nepali",
    icon: RupakNepali,
    iconBg: "#E6DEDD",
    date: "Feb 2023 - March 2023 ",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      " developed resposive website from design to deployment",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in Design reviews and quality check with the stake holders",
    ],
    link: "https://www.nepalirupak.com.np",
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
