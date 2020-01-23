export const SIGN_IN_AS_TEACHER = 'SIGN_IN_AS_TEACHER';

export const signInAsTeacher = () => {
    return { type: SIGN_IN_AS_TEACHER}
};

export const SIGN_IN_AS_STUDENT = 'SIGN_IN_AS_STUDENT';

export const signInAsStudent = () => {
    return { type: SIGN_IN_AS_STUDENT}
};

export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => {
    return { type: SIGN_OUT}
};