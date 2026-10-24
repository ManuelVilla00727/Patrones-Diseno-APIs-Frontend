import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Empleado, ApiResponse, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private readonly URL_API = 'https://subscriptions-hang-hub-buying.trycloudflare.com/api/v1/empleados';

  // 1. [Reto 3] BehaviorSubjects estrictamente privados para encapsular el estado
  private readonly _empleados$ = new BehaviorSubject<Empleado[]>([]);
  private readonly _selectedEmpleado$ = new BehaviorSubject<Empleado | null>(null);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  private readonly _error$ = new BehaviorSubject<string | null>(null);

  // 2. [Reto 3] Flujos exponenciales de solo lectura (Observable$)
  readonly empleados$: Observable<Empleado[]> = this._empleados$.asObservable();
  readonly selectedEmpleado$: Observable<Empleado | null> = this._selectedEmpleado$.asObservable();
  readonly loading$: Observable<boolean> = this._loading$.asObservable();
  readonly error$: Observable<string | null> = this._error$.asObservable();

  constructor(private readonly http: HttpClient) {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this._loading$.next(true);
    this.http.get<ApiResponse<Empleado[]>>(this.URL_API).pipe(
      map(res => res.data || []),
      tap(empleados => {
        // [Reto 3] Mutación inmutable de referencia
        this._empleados$.next([...empleados]);
      }),
      catchError(err => {
        const errorMsg = err.error?.error?.message || err.message || 'Error al conectar con el backend';
        this._error$.next(errorMsg);
        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    ).subscribe();
  }

  // [Reto 3] Mutación inmutable: [...current, new]
  crearEmpleado(empleado: CreateEmpleadoDTO): Observable<Empleado> {
    this._loading$.next(true);
    return this.http.post<ApiResponse<Empleado>>(this.URL_API, empleado).pipe(
      map(res => res.data as Empleado),
      tap(nuevo => {
        const current = this._empleados$.getValue();
        this._empleados$.next([...current, nuevo]);
        this._selectedEmpleado$.next(null);
      }),
      catchError(err => {
        const errorMsg = err.error?.error?.message || err.message || 'Error al crear empleado';
        this._error$.next(errorMsg);
        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  // [Reto 3] Mutación inmutable por mapeo de referencia (current.map)
  actualizarEmpleado(id: string, empleado: UpdateEmpleadoDTO): Observable<Empleado> {
    this._loading$.next(true);
    return this.http.put<ApiResponse<Empleado>>(`${this.URL_API}/${id}`, empleado).pipe(
      map(res => res.data as Empleado),
      tap(actualizado => {
        const current = this._empleados$.getValue();
        this._empleados$.next(
          current.map(emp => (emp._id === actualizado._id ? actualizado : emp))
        );
        this._selectedEmpleado$.next(null);
      }),
      catchError(err => {
        const errorMsg = err.error?.error?.message || err.message || 'Error al actualizar empleado';
        this._error$.next(errorMsg);
        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  // [Reto 3] Mutación inmutable por filtrado de referencia (current.filter)
  eliminarEmpleado(id: string): Observable<boolean> {
    this._loading$.next(true);
    return this.http.delete<ApiResponse<any>>(`${this.URL_API}/${id}`).pipe(
      map(res => res.success),
      tap(() => {
        const current = this._empleados$.getValue();
        this._empleados$.next(current.filter(emp => emp._id !== id));
        if (this._selectedEmpleado$.getValue()?._id === id) {
          this._selectedEmpleado$.next(null);
        }
      }),
      catchError(err => {
        const errorMsg = err.error?.error?.message || err.message || 'Error al eliminar empleado';
        this._error$.next(errorMsg);
        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  seleccionarEmpleado(emp: Empleado | null): void {
    this._selectedEmpleado$.next(emp ? { ...emp } : null);
  }
}