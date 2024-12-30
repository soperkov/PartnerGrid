import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private baseUrl = '/api/Partner';

  constructor(private http: HttpClient) { }

  getAllPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.baseUrl);
  }

  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.baseUrl}/${id}`);
  }

  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(`${this.baseUrl}/Partner`, partner);
  }

  updatePartner(id: number, partner: Partner): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, partner);
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
