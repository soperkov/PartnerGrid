import { Component, Input } from '@angular/core';
import { Policy } from 'src/app/models/policy.model';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-list-modal',
  standalone: false,
  
  templateUrl: './policy-list-modal.component.html',
  styleUrl: './policy-list-modal.component.css'
})
export class PolicyListModalComponent {

  @Input() partnerId!: number | null;
  @Input() partnerFullName!: string | undefined
  policies: Policy[] = [];

  constructor(private policyService: PolicyService) { }

  private showModal(): void {
    const modalElement = document.getElementById('policyListModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('policyListModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  openModalWithPolicies(partnerId: number, partnerFullName: string | undefined): void {
    this.partnerId = partnerId;
    this.partnerFullName = partnerFullName;

    this.policyService.getPoliciesByPartner(partnerId).subscribe({
      next: (data) => {
        this.policies = data; 
        this.showModal(); 
      },
      error: (error) => {
        this.policies = []; 
        this.showModal();
      }
    });
  }

}
