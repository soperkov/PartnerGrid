import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationRules } from 'src/app/validation/validation-rules';
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
  ValidationRules = ValidationRules;

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
          Validators.minLength(ValidationRules.firstName.minlength),
          Validators.maxLength(ValidationRules.firstName.maxlength)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationRules.lastName.minlength),
          Validators.maxLength(ValidationRules.lastName.maxlength)
        ]
      ],
      address: [''],
      partnerNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(ValidationRules.partnerNumber.pattern)
        ]
      ],
      croatianPin: [
        null,
        Validators.pattern(ValidationRules.croatianPin.pattern)
      ],
      partnerTypeId: ['', Validators.required],
      createByUser: [
        '',
        [
          Validators.required,
          Validators.maxLength(ValidationRules.createByUser.maxlength),
          Validators.pattern(ValidationRules.createByUser.pattern)
        ]
      ],
      isForeign: ['', Validators.required],
      externalCode: [
        { value: null, disabled: true },
        [
          Validators.minLength(ValidationRules.externalCode.minlength),
          Validators.maxLength(ValidationRules.externalCode.maxlength),
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
      next: () => {
        this.router.navigate(['/partners']);
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
