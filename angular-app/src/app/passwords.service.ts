import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Password } from './password.model';

@Injectable({
  providedIn: 'root'
})

export class PasswordsService {
  private passwords: Password[] = [];
  private passwordsUpdated = new Subject<Password[]>();

  constructor(private http: HttpClient) {}

  getPasswords() {
    this.http
      .get<{ message: string; passwords: any }>(
        'http://localhost:3000/api/passwords'
      )
      .pipe(map((postData) => {
        return postData.passwords.map(post => {
          console.log(post);
          return {
            website: post.website,
            description: post.description,
            URL: post.URL,
            username: post.username,
            password: post.password,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPasswords => {
        this.passwords = transformedPasswords;
        this.passwordsUpdated.next([...this.passwords]);
      });
  }

  getPostUpdateListener() {
    return this.passwordsUpdated.asObservable();
  }

  addPassword(website: string, description: string, URL: string, username: string, password: string) {
    const post: Password = {
      id: '',
      website: website,
      description: description,
      URL : URL ,
      username : username,
      password : password };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/passwords', post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.passwords.push(post);
        this.passwordsUpdated.next([...this.passwords]);
      });
  }

  updatePassword(iD: string, website: string, description: string, URL: string, username: string, password: string) {
    const post: Password = {
      id: iD,
      website: website,
      description: description,
      URL : URL ,
      username : username,
      password : password };
    this.http
      .put<{ message: string, postId: string }>('http://localhost:3000/api/passwords', post)
      .subscribe(responseData => {
        this.getPasswords();
      });
  }

  deletePassword(postId: string) {
    console.log(postId);
    this.http.delete('http://localhost:3000/api/passwords/' + postId)
      .subscribe(() => {
        const updatedPosts = this.passwords.filter(post => post.id !== postId);
        this.passwords = updatedPosts;
        this.passwordsUpdated.next([...this.passwords]);
      });
  }
}

