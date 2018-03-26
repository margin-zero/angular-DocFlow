export class DocumentHistory {
    id: number;
    document_id: number;
    user_id: number;
    user_name: string;
    operation_date: string;
    pathstep: string;
    action: string;
    constructor() {
        this.id = 0;
        this.document_id = 0;
        this.user_id = 0;
        this.user_name = '';
        this.operation_date = '';
        this.pathstep = '';
        this.action = '';
    }
}
