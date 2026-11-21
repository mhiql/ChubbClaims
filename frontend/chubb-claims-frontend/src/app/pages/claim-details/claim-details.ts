import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClaimsService, Claim } from '../../services/claims';

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-details.html',
  styleUrl: './claim-details.css'
})
export class ClaimDetails implements OnChanges {

  @Input() claimId: string | null = null;

  claim: Claim | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private claimsService: ClaimsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['claimId'] && this.claimId) {
      this.loadClaim(this.claimId);
    }
  }

  loadClaim(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.claim = null;

    this.claimsService.getClaimById(id).subscribe({
      next: (data) => {
        this.claim = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to load claim:', error);
        this.errorMessage = 'Unable to load claim details.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getClaimType(type: number): string {
    switch (type) {
      case 0:
        return 'Motor Insurance';
      case 1:
        return 'Property Insurance';
      default:
        return 'Unknown';
    }
  }

  getClaimStatus(status: number): string {
    switch (status) {
      case 0: return 'Submitted';
      case 1: return 'Under Review';
      case 2: return 'Additional Information Required';
      case 3: return 'Approved';
      case 4: return 'Rejected';
      case 5: return 'Settled';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'submitted';
      case 1: return 'under-review';
      case 2: return 'additional-info';
      case 3: return 'approved';
      case 4: return 'rejected';
      case 5: return 'settled';
      default: return '';
    }
  }
}