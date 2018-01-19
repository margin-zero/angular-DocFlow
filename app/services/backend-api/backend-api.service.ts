import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

// DATATYPES
import { User } from '../../datatypes/user';
import { Group } from '../../datatypes/group';
import { Path } from '../../datatypes/path';
import { PathStep } from '../../datatypes/pathstep';

import { ResponseUser, ResponseGroup, ResponsePath, ResponseData, ResponsePathStep } from '../../datatypes/response-classes';


// CONSTANTS
import { API_URL } from '../../constants/global-constants';



@Injectable()
export class BackendApiService implements OnInit {

  user: User;

  usersObservable = new Subject<any>();
  groupsObservable = new Subject<any>();
  pathsObservable = new Subject<any>();
  pathStepsObservable = new Subject<any>();

  userGroupsObservable = new Subject<any>();
  notUserGroupsObservable = new Subject<any>();

  groupUsersObservable = new Subject<any>();
  notGroupUsersObservable = new Subject<any>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.refreshUsersObservable();
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

}
