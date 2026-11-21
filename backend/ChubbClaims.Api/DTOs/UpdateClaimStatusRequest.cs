using ChubbClaims.Api.Enums;

namespace ChubbClaims.Api.DTOs;

public class UpdateClaimStatusRequest
{
    public ClaimStatus Status { get; set; }
}