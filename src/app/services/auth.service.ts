import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'https://subscriptions-hang-hub-buying.trycloudflare.com/api/v1/auth';
  private TOKEN_KEY = 'access_token';
  private isBrowser: boolean;
  
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    // Verificamos si estamos en el navegador
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Solo intentamos leer localStorage si estamos en el navegador
    if (this.isBrowser) {
      const user = this.getUserFromStorage();
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      map(res => res.data),
      tap(data => {
        if (this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, data.token);
        }
        this.currentUserSubject.next(data.user);
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private getUserFromStorage(): any | null {
    if (!this.isBrowser) return null;
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? { rol: 'alumno' } : null;
  }
}