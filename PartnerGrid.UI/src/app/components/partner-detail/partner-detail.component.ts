import { Component, Input } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import * as bootstrap from "bootstrap";
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
    const modalElement = document.getElementById('partnerDetailModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('partnerDetailModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }
}
