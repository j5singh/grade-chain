import { MdDashboard, MdOutlineLaptopChromebook, MdWork, MdSchool, MdModeEditOutline } from "react-icons/md";
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
                icon: MdModeEditOutline,
                name: "Book Exams",
                route: Constants.STUDENT_ROUTES.booking,
                roles: 'student'
            },
            {
                icon: MdWork,
                name: "Your Exams",
                route: Constants.TEACHER_ROUTES.yourexams,
                roles: 'teacher'
            },
            {
                icon: MdModeEditOutline,
                name: "Verbalisation",
                route: Constants.TEACHER_ROUTES.verbalisation,
                roles: 'teacher'
            }
        ]
    },
]

export const _sidebarItems = [
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
    },
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
        icon: MdModeEditOutline,
        name: "Book Exams",
        route: Constants.STUDENT_ROUTES.booking,
        roles: 'student'
    },
    {
        icon: MdWork,
        name: "Your Exams",
        route: Constants.TEACHER_ROUTES.yourexams,
        roles: 'teacher'
    },
    {
        icon: MdModeEditOutline,
        name: "Verbalisation",
        route: Constants.TEACHER_ROUTES.verbalisation,
        roles: 'teacher'
    }
]