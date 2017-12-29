import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// DATATYPES
import { User } from '../../datatypes/user';

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

    return this.http.get<User>(URL)
        .toPromise()
        .then(apiResponse => apiResponse as User)
        .catch(this.handleError);
  }


}
