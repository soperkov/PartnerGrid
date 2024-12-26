import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService, Partner } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-edit',
  standalone: false,
  
  templateUrl: './partner-edit.component.html',
  styleUrl: './partner-edit.component.css'
})
export class PartnerEditComponent implements OnInit {
  partner: Partner | null = null;

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.partnerService.getPartnerById(+id).subscribe({
        next: (data) => (this.partner = data),
        error: (error) => console.error('Error fetching partner details:', error)
      });
    }
  }

  updatePartner(): void {
    if (this.partner) {
      this.partnerService.updatePartner(this.partner.partnerId, this.partner).subscribe({
        next: () => this.router.navigate(['/partners']),
        error: (error) => console.error('Error updating partner:', error)
      })
    }
  }
}
