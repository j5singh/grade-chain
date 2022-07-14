import { MdDashboard, MdOutlineLaptopChromebook, MdSchool } from "react-icons/md";
import { Constants } from "./constants";

export const sidebarItems = [
    {
        paragraphName: "MAIN",
        subItems: [
            {
                icon: MdDashboard,
                name: "Dashboard",
                route: Constants.STUDENT_ROUTES.dashboard,
                roles: 'student'
            },
            {
                icon: MdDashboard,
                name: "Dashboard",
                route: Constants.TEACHER_ROUTES.dashboard,
                roles: 'teacher'
            }
        ]
    },
    {
        paragraphName: "SERVICES",
        subItems: [
            {
                icon: MdSchool,
                name: "Grades",
                route: Constants.STUDENT_ROUTES.grades,
                roles: 'student'
            },
            {
                icon: MdOutlineLaptopChromebook,
                name: "Results",
                route: Constants.STUDENT_ROUTES.results,
                roles: 'student'
            },
            {
                icon: MdOutlineLaptopChromebook,
                name: "Exam Booking",
                route: Constants.TEACHER_ROUTES.exambooking,
                roles: 'teacher'
            }
        ]
    }
]