import { User } from './user';
import { Group } from './group';
import { Path } from './path';
import { Action } from './action';
import { PathStep } from './pathstep';
import { Author } from './author';
import { Document } from './document';

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

export class FormModelEditPath extends Path {
    // for now we have FormModelEditPath === Path
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

export class FormModelEditPathStep extends PathStep {
    // for now we have FormModelEditPathStep === PathStep
        constructor() {
            super();
            this.name = '';
        }
    }

export class FormModelNewPathStepGroup {
    id: number;
    group_id: number;
    pathstep_id: number;
    path_id: number;
    constructor() {
        this.id = 0;
        this.pathstep_id = 0;
        this.group_id = 0;
        this.path_id = 0;
    }
}

export class FormModelEditAuthor extends Author {
    // for now we have FormModelEditAuthor === Author
    constructor() {
        super();
        this.id = 0;
        this.name = '';
        this.full_name = '';
        this.address = '';
        this.phone_number = '';
        this.email_address = '';
        this.additional_info  = '';
    }
}

export class FormModelEditDocument extends Document {
    // for now we have FormModelEditDocument === Document
    constructor() {
        super();
        this.id = 0;
        this.name = '';
        this.register = '';
        this.input_date = '';
        this.author_id = 0;
        this.id_by_author = '';
        this.date_by_author = '';
        this.additional_info = '';
        this.ready = 'FALSE';
        this.path_id = 0;
        this.pathstep_id = 0;
        this.assigned_user = 0;
        this.closed = 'FALSE';
        this.file_path = '';
        this.message = '';
    }
}

export class FormModelPathStepAction {
    actionId: number;
    message: string;
    constructor() {
        this.actionId = 0;
        this.message = '';
    }
}
