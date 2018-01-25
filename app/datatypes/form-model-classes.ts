import { User } from './user';
import { Group } from './group';
import { Path } from './path';
import { Action } from './action';
import { PathStep } from './pathstep';

export class FormModelChangePassword {
    oldPassword: string;
    password: string;
    confirmPassword: string;
    constructor() {
        this.oldPassword = '';
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

export class FormModelNewUserGroup {
    id: number;
    group_id: number;
    user_id: number;
    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.group_id = 0;
    }
}

export class FormPathEditGroup extends Path {
    // for now we have FormPathEditGroup === Path
        constructor() {
            super();
            this.id = 0;
            this.name = '';
            this.info = '';
            this.can_receive = 'FALSE';
        }
    }

export class FormModelEditAction extends Action {
    // for now we have FormModelEditAction === Action
        constructor() {
            super();
            this.id = 0;
            this.name = '';
        }
    }

export class FormModelNewPathStep extends PathStep {
    // for now we have FormModelNewPathStep === PathStep
        constructor() {
            super();
        }
    }
