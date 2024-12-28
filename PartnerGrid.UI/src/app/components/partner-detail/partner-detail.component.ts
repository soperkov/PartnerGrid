import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner.model';

@Component({
  selector: 'app-partner-detail',
  standalone: false,
  
  templateUrl: './partner-detail.component.html',
  styleUrl: './partner-detail.component.css'
})
export class PartnerDetailComponent implements OnInit {
  partner: Partner | null = null;

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
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
}
