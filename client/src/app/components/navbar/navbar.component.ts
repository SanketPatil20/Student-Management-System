import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid px-4">
        <!-- Brand -->
        <a class="navbar-brand" routerLink="/students">
          <div class="brand-content">
            <i class="fas fa-graduation-cap brand-icon"></i>
            <span class="brand-text">StudentHub</span>
          </div>
        </a>

        <!-- Mobile Toggle -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="fas fa-bars"></i>
          </span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a 
                class="nav-link" 
                routerLink="/students" 
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
              >
                <i class="fas fa-users me-2"></i>
                Student Directory
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link" 
                routerLink="/students/add" 
                routerLinkActive="active"
              >
                <i class="fas fa-plus me-2"></i>
                Add Student
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-light);
      box-shadow: var(--shadow-sm);
      padding: var(--space-4) 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .brand-content {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .brand-icon {
      font-size: 2rem;
      background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .brand-text {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .navbar-brand {
      text-decoration: none;
      transition: all var(--transition-normal);
    }
    
    .navbar-brand:hover {
      transform: translateY(-1px);
    }
    
    .navbar-brand:hover .brand-icon,
    .navbar-brand:hover .brand-text {
      background: linear-gradient(135deg, var(--primary-700), var(--primary-800));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nav-link {
      font-weight: var(--font-weight-medium);
      color: var(--text-secondary) !important;
      padding: var(--space-2) var(--space-4) !important;
      border-radius: var(--radius-lg);
      transition: all var(--transition-normal);
      margin: 0 var(--space-1);
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
      transition: left var(--transition-slow);
    }
    
    .nav-link:hover::before {
      left: 100%;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary-600) !important;
      background: var(--primary-50);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }
    
    .navbar-toggler {
      border: none;
      padding: var(--space-2);
      border-radius: var(--radius-lg);
      transition: all var(--transition-normal);
    }
    
    .navbar-toggler:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .navbar-toggler-icon {
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
    }
    
    .navbar-toggler:hover .navbar-toggler-icon {
      color: var(--primary-600);
    }
    
    @media (max-width: 991.98px) {
      .navbar-nav {
        margin-top: var(--space-4);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-light);
      }
      
      .nav-link {
        margin: var(--space-1) 0;
        padding: var(--space-3) var(--space-4) !important;
      }
    }
  `]
})
export class NavbarComponent {}
