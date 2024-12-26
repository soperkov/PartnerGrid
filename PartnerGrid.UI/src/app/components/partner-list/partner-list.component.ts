import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService, Partner } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-list',
  standalone: false,
  
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];

  constructor(
    private partnerService: PartnerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partners = data; 
      },
      error: (error) => {
        console.error('Error fetching partners:', error);
      },
    });
  }

  viewPartner(partnerId: number): void {
    this.router.navigate(['/partners', partnerId]);
  }
  
  editPartner(partnerId: number): void {
    this.router.navigate(['/partners/edit', partnerId]);
  }
  
  deletePartner(partnerId: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partnerService.deletePartner(partnerId).subscribe({
        next: () => {
          this.partners = this.partners.filter((partner) => partner.partnerId !== partnerId);
          console.log('Partner deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting partner:', error);
        }
      });
    }
  }
}
