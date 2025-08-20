import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  template: `
    <div class="container-fluid px-4 py-6">
      <!-- Hero Header Section -->
      <div class="row mb-8">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <div class="hero-content">
              <h1 class="display-4 text-gradient mb-3 fw-bold">
                <i class="fas fa-graduation-cap me-3"></i>
                Student Directory
              </h1>
              <p class="lead text-secondary mb-0">
                Manage and view all registered students with our modern interface
              </p>
            </div>
            <button class="btn btn-primary btn-lg hover-lift" routerLink="/students/add">
              <i class="fas fa-plus me-2"></i>
              Add New Student
            </button>
          </div>
        </div>
      </div>

      <!-- Search and Filters Section -->
      <div class="row mb-6">
        <div class="col-12">
          <div class="card glass-effect">
            <div class="card-body p-5">
              <div class="row g-4">
                <div class="col-lg-6 mb-3">
                  <div class="search-box">
                    <i class="fas fa-search search-icon"></i>
                    <input 
                      type="text" 
                      class="form-control form-control-lg" 
                      placeholder="Search students by name, email, or course..."
                      [(ngModel)]="searchTerm"
                      (input)="onSearchInput()"
                    >
                  </div>
                </div>
                <div class="col-lg-3 mb-3">
                  <select class="form-select form-select-lg" [(ngModel)]="statusFilter" (change)="loadStudents()">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                  </select>
                </div>
                <div class="col-lg-3 mb-3">
                  <select class="form-select form-select-lg" [(ngModel)]="sortBy" (change)="loadStudents()">
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="course">Sort by Course</option>
                    <option value="enrollmentDate">Sort by Enrollment Date</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="row">
        <div class="col-12">
          <app-loading-spinner message="Loading students..."></app-loading-spinner>
        </div>
      </div>

      <!-- Students Grid -->
      <div *ngIf="!loading && students.length > 0" class="row">
        <div class="col-12">
          <div class="row g-4">
            <div class="col-xl-4 col-lg-6 col-md-6" *ngFor="let student of students; let i = index">
              <div class="card student-card h-100 fade-in" 
                   [style.animation-delay]="(i * 0.1) + 's'"
                   (click)="editStudent(student._id!)">
                <div class="card-body p-5">
                  <div class="d-flex align-items-start mb-4">
                    <div class="student-avatar me-4">
                      {{ getInitials(student.name) }}
                    </div>
                    <div class="flex-grow-1">
                      <h5 class="card-title mb-2 fw-bold text-primary">{{ student.name }}</h5>
                      <p class="text-muted mb-1 small">
                        <i class="fas fa-envelope me-1"></i>
                        {{ student.email }}
                      </p>
                    </div>
                    <span class="status-badge" [class]="student.status || 'active'">
                      <i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i>
                      {{ student.status || 'active' }}
                    </span>
                  </div>
                  
                  <div class="student-details mb-4">
                    <div class="detail-item d-flex align-items-center mb-3">
                      <div class="detail-icon me-3">
                        <i class="fas fa-book text-primary"></i>
                      </div>
                      <div>
                        <div class="fw-semibold text-primary">{{ student.course }}</div>
                        <div class="text-muted small">Course</div>
                      </div>
                    </div>
                    
                    <div class="detail-item d-flex align-items-center mb-3" *ngIf="student.phone">
                      <div class="detail-icon me-3">
                        <i class="fas fa-phone text-primary"></i>
                      </div>
                      <div>
                        <div class="fw-medium">{{ student.phone }}</div>
                        <div class="text-muted small">Phone</div>
                      </div>
                    </div>
                    
                    <div class="detail-item d-flex align-items-center" *ngIf="student.enrollmentDate">
                      <div class="detail-icon me-3">
                        <i class="fas fa-calendar text-primary"></i>
                      </div>
                      <div>
                        <div class="fw-medium">{{ student.formattedEnrollmentDate || formatDate(student.enrollmentDate) }}</div>
                        <div class="text-muted small">Enrolled</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="card-actions d-flex justify-content-end gap-2">
                    <button 
                      class="btn btn-outline btn-sm" 
                      (click)="editStudent(student._id!); $event.stopPropagation()"
                    >
                      <i class="fas fa-edit me-1"></i>
                      Edit
                    </button>
                    <button 
                      class="btn btn-danger btn-sm" 
                      (click)="deleteStudent(student); $event.stopPropagation()"
                    >
                      <i class="fas fa-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && students.length === 0" class="row">
        <div class="col-12">
          <div class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3 class="mb-3 fw-bold">No Students Found</h3>
            <p class="mb-5 text-secondary">Get started by adding your first student to the system.</p>
            <button class="btn btn-primary btn-lg" routerLink="/students/add">
              <i class="fas fa-plus me-2"></i>
              Add First Student
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Dashboard -->
      <div *ngIf="!loading && students.length > 0" class="row mt-8">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title mb-0">
                <i class="fas fa-chart-bar me-2 text-primary"></i>
                Quick Statistics
              </h4>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card">
                    <div class="stats-number">{{ students.length }}</div>
                    <div class="stats-label">Total Students</div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card">
                    <div class="stats-number text-success">{{ getActiveCount() }}</div>
                    <div class="stats-label">Active Students</div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card">
                    <div class="stats-number text-warning">{{ getInactiveCount() }}</div>
                    <div class="stats-label">Inactive Students</div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card">
                    <div class="stats-number text-info">{{ getGraduatedCount() }}</div>
                    <div class="stats-label">Graduated Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <app-confirmation-modal
      title="Delete Student"
      [message]="'Are you sure you want to delete ' + (studentToDelete?.name || 'this student') + '? This action cannot be undone.'"
      confirmText="Delete Student"
      (confirmed)="confirmDelete()"
    ></app-confirmation-modal>
  `,
  styles: [`
    .hero-content h1 {
      font-size: 3rem;
      line-height: 1.2;
    }
    
    .detail-icon {
      width: 40px;
      height: 40px;
      background: var(--primary-50);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-600);
    }
    
    .card-actions {
      border-top: 1px solid var(--border-light);
      padding-top: var(--space-4);
      margin-top: var(--space-4);
    }
    
    .mb-8 { margin-bottom: var(--space-8); }
    .mt-8 { margin-top: var(--space-8); }
    .mb-6 { margin-bottom: var(--space-6); }
    .mb-4 { margin-bottom: var(--space-4); }
    .mb-3 { margin-bottom: var(--space-3); }
    .mb-2 { margin-bottom: var(--space-2); }
    .mb-1 { margin-bottom: var(--space-1); }
    .mb-0 { margin-bottom: 0; }
    
    .me-4 { margin-right: var(--space-4); }
    .me-3 { margin-right: var(--space-3); }
    .me-2 { margin-right: var(--space-2); }
    .me-1 { margin-right: var(--space-1); }
    
    .p-5 { padding: var(--space-5); }
    
    .gap-2 { gap: var(--space-2); }
    
    .g-4 { gap: var(--space-4); }
    
    .fw-bold { font-weight: var(--font-weight-bold); }
    .fw-semibold { font-weight: var(--font-weight-semibold); }
    .fw-medium { font-weight: var(--font-weight-medium); }
    
    .text-primary { color: var(--primary-600) !important; }
    .text-secondary { color: var(--text-secondary) !important; }
    .text-muted { color: var(--text-muted) !important; }
    .text-success { color: var(--success-600) !important; }
    .text-warning { color: var(--warning-600) !important; }
    .text-info { color: var(--info-600) !important; }
    
    .lead {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-normal);
    }
    
    .display-4 {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }
    
    .small {
      font-size: var(--font-size-sm);
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .hero-content {
        text-align: center;
        margin-bottom: var(--space-6);
      }
      
      .d-flex.justify-content-between {
        flex-direction: column;
        gap: var(--space-4);
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = '';
  sortBy = 'name';
  studentToDelete: Student | null = null;
  private searchSubject = new Subject<string>();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadStudents();
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    
    const filters: any = {
      sort: this.sortBy,
      order: 'asc'
    };

    if (this.searchTerm.trim()) {
      filters.search = this.searchTerm.trim();
    }

    if (this.statusFilter) {
      filters.status = this.statusFilter;
    }

    this.studentService.getStudents(filters).subscribe({
      next: (response) => {
        this.students = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
      }
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  editStudent(id: string): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(student: Student): void {
    this.studentToDelete = student;
  }

  confirmDelete(): void {
    if (!this.studentToDelete?._id) return;

    this.studentService.deleteStudent(this.studentToDelete._id).subscribe({
      next: () => {
        this.loadStudents();
        this.studentToDelete = null;
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getActiveCount(): number {
    return this.students.filter(s => s.status === 'active').length;
  }

  getInactiveCount(): number {
    return this.students.filter(s => s.status === 'inactive').length;
  }

  getGraduatedCount(): number {
    return this.students.filter(s => s.status === 'graduated').length;
  }
}
