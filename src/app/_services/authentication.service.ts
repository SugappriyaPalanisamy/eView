import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private userLoggedIn = new Subject<boolean>();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.userLoggedIn.next(false);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    login(username: string, password: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/Auth?userName=`+username+`&password=`+password+`&clientId=eViewPortal`)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response['token']) {
                    // store user details and jwt token in session storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                    this.userLoggedIn.next(true);
                }

                return response;
            }));
    }
    logout() {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.userLoggedIn.next(false);
        this.currentUserSubject.next(null);
    }
    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }
}