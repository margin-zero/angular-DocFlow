import { User } from './user';


class ResponseData {
    status: string;
    message: string;
}

export class ResponseUser extends ResponseData {
    data: User[];
}
