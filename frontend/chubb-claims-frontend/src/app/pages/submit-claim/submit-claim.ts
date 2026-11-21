import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  ClaimsService,
  CreateClaimRequest
} from '../../services/claims';

@Component({
  selector: 'app-submit-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-claim.html',
  styleUrl: './submit-claim.css'
})
export class SubmitClaim {

  submitting = false;
  successMessage = '';
  errorMessage = '';

  claimForm;

  constructor(
    private fb: FormBuilder,
    private claimsService: ClaimsService
  ) {

    // Initialize the form inside the constructor
    // to avoid the "fb used before initialization" error.
    this.claimForm = this.fb.nonNullable.group({
      claimantName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],

      claimantEmail: ['', [
        Validators.required,
        Validators.email
      ]],

      claimType: [0, Validators.required],

      incidentDate: ['', Validators.required],

      incidentLocation: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],

      description: ['', [
        Validators.required,
        Validators.maxLength(2000)
      ]],

      estimatedAmount: [0, [
        Validators.required,
        Validators.min(0.01)
      ]]
    });
  }

  submitClaim(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.claimForm.invalid) {
      this.claimForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const claimData: CreateClaimRequest = this.claimForm.getRawValue();

    this.claimsService.createClaim(claimData).subscribe({

      next: (response) => {

        this.successMessage =
          `Claim submitted successfully! Your claim number is ${response.claimNumber}.`;

        this.claimForm.reset({
          claimantName: '',
          claimantEmail: '',
          claimType: 0,
          incidentDate: '',
          incidentLocation: '',
          description: '',
          estimatedAmount: 0
        });

        this.submitting = false;
      },

      error: (error) => {

        console.error('Failed to submit claim:', error);

        this.errorMessage =
          'Failed to submit your claim. Please try again.';

        this.submitting = false;
      }

    });
  }
}