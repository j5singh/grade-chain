interface ITransactionGrades {
    courseCode: string,
    teacher: string,
    student: string,
    result: number,
    date: string,
    year: number,
    courseName: string
}

interface IGrades {
    hash: string,
    previousHash: string,
    timestamp: number,
    nonce: number,
    merkleRoot: string,
    transaction: ITransactionGrades
}

export default IGrades