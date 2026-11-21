using ChubbClaims.Api.Enums;

namespace ChubbClaims.Api.Models;

public class Claim
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string ClaimNumber { get; set; } = string.Empty;

    // Claimant information
    public string ClaimantName { get; set; } = string.Empty;

    public string ClaimantEmail { get; set; } = string.Empty;

    // Incident information
    public ClaimType ClaimType { get; set; }

    public DateTime IncidentDate { get; set; }

    public string IncidentLocation { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    // Financial information
    public decimal EstimatedAmount { get; set; }

    // Claim processing
    public ClaimStatus Status { get; set; } = ClaimStatus.Submitted;

    public string? AssignedTo { get; set; }

    // Audit timestamps
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}