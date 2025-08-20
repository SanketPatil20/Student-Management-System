import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  template: `
    <div class="container-fluid px-4 py-6">
      <div class="form-container">
        <!-- Header Section -->
        <div class="row mb-6">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <div class="hero-content">
                <h1 class="display-4 text-gradient mb-3 fw-bold">
                  <i class="fas fa-user-graduate me-3"></i>
                  {{ isEditMode ? 'Edit Student' : 'Add New Student' }}
                </h1>
                <p class="lead text-secondary mb-0">
                  {{ isEditMode ? 'Update student information and details' : 'Create a new student profile with comprehensive information' }}
                </p>
              </div>
              <button class="btn btn-secondary btn-lg hover-lift" routerLink="/students">
                <i class="fas fa-arrow-left me-2"></i>
                Back to List
              </button>
            </div>
          </div>
        </div>

        <!-- Form Card -->
        <div class="card slide-up">
          <div class="card-body p-6">
            <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
              
              <!-- Personal Information Section -->
              <div class="form-section mb-6">
                <div class="section-header mb-4">
                  <h3 class="section-title">
                    <i class="fas fa-user me-2 text-primary"></i>
                    Personal Information
                  </h3>
                  <p class="section-description text-muted">
                    Basic details about the student
                  </p>
                </div>
                
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name" class="form-label">
                        <i class="fas fa-user me-1"></i>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        class="form-control" 
                        formControlName="name"
                        placeholder="Enter student's full name"
                        [class.is-invalid]="isFieldInvalid('name')"
                      >
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('name')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please enter a valid name (minimum 2 characters)
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email" class="form-label">
                        <i class="fas fa-envelope me-1"></i>
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        class="form-control" 
                        formControlName="email"
                        placeholder="Enter student's email address"
                        [class.is-invalid]="isFieldInvalid('email')"
                      >
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please enter a valid email address
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Academic Information Section -->
              <div class="form-section mb-6">
                <div class="section-header mb-4">
                  <h3 class="section-title">
                    <i class="fas fa-graduation-cap me-2 text-primary"></i>
                    Academic Information
                  </h3>
                  <p class="section-description text-muted">
                    Course and enrollment details
                  </p>
                </div>
                
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="course" class="form-label">
                        <i class="fas fa-book me-1"></i>
                        Course *
                      </label>
                      <input 
                        type="text" 
                        id="course"
                        class="form-control" 
                        formControlName="course"
                        placeholder="Enter student's course"
                        [class.is-invalid]="isFieldInvalid('course')"
                      >
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('course')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please enter a valid course name
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="status" class="form-label">
                        <i class="fas fa-toggle-on me-1"></i>
                        Status
                      </label>
                      <select 
                        id="status"
                        class="form-select" 
                        formControlName="status"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Information Section -->
              <div class="form-section mb-6">
                <div class="section-header mb-4">
                  <h3 class="section-title">
                    <i class="fas fa-address-book me-2 text-primary"></i>
                    Contact Information
                  </h3>
                  <p class="section-description text-muted">
                    Additional contact details (optional)
                  </p>
                </div>
                
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone" class="form-label">
                        <i class="fas fa-phone me-1"></i>
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        class="form-control" 
                        formControlName="phone"
                        placeholder="Enter phone number"
                        [class.is-invalid]="isFieldInvalid('phone')"
                      >
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('phone')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please enter a valid phone number
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="enrollmentDate" class="form-label">
                        <i class="fas fa-calendar me-1"></i>
                        Enrollment Date
                      </label>
                      <input 
                        type="date" 
                        id="enrollmentDate"
                        class="form-control" 
                        formControlName="enrollmentDate"
                        [class.is-invalid]="isFieldInvalid('enrollmentDate')"
                      >
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('enrollmentDate')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please select a valid enrollment date
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="address" class="form-label">
                        <i class="fas fa-map-marker-alt me-1"></i>
                        Address
                      </label>
                      <textarea 
                        id="address"
                        class="form-control" 
                        formControlName="address"
                        rows="3"
                        placeholder="Enter student's address"
                        [class.is-invalid]="isFieldInvalid('address')"
                      ></textarea>
                      <div class="invalid-feedback" *ngIf="isFieldInvalid('address')">
                        <i class="fas fa-exclamation-triangle me-1"></i>
                        Please enter a valid address
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <div class="d-flex justify-content-between align-items-center">
                  <button 
                    type="button" 
                    class="btn btn-outline btn-lg"
                    (click)="resetForm()"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset Form
                  </button>
                  
                  <div class="d-flex gap-3">
                    <button 
                      type="button" 
                      class="btn btn-secondary btn-lg"
                      routerLink="/students"
                    >
                      <i class="fas fa-times me-2"></i>
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      [disabled]="studentForm.invalid || loading"
                    >
                      <i class="fas fa-spinner fa-spin me-2" *ngIf="loading"></i>
                      <i class="fas fa-save me-2" *ngIf="!loading"></i>
                      {{ isEditMode ? 'Update Student' : 'Add Student' }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-content h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }
    
    .form-section {
      border-bottom: 1px solid var(--border-light);
      padding-bottom: var(--space-6);
    }
    
    .form-section:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .section-header {
      background: var(--bg-tertiary);
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--primary-500);
    }
    
    .section-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }
    
    .section-description {
      font-size: var(--font-size-sm);
      margin-bottom: 0;
    }
    
    .form-group {
      margin-bottom: 0;
    }
    
    .form-label {
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }
    
    .form-control, .form-select {
      border: 2px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
      font-size: var(--font-size-base);
      transition: all var(--transition-normal);
      background: var(--bg-card);
    }
    
    .form-control:focus, .form-select:focus {
      border-color: var(--primary-400);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      background: var(--bg-primary);
    }
    
    .form-control.is-invalid, .form-select.is-invalid {
      border-color: var(--danger-400);
    }
    
    .form-control.is-invalid:focus, .form-select.is-invalid:focus {
      border-color: var(--danger-500);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .invalid-feedback {
      display: flex;
      align-items: center;
      font-size: var(--font-size-sm);
      color: var(--danger-600);
      margin-top: var(--space-1);
    }
    
    .form-actions {
      border-top: 1px solid var(--border-light);
      padding-top: var(--space-6);
      margin-top: var(--space-6);
    }
    
    .p-6 { padding: var(--space-6); }
    .mb-6 { margin-bottom: var(--space-6); }
    .mb-4 { margin-bottom: var(--space-4); }
    .mb-3 { margin-bottom: var(--space-3); }
    .mb-2 { margin-bottom: var(--space-2); }
    .mb-1 { margin-bottom: var(--space-1); }
    
    .me-3 { margin-right: var(--space-3); }
    .me-2 { margin-right: var(--space-2); }
    .me-1 { margin-right: var(--space-1); }
    
    .gap-3 { gap: var(--space-3); }
    .g-4 { gap: var(--space-4); }
    
    .fw-bold { font-weight: var(--font-weight-bold); }
    .fw-semibold { font-weight: var(--font-weight-semibold); }
    .fw-medium { font-weight: var(--font-weight-medium); }
    
    .text-primary { color: var(--primary-600) !important; }
    .text-secondary { color: var(--text-secondary) !important; }
    .text-muted { color: var(--text-muted) !important; }
    
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
      
      .form-actions .d-flex {
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .form-actions .d-flex .d-flex {
        flex-direction: column;
        width: 100%;
      }
      
      .form-actions .d-flex .d-flex .btn {
        width: 100%;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  loading = false;
  studentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      address: ['', [Validators.maxLength(500)]],
      enrollmentDate: [''],
      status: ['active']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      if (this.studentId) {
        this.isEditMode = true;
        this.loadStudent();
      }
    });
  }

  loadStudent(): void {
    if (!this.studentId) return;

    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (student) => {
        this.studentForm.patchValue({
          name: student.name,
          email: student.email,
          course: student.course,
          phone: student.phone || '',
          address: student.address || '',
          enrollmentDate: student.enrollmentDate ? this.formatDateForInput(student.enrollmentDate) : '',
          status: student.status || 'active'
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    const formData = this.studentForm.value;

    if (this.isEditMode && this.studentId) {
      this.studentService.updateStudent(this.studentId, formData).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error updating student:', error);
          this.loading = false;
        }
      });
    } else {
      this.studentService.createStudent(formData).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error creating student:', error);
          this.loading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.studentForm.reset({
      status: 'active'
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
