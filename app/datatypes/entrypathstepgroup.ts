// klasa definiująca jeden rekord z tablicy pathsteps_groups poszerzony o pełną nazwę ścieżki obiegu,
// do której dana definicja należy
//
// klasa jest wykorzystywana do uzyskania informacji o akcjach "wprowadzanie dokumentu" oraz o grupach,
// które są do tych akcji upoważnione

export class EntryPathStepGroup {
    id: number;
    pathstep_id: number;
    group_id: number;
    path_id: number;
    path_name: string;
    constructor() {
        this.id = 0;
        this.pathstep_id = 0;
        this.group_id = 0;
        this.path_id = 0;
        this.path_name = '';
    }
}
