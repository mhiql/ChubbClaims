using ChubbClaims.Api.Data;
using ChubbClaims.Api.DTOs;
using ChubbClaims.Api.Enums;
using ChubbClaims.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChubbClaims.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClaimsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClaimsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateClaim(
        [FromBody] CreateClaimRequest request)
    {
        var claim = new Claim
        {
            ClaimantName = request.ClaimantName,
            ClaimantEmail = request.ClaimantEmail,
            ClaimType = request.ClaimType,
            IncidentDate = request.IncidentDate,
            IncidentLocation = request.IncidentLocation,
            Description = request.Description,
            EstimatedAmount = request.EstimatedAmount,
            Status = ClaimStatus.Submitted,
            CreatedAt = DateTime.UtcNow
        };

        claim.ClaimNumber = GenerateClaimNumber(claim.ClaimType);

        _context.Claims.Add(claim);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetClaimById),
            new { id = claim.Id },
            claim);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetClaimById(Guid id)
    {
        var claim = await _context.Claims.FindAsync(id);

        if (claim == null)
        {
            return NotFound();
        }

        return Ok(claim);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClaims()
    {
        var claims = await _context.Claims
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        return Ok(claims);
    }

    private string GenerateClaimNumber(ClaimType claimType)
    {
        var prefix = claimType == ClaimType.Motor ? "MOT" : "PRO";

        return $"CH-{prefix}-{DateTime.UtcNow.Year}-{Guid.NewGuid().ToString("N")[..8].ToUpper()}";
    }
}