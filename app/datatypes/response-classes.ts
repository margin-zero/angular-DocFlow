import { User } from './user';
import { Group } from './group';
import { Path } from './path';
import { PathStep } from './pathstep';
import { PathStepGroup } from './pathstepgroup';
import { Action } from './action';
import { Author } from './author';
import { EntryPathStepGroup } from './entrypathstepgroup';
import { Document } from './document';
import { DocumentHistory } from './documenthistory';

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

export class ResponsePathStepGroup extends ResponseData {
    data: PathStepGroup[];
}

export class ResponsePath extends ResponseData {
    data: Path[];
}

export class ResponsePathStep extends ResponseData {
    data: PathStep[];
}

export class ResponseAction extends ResponseData {
    data: Action[];
}

export class ResponseNumber extends ResponseData {
    data: Number;
}

export class ResponseAuthor extends ResponseData {
    data: Author[];
}

export class ResponseEntryPathStepGroup extends ResponseData {
    data: EntryPathStepGroup[];
}

export class ResponseDocument extends ResponseData {
    data: Document[];
}

export class ResponseDocumentHistory extends ResponseData {
    data: DocumentHistory[];
}
