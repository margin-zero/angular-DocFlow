export class Document {
    id: number;
    name: string;
    register: string;
    input_date: number;
    author_id: number;
    id_by_author: string;
    date_by_author: number;
    additional_info: string;
    ready: string;
    path_id: number;
    pathstep_id: number;
    assigned_user: number;
    closed: string;
    file_path: string;
    message: string;
    constructor() {
        this.id = 0;
        this.name = '';
        this.register = '';
        this.input_date = 0;
        this.author_id = 0;
        this.id_by_author = '';
        this.date_by_author = 0;
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
