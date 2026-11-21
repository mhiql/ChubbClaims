# Claims Domain Design

## Claim Types

- Motor
- Property

## Claim Statuses

- Submitted
- UnderReview
- AdditionalInformationRequired
- Approved
- Rejected
- Settled

## Claim Lifecycle

1. Claimant submits a claim.
2. Claim is assigned the Submitted status.
3. Claims staff reviews the claim.
4. Staff may request additional information.
5. Claim returns to UnderReview after information is provided.
6. Staff approves or rejects the claim.
7. Approved claims may progress to Settled.

## Claim Data

- Id: Guid
- ClaimNumber: Human-readable claim reference
- ClaimantName: Claimant's full name
- ClaimantEmail: Claimant contact email
- ClaimType: Motor or Property
- IncidentDate: Date of incident
- IncidentLocation: Incident location
- Description: Incident description
- EstimatedAmount: Estimated claim amount
- Status: Current claim status
- AssignedTo: Assigned claims officer
- CreatedAt: Creation timestamp in UTC
- UpdatedAt: Last update timestamp in UTC

## Initial Scope

The initial implementation will focus on:

- Claim submission
- Claim listing
- Claim detail
- Claim status management

Authentication, document uploads, notifications and Kafka
integration may be deferred depending on the available time.