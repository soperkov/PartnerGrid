import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner.model';

@Component({
  selector: 'app-partner-create',
  standalone: false,
  
  templateUrl: './partner-create.component.html',
  styleUrl: './partner-create.component.css'
})
export class PartnerCreateComponent {
  partner: Partial<Partner> = {};

  constructor(
    private router: Router,
    private partnerService: PartnerService
  ) { }

  createPartner(): void {
    this.partnerService.createPartner(this.partner as Partner).subscribe({
      next: () => this.router.navigate(['/partners']),
      error: (error) => console.error('Error creating partner:', error)
    });
  }
}
