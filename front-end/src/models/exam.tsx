import { ICourse } from "./course"

export interface IExam {
    bookingOpening: number,
    bookingClosing: number,
    teacherCode: string,
    teacher: string,
    courseCode: string,
    courseName: string,
    examDate: number,
    occurrences: number,
    subscribed: IUser[]
}

export interface IUser {
    "serialNumber": string,
    "surname": string,
    "name": string
}

export interface ISubscription {
    serialNumber: number,
    exam: IExam
}

export interface INewExam {
    serialNumber: string,
    surname: string,
    courses: ICourse | null
}