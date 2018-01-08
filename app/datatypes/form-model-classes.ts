import { User } from './user';

export class FormModelResetPassword {
    password: string;
    confirmPassword: string;
}

export class FormModelEditUser extends User {
// for now we have FormModelEditUser === User
}
