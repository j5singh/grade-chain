export interface IExam {
    bookingOpening: number,
    bookingClosing: number,
    teacherCode: string,
    teacher: string,
    courseCode: string,
    courseName: string,
    examDate: number
}

export interface ISubscription {
    serialNumber: number,
    exam: IExam
}