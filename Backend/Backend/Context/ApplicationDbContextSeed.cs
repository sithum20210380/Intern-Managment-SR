using Backend.Models;
using Backend.Constants;
using Microsoft.AspNetCore.Identity;

namespace Backend.Context
{
    public class ApplicationDbContextSeed
    {
        public static async Task SeedEssentialsAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Administrator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Management.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Evaluator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Mentor.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Intern.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.User.ToString()));

            //Seed Default User
            var defaultUser = new ApplicationUser 
            { 
                UserName = Authorization.default_username, 
                Email = Authorization.default_email, 
                EmailConfirmed = true, 
                FirstName=Authorization.default_firstname, 
                LastName=Authorization.default_lastname, 
                PhoneNumberConfirmed = true 
            };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                await userManager.CreateAsync(defaultUser, Authorization.default_password);
                await userManager.AddToRoleAsync(defaultUser, Authorization.default_role.ToString());

            }
        }
    }
}
