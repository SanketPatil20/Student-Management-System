import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title text-danger" id="confirmationModalLabel">
              <i class="fas fa-exclamation-triangle me-2"></i>
              {{ title }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <p class="text-muted mb-0">{{ message }}</p>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="fas fa-times me-1"></i>
              Cancel
            </button>
            <button type="button" class="btn btn-danger" (click)="confirm()" data-bs-dismiss="modal">
              <i class="fas fa-trash me-1"></i>
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-content {
      border-radius: var(--border-radius-lg);
    }
    
    .modal-header {
      padding: 1.5rem 1.5rem 0;
    }
    
    .modal-body {
      padding: 1rem 1.5rem;
    }
    
    .modal-footer {
      padding: 0 1.5rem 1.5rem;
    }
    
    .btn-close:focus {
      box-shadow: none;
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';
  @Output() confirmed = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }
}
