# AI Working Journal



## Project

Chubb APAC - Claims Management Platform



## Objective

Build a working claims management platform for claimants and claims staff.



## Technology Stack

\- Frontend: Angular

\- Backend: ASP.NET Core Web API (.NET 10)

\- Database: Microsoft SQL Server

\- Communication: REST API

\- Version Control: Git



## Development Log



### Entry 1 - Technology Selection and Environment Setup



\*\*AI Assistance:\*\*

Reviewed the assessment requirements and discussed the project technology stack.



\*\*Decision:\*\*

\- Selected ASP.NET Core Web API with C#.

\- Selected Angular for the frontend.

\- Selected Microsoft SQL Server for database storage.

\- Selected .NET 10 instead of .NET 11 Preview.



\*\*Reasoning:\*\*

.NET 10 is a stable SDK already installed on the development machine.

Using C# and SQL Server also aligns with my existing experience.



\*\*Human Review:\*\*

Confirmed the available development environment and selected the technology stack.



## Entry 3 — Git Repository Hygiene



### AI Assistance

AI reviewed the initial Git commit and identified that .NET

build artifacts from the bin and obj directories were included.



### Decision

Added a .gitignore file and removed generated build artifacts

from Git tracking.



### Reasoning

Build artifacts are generated locally during compilation and

should not be committed. Excluding them keeps the repository

smaller and cleaner while allowing developers to rebuild the

application from source.



### Human Review

Reviewed the recommendation and applied the cleanup.

## Entry 4 — Claims Domain Design

### AI Assistance
Used AI to decompose the claims management requirements
into an initial domain model and claim lifecycle.

### Decision
Created an initial Claim entity containing claimant information,
incident details, estimated amount, status, assignment and timestamps.

Defined the initial statuses:
Submitted, UnderReview, AdditionalInformationRequired,
Approved, Rejected and Settled.

### Reasoning
A clear claim lifecycle allows the backend to enforce valid
business transitions. Approved and Settled are separate because
claim approval and payment settlement are different stages.

### Human Review
Reviewed the proposed claim fields and lifecycle against
the assessment requirements. This is an initial scope and
may evolve as implementation progresses.

