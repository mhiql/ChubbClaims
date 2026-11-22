# ChubbClaims – Claims Management System

A full-stack claims management application developed as part of the **Chubb APAC Engineering Young Graduate Program – Full-Stack Developer Take-Home Assessment**.

The application provides a foundation for managing insurance claims, from initial submission through review, decision, and settlement.

## Technology Stack

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

### Frontend
- Angular 21
- TypeScript
- HTML
- CSS
- Angular Reactive Forms

### Development Tools
- Visual Studio Code
- Git and GitHub
- SQL Server Management Studio (SSMS)
- .NET SDK 10

## Application Features

### Claimant Features
- Submit a new insurance claim.
- Provide claimant and incident information.
- View the submitted claim number.
- View claim details and current processing status.

### Claims Management Features
- View claims on the dashboard.
- View individual claim details.
- Start reviewing submitted claims.
- Request additional information.
- Resume claim review.
- Approve or reject claims.
- Mark approved claims as settled.
- View claim status and processing information.

## Claim Status Workflow

The application supports the following claim lifecycle:

| Current Status | Available Next Status |
|---|---|
| Submitted | Under Review |
| Under Review | Additional Information Required |
| Under Review | Approved |
| Under Review | Rejected |
| Additional Information Required | Under Review |
| Approved | Settled |
| Rejected | Terminal status |
| Settled | Terminal status |

The backend validates status transitions to prevent invalid workflow changes.

## Project Structure

```text
ChubbClaims/
├── backend/
│   └── ChubbClaims.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Models/
│       ├── Migrations/
│       ├── Program.cs
│       └── appsettings.json
│
├── frontend/
│   └── chubb-claims-frontend/
│       ├── src/
│       │   └── app/
│       │       ├── pages/
│       │       ├── services/
│       │       ├── app.ts
│       │       ├── app.html
│       │       └── app.css
│       └── package.json
│
├── docs/
│   └── CLAIMS_DOMAIN.md
│
├── AI_WORKING_JOURNAL.md
├── ChubbClaims.slnx
└── README.md
```

## Prerequisites

Install the following before running the application:

- .NET SDK 10.0 or compatible version specified in `global.json`.
- Node.js and npm.
- SQL Server.
- SQL Server Management Studio (SSMS), recommended for database management.
- Angular CLI 21, if you want to use the `ng` command directly.

## Database Configuration

The application uses Microsoft SQL Server with Entity Framework Core.

1. Make sure SQL Server is running.
2. Open the backend configuration file:
   `backend/ChubbClaims.Api/appsettings.json`
3. Configure the connection string to match your local SQL Server instance.

The development database used for this project is:

```text
ChubbClaimsDb
```

Ensure that the configured SQL Server instance and authentication method match your local environment.

## Running the Backend

Open a terminal and navigate to the backend project:

```bash
cd backend/ChubbClaims.Api
```

Restore dependencies:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run --urls http://localhost:5109
```

The backend API will be available at:

```text
http://localhost:5109
```

## Running the Frontend

Open another terminal and navigate to the Angular project:

```bash
cd frontend/chubb-claims-frontend
```

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Start the Angular development server:

```bash
ng serve
```

Open the application in your browser:

```text
http://localhost:4200
```

Keep both the backend API and Angular development server running while using the application.

## API Endpoints

Base URL:

```text
http://localhost:5109/api/claims
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/claims` | Create a new claim |
| GET | `/api/claims` | Retrieve all claims |
| GET | `/api/claims/{id}` | Retrieve a claim by ID |
| PUT | `/api/claims/{id}/status` | Update claim status |

## Development Notes

- The frontend communicates with the backend through HTTP REST API requests.
- The backend uses Entity Framework Core to interact with SQL Server.
- Claim status transitions are validated by the backend.
- The Angular application is configured to communicate with the local API at `http://localhost:5109`.

## AI-Assisted Development

AI tools were used as development assistance during the assessment. The development process, prompts, decisions, challenges, and relevant implementation details are documented in:

`AI_WORKING_JOURNAL.md`

## Author

**Muhammad Haiqal Bin Norhadzrami**