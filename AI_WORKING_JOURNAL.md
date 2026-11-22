# AI Working Journal

## Project

**Chubb APAC – Claims Management Platform**

Take-Home Assessment for the Young Graduate Program (Full-Stack Developer).

## Objective

Build a claims management application that allows claimants to submit claims and allows claims staff to view, review, and progress claims through their processing lifecycle.

## Technology Stack

- Frontend: Angular 21
- Backend: ASP.NET Core Web API (.NET 10)
- Database: Microsoft SQL Server
- ORM: Entity Framework Core
- Communication: REST API over HTTP
- Version Control: Git and GitHub

---

## Entry 1 — Technology Selection and Environment Setup

### AI Assistance

Reviewed the assessment requirements and discussed the technology stack and initial project setup.

### Decision

- Selected ASP.NET Core Web API with C# for the backend.
- Selected Angular for the frontend.
- Selected Microsoft SQL Server for database storage.
- Selected .NET 10 instead of .NET 11 Preview.

### Reasoning

.NET 10 was a stable SDK available in the development environment. Using C# and SQL Server also aligned with my existing technical experience.

### Human Review

Confirmed the available development environment and selected the technology stack.

---

## Entry 2 — Project Structure and Git Repository Setup

### AI Assistance

Used AI to guide the initial project setup, repository structure, and Git workflow.

### Decision

Organized the project into separate backend and frontend directories, with supporting documentation.

Initialized Git and created meaningful commits throughout development.

### Reasoning

Separating the frontend and backend makes the project easier to maintain and allows each application to be developed and run independently.

Meaningful commits provide a history of implementation progress.

### Human Review

Created the project locally, reviewed the structure, and used Git to track implementation changes.

---

## Entry 3 — Git Repository Hygiene

### AI Assistance

AI reviewed the initial Git commit and identified that .NET build artifacts from the `bin` and `obj` directories had been included.

### Decision

Added a `.gitignore` file and removed generated build artifacts from Git tracking.

### Reasoning

Build artifacts are generated locally during compilation and should not be committed. Excluding them keeps the repository smaller and cleaner while allowing developers to rebuild the application from source.

### Human Review

Reviewed the recommendation and applied the cleanup.

---

## Entry 4 — Claims Domain Design

### AI Assistance

Used AI to decompose the claims management requirements into an initial domain model and claim lifecycle.

### Decision

Created an initial Claim entity containing claimant information, incident details, estimated amount, status, assignment, and timestamps.

Defined the initial statuses:

- Submitted
- UnderReview
- AdditionalInformationRequired
- Approved
- Rejected
- Settled

### Reasoning

A clear claim lifecycle allows the backend to enforce valid business transitions.

Approved and Settled are separate because claim approval and settlement are different stages.

### Human Review

Reviewed the proposed claim fields and lifecycle against the assessment requirements. This was an initial scope and could evolve during implementation.

---

## Entry 5 — Initial C# Domain Model

### AI Assistance

Used AI to implement the initial Claim domain model and enums representing claim types and processing statuses.

### Decision

Created:

- Claim entity
- ClaimType enum
- ClaimStatus enum

The Claim entity includes claimant details, incident details, estimated financial exposure, claim status, assignment, and audit timestamps.

### Reasoning

Enums provide a controlled set of claim types and statuses.

The Claim model represents the core business entity and is used by the API and database layers.

Guid and ClaimNumber are separate because internal identifiers and user-facing references serve different purposes.

UTC timestamps are used for consistent time handling.

### Human Review

Reviewed the properties and their purposes against the assessment requirements and initial domain design.

---

## Entry 6 — SQL Server and Entity Framework Core

### AI Assistance

Used AI to guide the configuration of Entity Framework Core, SQL Server connectivity, and database migrations.

### Decision

- Configured SQL Server as the database.
- Added Entity Framework Core SQL Server dependencies.
- Configured the database context.
- Created and applied the initial migration.
- Created the `ChubbClaimsDb` database.
- Added database persistence for claims.

### Reasoning

Using a relational database allows claims to be stored persistently rather than relying on in-memory data.

Entity Framework Core simplifies database access and migration management.

### Human Review

Configured the local SQL Server environment, applied migrations, and verified that the database and tables were created successfully.

---

## Entry 7 — Claim API and Status Workflow

### Implemented

- Created claim submission endpoint (`POST /api/claims`).
- Created endpoint to retrieve an individual claim (`GET /api/claims/{id}`).
- Created endpoint to retrieve all claims (`GET /api/claims`).
- Implemented claim status update endpoint (`PUT /api/claims/{id}/status`).
- Added validation for allowed claim status transitions.
- Updated `UpdatedAt` timestamp when a claim status changes.

### Testing

- Successfully submitted a claim and stored it in SQL Server.
- Successfully retrieved individual claim details.
- Successfully retrieved all claims.
- Tested valid transitions:
  - Submitted → UnderReview
  - UnderReview → AdditionalInformationRequired
  - AdditionalInformationRequired → UnderReview
  - UnderReview → Approved
  - Approved → Settled
- Tested invalid transition:
  - Approved → Rejected
  - API correctly returned HTTP 400 Bad Request.

### AI Assistance

AI helped generate the status update endpoint and transition validation logic. I reviewed the implementation, integrated it into the existing controller, and tested the valid and invalid transitions using PowerShell HTTP requests.

### Outcome

The claim API and status workflow are functional, with persistence verified through SQL Server.

---

## Entry 8 — Angular Dashboard and API Integration

### AI Assistance

Used AI to guide the Angular dashboard implementation and connect the frontend to the backend claims API.

### Decision

Implemented a dashboard that retrieves claims through an Angular service using HTTP requests.

The dashboard displays claim information and summary statistics, including claim counts and processing statuses.

### Reasoning

A dashboard gives claims staff a consolidated view of incoming claims and their current processing states.

Using a dedicated service separates API communication from UI components.

### Human Review

Ran the Angular frontend and backend locally, verified that claims were retrieved from the API, and checked that the dashboard displayed database records.

Resolved a loading and UI update issue during development.

### Outcome

The dashboard successfully retrieves and displays claims from SQL Server through the backend API.

---

## Entry 9 — Claim Submission Form

### AI Assistance

Used AI to help implement the claim submission interface, form validation, and API integration.

### Decision

Implemented an Angular Reactive Form containing:

- Claimant name
- Claimant email
- Claim type
- Incident date
- Incident location
- Incident description
- Estimated amount

Added client-side validation and success/error feedback.

### Reasoning

Reactive Forms provide structured form handling and validation.

Validation improves the user experience by identifying missing or invalid fields before submission, while backend validation remains responsible for validating incoming requests.

### Human Review

Tested the submission form in the browser and verified that successful submissions were saved through the API.

Verified that a claim reference number was displayed after successful submission.

### Outcome

Claimants can submit new claims through the Angular application.

---

## Entry 10 — Claim Details View

### AI Assistance

Used AI to help implement a dedicated claim details component and integrate it with the existing dashboard.

### Decision

Implemented a claim details view displaying:

- Claim reference number
- Claimant information
- Incident information
- Claim type
- Estimated amount
- Description
- Current status
- Assigned staff information
- Submission and update timestamps

The dashboard claim numbers were made clickable to open the details view.

### Reasoning

A dedicated details view allows claims staff to inspect the information associated with an individual claim without overcrowding the dashboard.

### Human Review

Tested opening claims from the dashboard and verified that the details were retrieved from the backend using the selected claim ID.

### Outcome

Claims can be opened and inspected individually through the frontend.

---

## Entry 11 — Frontend Claim Status Management

### AI Assistance

Used AI to implement status management actions in the Claim Details interface and connect the actions to the backend status update endpoint.

### Decision

Displayed status-specific actions based on the claim's current status:

- Submitted: Start Review
- Under Review: Request Additional Information, Approve Claim, Reject Claim
- Additional Information Required: Resume Review
- Approved: Mark as Settled
- Rejected: No further actions
- Settled: No further actions

Added success and error feedback during status updates.

### Reasoning

Displaying only the valid actions for the current status reduces the likelihood of invalid user actions.

The backend remains responsible for validating status transitions, so frontend controls are not treated as the only layer of business rule enforcement.

### Human Review and Testing

Tested the status workflow through the Angular UI:

- Submitted → Under Review
- Under Review → Additional Information Required
- Additional Information Required → Under Review
- Under Review → Approved
- Approved → Settled

Verified that the displayed status and available actions changed after successful API responses.

### Outcome

Claims staff can progress claims through the implemented workflow directly from the frontend.

---

## Entry 12 — Documentation and GitHub Submission Preparation

### AI Assistance

Used AI to review the repository documentation and prepare the project for submission.

### Decision

Updated the root README to document:

- Project overview
- Technology stack
- Application features
- Claim status workflow
- Project structure
- Prerequisites
- Database configuration
- Backend setup
- Frontend setup
- API endpoints
- AI-assisted development

Created and connected a GitHub repository and pushed the local commit history.

### Reasoning

Clear documentation makes the project easier for reviewers to understand, configure, and run.

The Git commit history also provides evidence of the development process.

### Human Review

Created the GitHub repository and verified that the local project was successfully pushed to the remote repository.

### Outcome

The project is available in a GitHub repository with its development commit history.

---

## Challenges and Learning

- Configuring the local SQL Server environment and Entity Framework Core migrations.
- Connecting Angular to the ASP.NET Core API.
- Handling asynchronous API responses and frontend loading states.
- Implementing and validating claim status transitions.
- Integrating the frontend claim details view with the API.
- Testing status transitions through both the API and the Angular interface.
- Understanding the difference between local Git commits and pushing commits to GitHub.

---

## Scope and Limitations

The assessment implementation prioritised the core claim submission, retrieval, review, and status workflow.

The following areas were not fully implemented within the current scope:

- Authentication and role-based authorization.
- Actual claimant identity verification.
- A complete additional-information submission workflow.
- Kafka/event-driven processing.
- Claim settlement and payment integration.
- Advanced workload analytics and reporting.
- Automated end-to-end test coverage.
- Production deployment.

These features could be extended in a future iteration.

---

## Reflection

AI was used as a development assistant for planning, implementation guidance, code generation, debugging, documentation, and review.

I reviewed generated code, integrated it into the project, ran the application locally, and tested implemented functionality. I also made technology and scope decisions based on the assessment requirements and the available development environment.

The assessment helped me practise full-stack development, API integration, database persistence, business workflow implementation, frontend state handling, Git version control, and documenting AI-assisted development.
