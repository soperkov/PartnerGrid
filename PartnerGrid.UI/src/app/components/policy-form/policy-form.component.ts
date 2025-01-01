import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { PolicyValidationRules } from 'src/app/validation/policy-validation-rules';
import { PolicyService } from 'src/app/services/policy.service';
import { Partner } from 'src/app/models/partner.model';
import $ from 'jquery';

@Component({
  selector: 'app-policy-form',
  standalone: false,
  
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {

  @Input() partnerId!: number | null;
  @Input() partnerFullName!: string | undefined;
  @Output() policySubmitted = new EventEmitter<void>();

  policyForm!: FormGroup;
  PolicyValidationRules = PolicyValidationRules;

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      policyNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(PolicyValidationRules.policyNumber.minlength),
          Validators.maxLength(PolicyValidationRules.policyNumber.maxlength)
        ]
      ],
      policyAmount: [
        '',
        [
          Validators.required,
          Validators.min(0.01) 
        ]
      ]
    });
  }

  openModal(): void {
    const modalElement = document.getElementById('policyFormModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('policyFormModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  submitPolicyForm(): void {
    if (this.policyForm.valid && this.partnerId) {
      const policy = {
        ...this.policyForm.value,
        partnerId: this.partnerId,
      };

      this.policyService.createPolicy(policy).subscribe({
        next: () => {
          this.policySubmitted.emit(); 
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating policy:', error);
        },
      });
    } else {
      console.error('Form is invalid or partner is missing');
    }
  }

  cancel(): void {
    this.router.navigate(['/partners']);
  }
}
