import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauth2Config = environment.oauth2;

  constructor(private http: HttpClient) {
  }

  public getAccessToken(code: string) {
    let params = new URLSearchParams();
    params.append('client_id', this.oauth2Config.keycloak.client_id);
    params.append('grant_type', this.oauth2Config.keycloak.grant_type);
    params.append('redirect_uri', this.oauth2Config.keycloak.redirect_uri);
    params.append('code', code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    this.http.post(this.oauth2Config.keycloak.auth_endpoint,
      params.toString(), {headers: headers}).subscribe({
      next: data => {
        console.log("Logged in successfully");
        // this.setSession(data);
      }, error: err => console.log("Authentication code flow error: " + JSON.stringify(err))
    })
  }

  public getWebinToken(username: string, password: string, callback: Function) {
    let body = {
      "authRealms": ["ENA"],
      "username": username,
      "password": password
    }
    this.http.post(environment.webin_api, body, { responseType: 'text' }).subscribe({
      next: data => {
        console.log("Logged in successfully");
        this.setSession(data);
        callback();
      }, error: err => console.log("Authentication error: " + JSON.stringify(err))
    })
  }

  private setSession(accessToken: string) {
    let expiresIn = new Date();
    expiresIn.setTime(expiresIn.getTime() + 2*60*60*1000);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_in', expiresIn.toString());
  }

  public getSessionToken(): string {
    return this.isLoggedIn() ? localStorage.getItem('access_token') : null;
  }

  public isLoggedIn(): boolean {
    let loggedIn = false;
    if (localStorage.getItem('access_token')) {
      let expiresAt = new Date(localStorage.getItem('expires_in'));
      let now = new Date();
      if (expiresAt > now) {
        loggedIn = true;
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
      }
    }
    return loggedIn;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
  }
}
