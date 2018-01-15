import { User } from './user';
import { Group } from './group';

export class ResponseData {
    status: string;
    message: string;
}

export class ResponseUser extends ResponseData {
    data: User[];
}

export class ResponseGroup extends ResponseData {
    data: Group[];
}
