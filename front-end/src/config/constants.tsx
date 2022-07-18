export class Constants {
    public static get COMPANY_KEY() { return 'GRADE-CHAIN' } // this will be used for localstorage as a key to append before a value to store
    public static get API_ENDPOINT() { return 'http://localhost:3001/api' }
    public static get VERSION() { return '20220601' }

    public static get AUTH_ROUTES() {
        return {
            'login': '/auth/login',
            'register': '/auth/register'
        }
    }

    public static get STUDENT_ROUTES() {
        return {
            'dashboard': '/student/dashboard',
            'grades': '/student/grades',
            'results': '/student/results',
            'booking': '/student/booking'
        }
    }

    public static get TEACHER_ROUTES() {
        return {
            'dashboard': '/teacher/dashboard',
            'exambooking': '/teacher/exambooking'
        }
    }
}