import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerValidationRules } from 'src/app/validation/partner-validation-rules';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner.model';

@Component({
  selector: 'app-partner-create',
  standalone: false,
  
  templateUrl: './partner-create.component.html',
  styleUrl: './partner-create.component.css'
})
export class PartnerCreateComponent implements OnInit {
  partnerForm!: FormGroup;
  PartnerValidationRules = PartnerValidationRules;
  @Output() partnerCreated = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(PartnerValidationRules.firstName.minlength),
          Validators.maxLength(PartnerValidationRules.firstName.maxlength)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(PartnerValidationRules.lastName.minlength),
          Validators.maxLength(PartnerValidationRules.lastName.maxlength)
        ]
      ],
      address: [''],
      partnerNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(PartnerValidationRules.partnerNumber.pattern)
        ]
      ],
      croatianPin: [
        null,
        Validators.pattern(PartnerValidationRules.croatianPin.pattern)
      ],
      partnerTypeId: ['', Validators.required],
      createByUser: [
        '',
        [
          Validators.required,
          Validators.maxLength(PartnerValidationRules.createByUser.maxlength),
          Validators.pattern(PartnerValidationRules.createByUser.pattern)
        ]
      ],
      isForeign: ['', Validators.required],
      externalCode: [
        { value: null, disabled: true },
        [
          Validators.minLength(PartnerValidationRules.externalCode.minlength),
          Validators.maxLength(PartnerValidationRules.externalCode.maxlength),
        ],
      ],
      gender: ['', Validators.required]
    });

    this.partnerForm.get('isForeign')?.valueChanges.subscribe((value) => {
      if (value === 'true') {
        this.partnerForm.get('externalCode')?.enable();
      } else {
        this.partnerForm.get('externalCode')?.disable();
      }
    });
  }

  submitPartnerForm(): void {
    const formValue = this.partnerForm.value;
    formValue.isForeign = formValue.isForeign === 'true';
    const payload = formValue;

    this.partnerService.createPartner(payload as Partner).subscribe({
      next: (createdPartner) => {
        console.log('Emitted partner:', createdPartner.partnerId);
        this.router.navigate(['/partners'], {
          queryParams: { highlightId: createdPartner.partnerId },
        });
      },
      error: (error) => {
        console.error('Error creating partner:', error);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/partners']);
  }
}
