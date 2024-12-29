import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/partner.model';
import $ from 'jquery';


@Component({
  selector: 'app-partner-detail',
  standalone: false,
  
  templateUrl: './partner-detail.component.html',
  styleUrl: './partner-detail.component.css'
})
export class PartnerDetailComponent {

  @Input() partner: Partner | null = null;

  openModal(): void {
    const modalElement = $('#partnerDetailModal') as any;
    modalElement.modal('show');
  }

  closeModal(): void {
    const modalElement = $('#partnerDetailModal') as any;
    modalElement.modal('hide');
  }
}
