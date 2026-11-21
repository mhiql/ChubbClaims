import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsService, Claim } from './services/claims';
import { SubmitClaim } from './pages/submit-claim/submit-claim';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SubmitClaim],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  claims: Claim[] = [];

  loading = true;
  errorMessage = '';

  showSubmitClaim = false;

  constructor(
    private claimsService: ClaimsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.loading = true;
    this.errorMessage = '';

    this.claimsService.getClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.loading = false;

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to load claims:', error);
        this.errorMessage = 'Unable to load claims. Please try again later.';
        this.loading = false;

        this.cdr.markForCheck();
      }
    });
  }

  openSubmitClaim(): void {
    this.showSubmitClaim = true;
  }

  backToDashboard(): void {
    this.showSubmitClaim = false;
    this.loadClaims();
  }

  get totalClaims(): number {
    return this.claims.length;
  }

  get pendingReview(): number {
    return this.claims.filter(
      claim => claim.status === 1 || claim.status === 2
    ).length;
  }

  get approvedClaims(): number {
    return this.claims.filter(
      claim => claim.status === 3
    ).length;
  }

  get rejectedClaims(): number {
    return this.claims.filter(
      claim => claim.status === 4
    ).length;
  }

  get submittedClaims(): number {
    return this.claims.filter(
      claim => claim.status === 0
    ).length;
  }

  get settledClaims(): number {
    return this.claims.filter(
      claim => claim.status === 5
    ).length;
  }

  getClaimType(type: number): string {
    switch (type) {
      case 0:
        return 'Motor';
      case 1:
        return 'Property';
      default:
        return 'Unknown';
    }
  }

  getClaimStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Submitted';
      case 1:
        return 'Under Review';
      case 2:
        return 'Additional Information Required';
      case 3:
        return 'Approved';
      case 4:
        return 'Rejected';
      case 5:
        return 'Settled';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 0:
        return 'submitted';
      case 1:
        return 'under-review';
      case 2:
        return 'additional-info';
      case 3:
        return 'approved';
      case 4:
        return 'rejected';
      case 5:
        return 'settled';
      default:
        return 'unknown';
    }
  }
}