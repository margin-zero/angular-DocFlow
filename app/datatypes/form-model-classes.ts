import { User } from './user';
import { Group } from './group';

export class FormModelResetPassword {
    password: string;
    confirmPassword: string;
    constructor() {
        this.password = '';
        this.confirmPassword = '';
    }
}


export class FormModelLogin {
    username: string;
    password: string;
}


export class FormModelEditUser extends User {
// for now we have FormModelEditUser === User
    constructor() {
        super();
        this.additional_info  = '';
        this.email_address = '';
        this.full_name = '';
        this.id = 0;
        this.is_active = 'FALSE';
        this.is_admin = 'FALSE';
        this.is_user = 'FALSE';
        this.password = '';
        this.phone_number = '';
        this.username = '';
    }
}


export class FormModelEditGroup extends Group {
// for now we have FormModelEditGroup === Group
    constructor() {
        super();
        this.id = 0;
        this.name = '';
    }
}
