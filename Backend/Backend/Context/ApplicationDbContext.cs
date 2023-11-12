using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<InternProfileModel>? InternProfiles { get; set; }
        public DbSet<EvaluationFormModel>? EvaluationForms { get; set; }
        public DbSet<OrganizationsModel>? Organizations { get; set; }
        public DbSet<InviteUserModel>? InviteUsers { get; set; }
    }
}
