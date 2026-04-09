import departmentsData from "./departments.json";
import doctorsData from "./doctors.json";
import branchesData from "./branches.json";
import faqData from "./faq.json";
import guidesData from "./preparation-guides.json";
import usersData from "./users.json";

export const departments = departmentsData;
export const doctors = doctorsData;
export const branches = branchesData;
export const faq = faqData;
export const preparationGuides = guidesData;
export const users = usersData;

export type Department = (typeof departmentsData)[number];
export type Doctor = (typeof doctorsData)[number];
export type Branch = (typeof branchesData)[number];
export type Faq = (typeof faqData)[number];
export type PreparationGuide = (typeof guidesData)[number];
export type User = (typeof usersData)[number];
