import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy.model';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-form',
  standalone: false,
  
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {

  @Input() partnerId!: number;
  @Input() policy: Policy | null = null;
  @Output() submittedForm = new EventEmitter<void>();

  policyNumber = '';
  policyAmount!: number;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    if (this.policy) {
      this.policyNumber = this.policy.policyNumber;
      this.policyAmount = this.policy.policyAmount;
    }
  }

  savePolicy(): void {
    const newPolicy: Policy = {
      policyId: this.policy?.policyId || 0,
      partnerId: this.partnerId,
      policyNumber: this.policyNumber,
      policyAmount: this.policyAmount,
    };

    if (this.policy) {
      this.policyService.updatePolicy(this.policy.policyId, newPolicy).subscribe(() => {
        this.submittedForm.emit();
      });
    } else {
      this.policyService.createPolicy(newPolicy).subscribe(() => {
        this.submittedForm.emit();
      });
    }
  }

}
