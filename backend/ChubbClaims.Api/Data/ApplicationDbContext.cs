using ChubbClaims.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ChubbClaims.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Claim> Claims => Set<Claim>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Claim>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity.Property(c => c.ClaimNumber)
                .IsRequired()
                .HasMaxLength(30);

            entity.HasIndex(c => c.ClaimNumber)
                .IsUnique();

            entity.Property(c => c.ClaimantName)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(c => c.ClaimantEmail)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(c => c.ClaimType)
                .HasConversion<string>()
                .HasMaxLength(20);

            entity.Property(c => c.Status)
                .HasConversion<string>()
                .HasMaxLength(40);

            entity.Property(c => c.IncidentLocation)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(c => c.Description)
                .IsRequired()
                .HasMaxLength(2000);

            entity.Property(c => c.EstimatedAmount)
                .HasPrecision(18, 2);

            entity.Property(c => c.AssignedTo)
                .HasMaxLength(150);
        });
    }
}