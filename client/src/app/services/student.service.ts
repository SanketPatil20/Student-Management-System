import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Student, StudentResponse, StudentsResponse, ApiResponse } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) { }

  // Get all students with optional filters
  getStudents(filters?: {
    search?: string;
    course?: string;
    status?: string;
    sort?: string;
    order?: string;
  }): Observable<StudentsResponse> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof typeof filters];
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<StudentsResponse>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get single student by ID
  getStudent(id: string): Observable<Student> {
    return this.http.get<StudentResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Create new student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<StudentResponse>(this.apiUrl, student)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Update existing student
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<StudentResponse>(`${this.apiUrl}/${id}`, student)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Delete student
  deleteStudent(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.error || error.error?.message || error.message || errorMessage;
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
