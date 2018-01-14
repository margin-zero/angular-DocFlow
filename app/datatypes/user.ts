export class User {
    id: number;
    username: string;
    password: string;
    full_name: string;
    phone_number: string;
    email_address: string;
    additional_info: string;
    is_active: string;
    is_user: string;
    is_admin: string;
    constructor() {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.full_name = '';
        this.phone_number = '';
        this.email_address = '';
        this.additional_info = '';
        this.is_active = 'FALSE';
        this.is_user = 'FALSE';
        this.is_admin = 'FALSE';
    }
}
