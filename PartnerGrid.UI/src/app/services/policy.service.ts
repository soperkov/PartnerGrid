import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private baseUrl = '/api/Policy';

  constructor(private http: HttpClient) { }

  getPoliciesByPartner(partnerId: number): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.baseUrl}/partner/${partnerId}`);  }

  createPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.baseUrl, policy);
  }

  updatePolicy(policyId: number, policy: Policy): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${policyId}`, policy);
  }

  deletePolicy(policyId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${policyId}`);
  }
}
