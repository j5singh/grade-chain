export interface ITransactionGrades {
    courseCode: string,
    teacher: string,
    student: string,
    result: number,
    date: string,
    year: number,
    courseName: string
}

export interface IGrades {
    hash: string,
    previousHash: string,
    timestamp: number,
    nonce: number,
    merkleRoot: string,
    transaction: ITransactionGrades
}

export interface IPendingGrades {
    nonce: number,
    merkleRoot: string,
    transaction: ITransactionGrades
}