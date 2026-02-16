import {
  TemplateFive,
  TemplateFour,
  TemplateOne,
  TemplateSeven,
  TemplateSix,
  TemplateThree,
  TemplateTwo,
} from "../components/templates";
import { Template } from "../types";

export const templateData: Template[] = [
  {
    id: 1,
    style: "Free",
    image: "/images/resume1.svg",
    description:
      "A sleek, contemporary design with bold headings and clean lines.",
    temp: "free",
    component: TemplateOne,
  },
  {
    id: 2,
    style: "Corporate",
    image: "/images/resume2.svg",
    description: "Elegant design with professional fonts and spacing.",
    pic: "true",
    temp: "paid",
    component: TemplateTwo,
  },

  {
    id: 3,
    style: "The Global Starter",
    image: "/images/resume3.svg",
    description: "Minimalist style emphasizing clarity and simplicity.",
    temp: "paid",
    component: TemplateThree,
  },
  {
    id: 4,
    style: "The Scholar",
    image: "/images/resume4.svg",
    description: "Creative design with eye-catching sections.",
    temp: "paid",
    component: TemplateFour,
  },
  {
    id: 5,
    style: "The Creator",
    image: "/images/resume5.svg",
    description: "Structured layout with clear hierarchy.",
    pic: "true",
    temp: "paid",
    component: TemplateFive,
  },
  {
    id: 6,
    style: "The Innovator",
    image: "/images/resume6.svg",
    description: "Professional layout with modern typography.",
    temp: "paid",
    component: TemplateSix,
  },

  {
    id: 7,
    style: "The Analyst",
    image: "/images/resume8.svg",
    description: "Creative design with eye-catching sections.",
    temp: "paid",
    component: TemplateSeven,
  },
];
