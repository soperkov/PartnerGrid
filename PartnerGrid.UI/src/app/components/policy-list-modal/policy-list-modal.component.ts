import { Component, Input, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy.model';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-list-modal',
  standalone: false,
  
  templateUrl: './policy-list-modal.component.html',
  styleUrl: './policy-list-modal.component.css'
})
export class PolicyListModalComponent implements OnInit {

  @Input() partnerId!: number;
  policies: Policy[] = [];
  showModal = false;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    if (this.partnerId) {
      this.policyService.getPoliciesByPartner(this.partnerId).subscribe({
        next: (data) => (this.policies = data),
        error: (error) => console.error('Error fetching policies:', error),
      });
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editPolicy(policy: Policy): void {
    
  }

  deletePolicy(policyId: number): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(policyId).subscribe({
        next: () => {
          this.policies = this.policies.filter((policy) => policy.policyId !== policyId);
          console.log('Policy deleted successfully.');
        },
        error: (error) => console.error('Error deleting policy:', error),
      });
    }
  }
}
