import { Component, OnInit } from '@angular/core';
import { PartnerService, Partner } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-list',
  standalone: false,
  
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    // Call the service to fetch partners
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partners = data; // Assign API response to partners
      },
      error: (error) => {
        console.error('Error fetching partners:', error);
      },
    });
  }

}
