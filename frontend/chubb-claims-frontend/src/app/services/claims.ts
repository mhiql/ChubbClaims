
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Claim {
  id: string;
  claimNumber: string;
  claimantName: string;
  claimantEmail: string;
  claimType: number;
  incidentDate: string;
  incidentLocation: string;
  description: string;
  estimatedAmount: number;
  status: number;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private readonly apiUrl = 'http://localhost:5109/api/claims';

  constructor(private http: HttpClient) {}

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }

  getClaimById(id: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }
}
