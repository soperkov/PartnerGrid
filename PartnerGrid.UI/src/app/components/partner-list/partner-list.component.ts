import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner.model';
import { PartnerDetailComponent } from '../partner-detail/partner-detail.component';
import { PolicyFormComponent } from '../policy-form/policy-form.component';
import { PolicyListModalComponent } from '../policy-list-modal/policy-list-modal.component';

@Component({
  selector: 'app-partner-list',
  standalone: false,
  
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];
  selectedPartner: Partner | null = null;
  selectedPartnerId: number | null = null;
  highlightedPartnerId: number | null = null;

  @ViewChild(PartnerDetailComponent) partnerDetailComponent!: PartnerDetailComponent;
  @ViewChild(PolicyFormComponent) policyFormComponent!: PolicyFormComponent;
  @ViewChild(PolicyListModalComponent) policyListModalComponent!: PolicyListModalComponent;



  constructor(
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.highlightedPartnerId = params['highlightId'] ? +params['highlightId'] : null;
    });
    console.log('highlightedPartnerId:', this.highlightedPartnerId);

    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partners = data.map((partner) => ({
          ...partner,
          fullName: `${partner.firstName} ${partner.lastName}`
        }))
       .sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime()); 
      console.log('Loaded partners:', this.partners.map(p => p.partnerId));
      },
      error: (error) => console.error('Error fetching partners:', error)
    });
  }

  refreshPartners(): void {
    this.loadPartners();
    this.highlightedPartnerId = this.selectedPartnerId; 
  }

  handlePartnerCreated(partnerId: number): void {
    this.highlightedPartnerId = partnerId;
    this.loadPartners();
  }

  showDetails(partner: Partner): void {
    this.selectedPartner = partner;
    this.partnerDetailComponent.openModal();
  }

  navigateToCreatePartner(): void {
    this.router?.navigate(['/partners/create']);
  }

  openPolicyDialog(partner: Partner, event: Event): void {
    event.stopPropagation();
    console.log("Opening policy list modal for:", partner);
    this.policyFormComponent.partnerId = partner.partnerId;
    this.policyFormComponent.partnerFullName = partner.fullName;
    this.policyFormComponent.openModal();  
  }

  viewPolicies(partner: Partner, event: Event): void {
    event.stopPropagation();
    console.log('Opening policy list modal for:', partner); 
    this.policyListModalComponent.openModalWithPolicies(partner.partnerId, partner.fullName);
  }

  deletePartner(partnerId: number, event: Event): void {
    event.stopPropagation(); 
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partnerService.deletePartner(partnerId).subscribe({
        next: () => {
          this.partners = this.partners.filter((partner) => partner.partnerId !== partnerId);
          console.log('Partner deleted successfully.');
        },
        error: (error) => console.error('Error deleting partner:', error)
      });
    }
  }
}
