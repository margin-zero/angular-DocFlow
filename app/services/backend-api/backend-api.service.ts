import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

// DATATYPES
import { User } from '../../datatypes/user';
import { Group } from '../../datatypes/group';
import { Path } from '../../datatypes/path';
import { PathStep } from '../../datatypes/pathstep';
import { PathStepGroup } from '../../datatypes/pathstepgroup';
import { Action } from '../../datatypes/action';
import { Author } from '../../datatypes/author';
import { EntryPathStepGroup } from '../../datatypes/entrypathstepgroup';
import { Document } from '../../datatypes/document';
import { DocumentHistory } from '../../datatypes/documenthistory';

import {
  ResponseUser,
  ResponseGroup,
  ResponsePathStepGroup,
  ResponsePath,
  ResponseData,
  ResponsePathStep,
  ResponseAction,
  ResponseNumber,
  ResponseAuthor,
  ResponseEntryPathStepGroup,
  ResponseDocument,
  ResponseDocumentHistory } from '../../datatypes/response-classes';


// CONSTANTS
import { API_URL } from '../../constants/global-constants';
import { FormModelPathStepAction, FormModelDocumentSearch } from '../../datatypes/form-model-classes';




@Injectable()
export class BackendApiService implements OnInit {

  user: User;

  usersObservable = new Subject<any>();
  groupsObservable = new Subject<any>();
  pathsObservable = new Subject<any>();
  pathStepsObservable = new Subject<any>();
  actionsObservable = new Subject<any>();
  authorsObservable = new Subject<any>();
  documentsNotReadyObservable = new Subject<any>();
  documentsNotAssignedObservable = new Subject<any>();
  documentsAssignedObservable = new Subject<any>();
  documentsClosedObservable = new Subject<any>();

  documentsNotReadyCountObservable = new Subject<any>();
  documentsNotAssignedCountObservable = new Subject<any>();
  documentsAssignedCountObservable = new Subject<any>();

  pathStepGroupsObservable = new Subject<any>();
  notPathStepGroupsObservable = new Subject<any>();

  userGroupsObservable = new Subject<any>();
  notUserGroupsObservable = new Subject<any>();

  groupUsersObservable = new Subject<any>();
  notGroupUsersObservable = new Subject<any>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  // this.refreshUsersObservable();
  }

  ngOnInit() { }

  private handleError(error: any): Promise<any> {
    console.error('UWAGA !!! An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // function used for 'hashing' passwords
  private hashUserPassword(password): string {
    return password;
  }


  login(username: string, password: string): Promise<ResponseUser> {

    const URL = API_URL + 'login';

    return this.http
    .post<ResponseUser>(URL, JSON.stringify({'username': username, 'password': this.hashUserPassword(password)}), {headers: this.headers})
    .toPromise()
    .then(apiResponse => apiResponse as ResponseUser)
    .catch(this.handleError);

  }

// -----------------------------------------------------------------------------------------------
//          USER API
// -----------------------------------------------------------------------------------------------

  getUsers(): Promise<User[]> {

    const URL = API_URL + 'users';

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data as User[])
        .catch(this.handleError);
  }


  getUsersObservable(): Observable<any> {
    return this.usersObservable.asObservable();
  }


  refreshUsersObservable(): any {
    this.getUsers()
    .then(users => this.usersObservable.next(users));
  }


  getUser(userId: number): Promise<User> {

    const URL = API_URL + 'user/' + userId;

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data[0] as User)
        .catch(this.handleError);
  }

  updateUser(user: User): Promise<ResponseData> {

    const URL = API_URL + 'user/' + user.id;

    return this.http
        .post<ResponseData>(URL, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);
  }

  createUser(user: User): Promise<ResponseData> {

    const URL = API_URL + 'user';

    return this.http
        .put<ResponseData>(URL, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);
  }


  deleteUser(id: number): Promise<ResponseData> {

    const URL = API_URL + 'user/' + id;

    return this.http
        .delete<ResponseData>(URL)
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);

  }


  resetPassword(userId: number, newPassword: string): Promise<ResponseData> {

    const URL = API_URL + 'resetpassword';

    return this.http
        .post<ResponseData>(URL, JSON.stringify({'password': this.hashUserPassword(newPassword), 'id': userId}), {headers: this.headers})
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);
  }


  createUserGroup(userId: number, groupId: number): Promise<ResponseData> {

    const URL = API_URL + 'usergroup';

    return this.http
        .put<ResponseData>(URL, JSON.stringify({ 'user_id': userId, 'group_id': groupId }), {headers: this.headers})
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);
  }


  deleteUserGroup(userId: number, groupId: number): Promise<ResponseData> {

    const URL = API_URL + 'usergroup/' + userId + '/' + groupId;

    return this.http
        .delete<ResponseData>(URL)
        .toPromise()
        .then(apiResponse => apiResponse as ResponseData)
        .catch(this.handleError);

  }


  getGroupUsers(groupId: number): Promise<User[]> {

    const URL = API_URL + 'groupusers/' + groupId;

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data as User[])
        .catch(this.handleError);
  }

  getGroupUsersObservable(): Observable<any> {
    return this.groupUsersObservable.asObservable();
  }


  refreshGroupUsersObservable(groupId: number): any {
    this.getGroupUsers(groupId)
    .then(users => this.groupUsersObservable.next(users));
  }


  getNotGroupUsers(groupId: number): Promise<User[]> {

    const URL = API_URL + 'notgroupusers/' + groupId;

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data as User[])
        .catch(this.handleError);
  }


  getNotGroupUsersObservable(): Observable<any> {
    return this.notGroupUsersObservable.asObservable();
  }


  refreshNotGroupUsersObservable(groupId: number): any {
    this.getNotGroupUsers(groupId)
    .then(users => this.notGroupUsersObservable.next(users));
  }





// -----------------------------------------------------------------------------------------------
//          GROUP API
// -----------------------------------------------------------------------------------------------

getGroups(): Promise<Group[]> {

  const URL = API_URL + 'groups';

  return this.http.get<ResponseGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Group[])
      .catch(this.handleError);
}


getGroupsObservable(): Observable<any> {
  return this.groupsObservable.asObservable();
}


refreshGroupsObservable(): any {
  this.getGroups()
  .then(groups => this.groupsObservable.next(groups));
}


createGroup(group: Group): Promise<ResponseData> {

  const URL = API_URL + 'group';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


getGroup(groupId: number): Promise<Group> {

  const URL = API_URL + 'group/' + groupId;

  return this.http.get<ResponseGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as Group)
      .catch(this.handleError);
}


deleteGroup(id: number): Promise<ResponseData> {

  const URL = API_URL + 'group/' + id;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}


updateGroup(group: Group): Promise<ResponseData> {

  const URL = API_URL + 'group/' + group.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


getUserGroups(userId: number): Promise<Group[]> {

  const URL = API_URL + 'usergroups/' + userId;

  return this.http.get<ResponseGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Group[])
      .catch(this.handleError);
}


getUserGroupsObservable(): Observable<any> {
  return this.userGroupsObservable.asObservable();
}


refreshUserGroupsObservable(userId: number): any {
  this.getUserGroups(userId)
  .then(groups => this.userGroupsObservable.next(groups));
}


getNotUserGroups(userId: number): Promise<Group[]> {

  const URL = API_URL + 'notusergroups/' + userId;

  return this.http.get<ResponseGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Group[])
      .catch(this.handleError);
}


getNotUserGroupsObservable(): Observable<any> {
  return this.notUserGroupsObservable.asObservable();
}


refreshNotUserGroupsObservable(userId: number): any {
  this.getNotUserGroups(userId)
  .then(groups => this.notUserGroupsObservable.next(groups));
}



// -----------------------------------------------------------------------------------------------
//          PATH API
// -----------------------------------------------------------------------------------------------

getPaths(): Promise<Path[]> {

  const URL = API_URL + 'paths';

  return this.http.get<ResponsePath>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Path[])
      .catch(this.handleError);
}


getPathsObservable(): Observable<any> {
  return this.pathsObservable.asObservable();
}


refreshPathsObservable(): any {
  this.getPaths()
  .then(paths => this.pathsObservable.next(paths));
}


createPath(path: Path): Promise<ResponseData> {

  const URL = API_URL + 'path';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(path), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


getPath(pathId: number): Promise<Path> {

  const URL = API_URL + 'path/' + pathId;

  return this.http.get<ResponsePath>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as Path)
      .catch(this.handleError);
}


updatePath(path: Path): Promise<ResponseData> {

  const URL = API_URL + 'path/' + path.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(path), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


deletePath(id: number): Promise<ResponseData> {

  const URL = API_URL + 'path/' + id;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}


getPathsToSend(currentPathId): Promise<Path[]> {

  const URL = API_URL + 'pathstosend/' + currentPathId;

  return this.http.get<ResponsePath>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Path[])
      .catch(this.handleError);
}

// -----------------------------------------------------------------------------------------------
//          PATHSTEPS API
// -----------------------------------------------------------------------------------------------

getPathSteps(pathId: number): Promise<PathStep[]> {

  const URL = API_URL + 'pathsteps/' + pathId;

  return this.http.get<ResponsePathStep>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as PathStep[])
      .catch(this.handleError);
}


getPathStepsObservable(): Observable<any> {
  return this.pathStepsObservable.asObservable();
}


refreshPathStepsObservable(pathId: number): any {
  this.getPathSteps(pathId)
  .then(pathSteps => this.pathStepsObservable.next(pathSteps));
}


createPathStep(pathStep: PathStep): Promise<ResponseData> {

  const URL = API_URL + 'pathstep';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(pathStep), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


getPathStep(pathStepId: number): Promise<PathStep> {

  const URL = API_URL + 'pathstep/' + pathStepId;

  return this.http.get<ResponsePathStep>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as PathStep)
      .catch(this.handleError);
}


updatePathStep(pathStep: PathStep): Promise<ResponseData> {

  const URL = API_URL + 'pathstep/' + pathStep.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(pathStep), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


deletePathStep(pathstepId: number): Promise<ResponseData> {

  const URL = API_URL + 'pathstep/' + pathstepId;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}



getPathStepsCount(pathId: number): Promise<number> {

  const URL = API_URL + 'pathstepscount/' + pathId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0][0] as number)
      .catch(this.handleError);
}

getNextPathStepId(pathId: number, pathstepId: number): Promise<Number> {

  const URL = API_URL + 'nextpathstep/' + pathId + '/' + pathstepId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => {
        if (typeof apiResponse.data[0] !== 'undefined') { return apiResponse.data[0][0]; } else { return pathstepId; }})
      .catch(this.handleError);
}

getPrevPathStepId(pathId: number, pathstepId: number): Promise<Number> {

  const URL = API_URL + 'prevpathstep/' + pathId + '/' + pathstepId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => {
        if (typeof apiResponse.data[0] !== 'undefined') { return apiResponse.data[0][0]; } else { return pathstepId; }})
      .catch(this.handleError);
}

// -----------------------------------------------------------------------------------------------
//          PATHSTEPS GROUPS API
// -----------------------------------------------------------------------------------------------


getPathStepGroups(pathId: number): Promise<PathStepGroup[]> {

  const URL = API_URL + 'pathstepgroups/' + pathId;

  return this.http.get<ResponsePathStepGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as PathStepGroup[])
      .catch(this.handleError);
}


getPathStepGroupsObservable(): Observable<any> {
  return this.pathStepGroupsObservable.asObservable();
}


refreshPathStepGroupsObservable(pathId: number): any {
  this.getPathStepGroups(pathId)
  .then(pathStepGroups => this.pathStepGroupsObservable.next(pathStepGroups));
}



getNotPathStepGroups(pathstepId: number): Promise<Group[]> {

  const URL = API_URL + 'notpathstepgroups/' + pathstepId;

  return this.http.get<ResponseGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Group[])
      .catch(this.handleError);
}


getNotPathStepGroupsObservable(): Observable<any> {
  return this.notPathStepGroupsObservable.asObservable();
}


refreshNotPathStepGroupsObservable(pathstepId: number): any {
  this.getNotPathStepGroups(pathstepId)
  .then(groups => this.notPathStepGroupsObservable.next(groups));
}

createPathStepGroup(pathStepId: number, pathId: number, groupId: number): Promise<ResponseData> {

  const URL = API_URL + 'pathstepgroup';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(
        { 'pathstep_id': pathStepId, 'path_id': pathId, 'group_id': groupId }), {headers: this.headers}
      )
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}

deletePathStepGroup(pathstepId: number, groupId: number): Promise<ResponseData> {

  const URL = API_URL + 'pathstepgroup/' + pathstepId + '/' + groupId;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}




getEntryPathStepGroups(): Promise<EntryPathStepGroup[]> {

  const URL = API_URL + 'entrypathstepgroups/';

  return this.http.get<ResponseEntryPathStepGroup>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as EntryPathStepGroup[])
      .catch(this.handleError);
}


// -----------------------------------------------------------------------------------------------
//          ACTION API
// -----------------------------------------------------------------------------------------------


getActions(): Promise<Action[]> {

  const URL = API_URL + 'actions';

  return this.http.get<ResponseAction>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Action[])
      .catch(this.handleError);
}


getActionsObservable(): Observable<any> {
  return this.actionsObservable.asObservable();
}


refreshActionsObservable(): any {
  this.getActions()
  .then(actions => this.actionsObservable.next(actions));
}


createAction(action: Action): Promise<ResponseData> {

  const URL = API_URL + 'action';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(action), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


getAction(actionId: number): Promise<Action> {

  const URL = API_URL + 'action/' + actionId;

  return this.http.get<ResponseAction>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as Action)
      .catch(this.handleError);
}


deleteAction(actionId: number): Promise<ResponseData> {

  const URL = API_URL + 'action/' + actionId;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}


updateAction(action: Action): Promise<ResponseData> {

  const URL = API_URL + 'action/' + action.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(action), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}




// -----------------------------------------------------------------------------------------------
//          AUTHOR API
// -----------------------------------------------------------------------------------------------

getAuthors(): Promise<Author[]> {

  const URL = API_URL + 'authors';

  return this.http.get<ResponseAuthor>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Author[])
      .catch(this.handleError);
}


getAuthorsObservable(): Observable<any> {
  return this.authorsObservable.asObservable();
}


refreshAuthorsObservable(): any {
  this.getAuthors()
  .then(authors => this.authorsObservable.next(authors));
}


getAuthor(authorId: number): Promise<Author> {

  const URL = API_URL + 'author/' + authorId;

  return this.http.get<ResponseAuthor>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as Author)
      .catch(this.handleError);
}

updateAuthor(author: Author): Promise<ResponseData> {

  const URL = API_URL + 'author/' + author.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(author), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}

createAuthor(author: Author): Promise<ResponseData> {

  const URL = API_URL + 'author';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(author), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


deleteAuthor(id: number): Promise<ResponseData> {

  const URL = API_URL + 'author/' + id;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}





// -----------------------------------------------------------------------------------------------
//          DOCUMENTS API
// -----------------------------------------------------------------------------------------------

getDocument(documentId: number): Promise<Document> {

  const URL = API_URL + 'document/' + documentId;

  return this.http.get<ResponseDocument>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0] as Document)
      .catch(this.handleError);
}

updateDocument(document: Document): Promise<ResponseData> {

  const URL = API_URL + 'document/' + document.id;

  return this.http
      .post<ResponseData>(URL, JSON.stringify(document), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}

createDocument(document: Document): Promise<ResponseData> {

  const URL = API_URL + 'document';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(document), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


deleteDocument(documentId: number): Promise<ResponseData> {

  const URL = API_URL + 'document/' + documentId;

  return this.http
      .delete<ResponseData>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);

}




getDocumentsNotReady(userId: number): Promise<Document[]> {

  const URL = API_URL + 'documentsnotready/' + userId;

  return this.http.get<ResponseDocument>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Document[])
      .catch(this.handleError);
}


getDocumentsNotReadyObservable(): Observable<any> {
  return this.documentsNotReadyObservable.asObservable();
}


refreshDocumentsNotReadyObservable(userId: number): any {
  this.getDocumentsNotReady(userId)
  .then(documents => this.documentsNotReadyObservable.next(documents));
}




getDocumentsNotReadyCount(userId: number): Promise<number> {

  const URL = API_URL + 'documentsnotreadycount/' + userId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0][0] as Number)
      .catch(this.handleError);
}

getDocumentsNotReadyCountObservable(): Observable<any> {
  return this.documentsNotReadyCountObservable.asObservable();
}

refreshDocumentsNotReadyCountObservable(userId: number): any {
  this.getDocumentsNotReadyCount(userId)
  .then(count => this.documentsNotReadyCountObservable.next(count));
}




getDocumentsNotAssigned(userId: number): Promise<Document[]> {

  const URL = API_URL + 'documentsnotassigned/' + userId;

  return this.http.get<ResponseDocument>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Document[])
      .catch(this.handleError);
}


getDocumentsNotAssignedObservable(): Observable<any> {
  return this.documentsNotAssignedObservable.asObservable();
}


refreshDocumentsNotAssignedObservable(userId: number): any {
  this.getDocumentsNotAssigned(userId)
  .then(documents => this.documentsNotAssignedObservable.next(documents));
}




getDocumentsNotAssignedCount(userId: number): Promise<number> {

  const URL = API_URL + 'documentsnotassignedcount/' + userId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0][0] as Number)
      .catch(this.handleError);
}

getDocumentsNotAssignedCountObservable(): Observable<any> {
  return this.documentsNotAssignedCountObservable.asObservable();
}

refreshDocumentsNotAssignedCountObservable(userId: number): any {
  this.getDocumentsNotAssignedCount(userId)
  .then(count => this.documentsNotAssignedCountObservable.next(count));
}




getDocumentsAssigned(userId: number): Promise<Document[]> {

  const URL = API_URL + 'documentsassigned/' + userId;

  return this.http.get<ResponseDocument>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as Document[])
      .catch(this.handleError);
}


getDocumentsAssignedObservable(): Observable<any> {
  return this.documentsAssignedObservable.asObservable();
}


refreshDocumentsAssignedObservable(userId: number): any {
  this.getDocumentsAssigned(userId)
  .then(documents => this.documentsAssignedObservable.next(documents));
}




getDocumentsAssignedCount(userId: number): Promise<number> {

  const URL = API_URL + 'documentsassignedcount/' + userId;

  return this.http.get<ResponseNumber>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data[0][0] as Number)
      .catch(this.handleError);
}

getDocumentsAssignedCountObservable(): Observable<any> {
  return this.documentsAssignedCountObservable.asObservable();
}

refreshDocumentsAssignedCountObservable(userId: number): any {
  this.getDocumentsAssignedCount(userId)
  .then(count => this.documentsAssignedCountObservable.next(count));
}




getDocumentsClosed(filter: FormModelDocumentSearch): Promise<Document[]> {

  const URL = API_URL + 'documentsclosed';

  // we use POST instead of GET because we can only pass 2 parameters using GET query string (3 including action)
  return this.http
      .post<ResponseDocument>(URL, JSON.stringify(filter), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse.data as Document[])
      .catch(this.handleError);
}


getDocumentsClosedObservable(): Observable<any> {
  return this.documentsClosedObservable.asObservable();
}


refreshDocumentsClosedObservable(filter: FormModelDocumentSearch): any {
  this.getDocumentsClosed(filter)
  .then(documents => this.documentsClosedObservable.next(documents));
}






makeDocumentReady(document: Document): Promise<ResponseData> {

  const URL = API_URL + 'makedocumentready';

  return new Promise((resolve, reject) => {
    this.getNextPathStepId(document.path_id, document.pathstep_id)
      .then( nextPathStepId => resolve(nextPathStepId) )
      .catch(this.handleError);
    })
    .then( nextPathStepId =>
      this.http.post<ResponseData>(URL, {'ready': 'TRUE', 'id': document.id, 'pathstep_id': nextPathStepId }, {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError)
    )
    .catch(this.handleError);

}

makeDocumentAssigned(documentId: number, userId: number): Promise<ResponseData> {

  const URL = API_URL + 'makedocumentassigned';

  return this.http
      .post<ResponseData>(URL, {'id': documentId, 'assigned_user': userId }, {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


makeDocumentNotAssigned(documentId: number): Promise<ResponseData> {

  const URL = API_URL + 'makedocumentnotassigned';

  return this.http
      .post<ResponseData>(URL, {'id': documentId }, {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}



doDocumentActionNext(document: Document, pathStepAction: FormModelPathStepAction): Promise<ResponseData> {

  const URL = API_URL + 'actionnext';

  return new Promise((resolve, reject) => {
    this.getNextPathStepId(document.path_id, document.pathstep_id)
    .then( nextPathStepId => {
        this.http.post<ResponseData>(URL, {
          'id': document.id,
          'pathstep_id': nextPathStepId,
          'message': pathStepAction.message
        }, {headers: this.headers})
        .toPromise()
        .then(apiResponse => resolve(apiResponse))
        .catch(this.handleError);
    })
    .catch(this.handleError);
  })
  .then(apiResponse => apiResponse as ResponseData)
  .catch(this.handleError);
}



doDocumentActionArchive(document: Document, pathStepAction: FormModelPathStepAction): Promise<ResponseData> {

  const URL = API_URL + 'actionarchive';

  return new Promise((resolve, reject) => {
    this.getNextPathStepId(document.path_id, document.pathstep_id)
    .then( nextPathStepId => {
        this.http.post<ResponseData>(URL, {
          'id': document.id,
          'pathstep_id': nextPathStepId,
          'message': pathStepAction.message,
          'closed': 'TRUE'
        }, {headers: this.headers})
        .toPromise()
        .then(apiResponse => resolve(apiResponse))
        .catch(this.handleError);
    })
    .catch(this.handleError);
  })
  .then(apiResponse => apiResponse as ResponseData)
  .catch(this.handleError);
}



doDocumentActionCancel(document: Document, pathStepAction: FormModelPathStepAction): Promise<ResponseData> {

  const URL = API_URL + 'actioncancel';

  return new Promise((resolve, reject) => {
    this.getPrevPathStepId(document.path_id, document.pathstep_id)
    .then( prevPathStepId => {
        this.http.post<ResponseData>(URL, {
          'id': document.id,
          'pathstep_id': prevPathStepId,
          'message': pathStepAction.message
        }, {headers: this.headers})
        .toPromise()
        .then(apiResponse => resolve(apiResponse))
        .catch(this.handleError);
    })
    .catch(this.handleError);
  })
  .then(apiResponse => apiResponse as ResponseData)
  .catch(this.handleError);
}



doDocumentActionChange(document: Document, pathStepAction: FormModelPathStepAction): Promise<ResponseData> {

  const URL = API_URL + 'actionchange';

  return this.http
      .post<ResponseData>(URL, {
        'id': document.id,
        'path_id': pathStepAction.sendToPath,
        'message': pathStepAction.message
      }, {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}


// -----------------------------------------------------------------------------------------------
//          DOCUMENTS_HISTORY API
// -----------------------------------------------------------------------------------------------

getDocumentHistory(documentId: number): Promise<DocumentHistory[]> {

  const URL = API_URL + 'documenthistory/' + documentId;

  return this.http.get<ResponseDocumentHistory>(URL)
      .toPromise()
      .then(apiResponse => apiResponse.data as DocumentHistory[])
      .catch(this.handleError);
}


createDocumentHistoryEntry(documentHistoryEntry: DocumentHistory): Promise<ResponseData> {
  console.log('zaczynamy createDocumentHistoryEntry');
  console.log(documentHistoryEntry);
  const URL = API_URL + 'documenthistoryentry';

  return this.http
      .put<ResponseData>(URL, JSON.stringify(documentHistoryEntry), {headers: this.headers})
      .toPromise()
      .then(apiResponse => apiResponse as ResponseData)
      .catch(this.handleError);
}

}
