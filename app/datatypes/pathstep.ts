export class PathStep {
    id: number;
    path_id: number;
    name: string;
    step_order: number;
    action_enter: string;
    action_next: string;
    action_archive: string;
    action_cancel: string;
    action_change: string;
    constructor() {
        this.id = 0;
        this.path_id = 0;
        this.name = '';
        this.step_order = 0;
        this.action_enter = 'FALSE';
        this.action_next = 'FALSE';
        this.action_archive = 'FALSE';
        this.action_cancel = 'FALSE';
        this.action_change = 'FALSE';
    }
}
