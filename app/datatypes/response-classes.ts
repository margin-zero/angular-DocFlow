import { User } from './user';


export class ResponseData {
    status: string;
    message: string;
}

export class ResponseUser extends ResponseData {
    data: User[];
}
