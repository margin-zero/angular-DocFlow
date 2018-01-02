import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// DATATYPES
import { User } from '../../datatypes/user';
import { Role } from '../../datatypes/role';
import { Path } from '../../datatypes/path';

import { ResponseUser } from '../../datatypes/response-classes';


// CONSTANTS
import { API_URL } from '../../constants/global-constants';


@Injectable()
export class BackendApiService {

  user: User;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('UWAGA !!! An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // function used for 'hashing' passwords
  private hashUserPassword(password): string {
    return password;
  }


  login(username: string, password: string): Promise<User> {

    const URL = API_URL + 'login/' + username + '/' + this.hashUserPassword(password);

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data[0] as User)
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

getUser(userId: number): Promise<User> {

    const URL = API_URL + 'user/' + userId;

    return this.http.get<ResponseUser>(URL)
        .toPromise()
        .then(apiResponse => apiResponse.data[0] as User)
        .catch(this.handleError);
  }



// -----------------------------------------------------------------------------------------------
//          ROLE API
// -----------------------------------------------------------------------------------------------

getRoles(): Promise<Role[]> {

  const URL = API_URL + 'roles';

  return this.http.get<Role[]>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as Role[])
      .catch(this.handleError);
}


// -----------------------------------------------------------------------------------------------
//          PATH API
// -----------------------------------------------------------------------------------------------

getPaths(): Promise<Path[]> {

  const URL = API_URL + 'paths';

  return this.http.get<Path[]>(URL)
      .toPromise()
      .then(apiResponse => apiResponse as Path[])
      .catch(this.handleError);
}


}
