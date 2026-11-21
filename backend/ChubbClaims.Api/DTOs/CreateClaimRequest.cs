using System.ComponentModel.DataAnnotations;
using ChubbClaims.Api.Enums;

namespace ChubbClaims.Api.DTOs;

public class CreateClaimRequest
{
    [Required]
    [StringLength(150)]
    public string ClaimantName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string ClaimantEmail { get; set; } = string.Empty;

    [Required]
    public ClaimType ClaimType { get; set; }

    [Required]
    public DateTime IncidentDate { get; set; }

    [Required]
    [StringLength(255)]
    public string IncidentLocation { get; set; } = string.Empty;

    [Required]
    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [Range(typeof(decimal), "0.01", "9999999999999999")]
    public decimal EstimatedAmount { get; set; }
}