using Backend.Models;
using Backend.Constants;
using Backend.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;

        public UserService(
           UserManager<ApplicationUser> userManager,
           RoleManager<IdentityRole> roleManager,
           IConfiguration configuration,
           ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        public async Task<string> RegisterAsync(RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var userWithSameEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userWithSameEmail == null)
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());

                    // Save changes to the database using the injected _dbContext
                    await _dbContext.SaveChangesAsync();
                    return $"User Registered with username {user.UserName}";
                }
                return $"User Registered with username {user.UserName}";
            }
            else
            {
                return $"Email {user.Email} is already registered.";
            }
        }

        public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model)
        {
            var authenticationModel = new AuthenticationModel();
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                authenticationModel.IsAuthenticated = false;
                authenticationModel.Message = $"No Accounts Registered with {model.Email}.";
                return authenticationModel;
            }

            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authenticationModel.IsAuthenticated = true;
                JwtSecurityToken jwtSecurityToken = CreateJwtToken(user); // Remove await here

                if (jwtSecurityToken != null)
                {
                    authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                    authenticationModel.Email = user.Email;
                    authenticationModel.UserName = user.UserName;
                    var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                    authenticationModel.Roles = rolesList.ToList();
                }
                else
                {
                    // Handle the case where token creation failed
                    authenticationModel.IsAuthenticated = false;
                    authenticationModel.Message = "Failed to create JWT token.";
                }

                return authenticationModel;
            }

            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"Incorrect Credentials for user {user.Email}.";
            return authenticationModel;
        }

        private JwtSecurityToken CreateJwtToken(ApplicationUser user)
        {
            var userClaims = _userManager.GetClaimsAsync(user).Result;
            var roles = _userManager.GetRolesAsync(user).Result;
            var roleClaims = new List<Claim>();
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds);

            return jwtSecurityToken;
        }

        public async Task<string> AddRoleAsync(AddRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return $"No Accounts Registered with {model.Email}.";
            }
            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var roleExists = Enum.GetNames(typeof(Authorization.Roles)).Any(x => x.ToLower() == model.Role.ToLower());
                if (roleExists)
                {
                    var validRole = Enum.GetValues(typeof(Authorization.Roles)).Cast<Authorization.Roles>().Where(x => x.ToString().ToLower() == model.Role.ToLower()).FirstOrDefault();
                    await _userManager.AddToRoleAsync(user, validRole.ToString());
                    return $"Added {model.Role} to user {model.Email}.";
                }
                return $"Role {model.Role} not found.";
            }
            return $"Incorrect Credentials for user {user.Email}.";

        }

        public async Task<int> CreateInternProfileAsync(InternProfileModel model)
        {
            try
            {
                // Check if an intern profile with the same email already exists
                var existingProfile = await _dbContext.InternProfiles.FirstOrDefaultAsync(p => p.Email == model.Email);

                if (existingProfile != null)
                {
                    return -1;
                }

                var internProfile = new InternProfileModel
                {
                    Name = model.Name,
                    University = model.University,
                    Email = model.Email,
                    InterviewScore = model.InterviewScore,
                    InterviewFeedback = model.InterviewFeedback,
                    Evolution1Score = model.Evolution1Score,
                    Evolution1Feedback = model.Evolution1Feedback,
                    Evolution2Score = model.Evolution2Score,
                    Evolution2Feedback = model.Evolution2Feedback,
                    Accomplishments = model.Accomplishments,
                    GPA = model.GPA,
                    ProjectDetails = model.ProjectDetails,
                    AssignedTeam = model.AssignedTeam,
                    Mentor = model.Mentor,
                    UploadCV = model.UploadCV,
                    Status = model.Status
                };

                _dbContext.InternProfiles.Add(internProfile);
                await _dbContext.SaveChangesAsync();
                return internProfile.Id;
            }
            catch (Exception ex)
            {
                // Return null to indicate a failure
                return -1;
            }
        }

        public async Task<IEnumerable<InternProfileModel>> GetInternProfilesAsync()
        {
            try
            {
                // Fetch intern profiles from the database
                var internProfiles = await _dbContext.InternProfiles.ToListAsync();

                return internProfiles;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<int> UpdateInternProfileAsync(int id, InternProfileModel model)
        {
            try
            {
                // Find the existing intern profile by ID
                var existingProfile = await _dbContext.InternProfiles.FindAsync(id);

                if (existingProfile == null)
                {
                    return -1; // Profile not found
                }

                // Update the profile properties
                existingProfile.Name = model.Name;
                existingProfile.University = model.University;
                existingProfile.Email = model.Email;
                existingProfile.InterviewScore = model.InterviewScore;
                existingProfile.InterviewFeedback = model.InterviewFeedback;
                existingProfile.Evolution1Score = model.Evolution1Score;
                existingProfile.Evolution1Feedback = model.Evolution1Feedback;
                existingProfile.Evolution2Score = model.Evolution2Score;
                existingProfile.Evolution2Feedback = model.Evolution2Feedback;
                existingProfile.Accomplishments = model.Accomplishments;
                existingProfile.GPA = model.GPA;
                existingProfile.ProjectDetails = model.ProjectDetails;
                existingProfile.AssignedTeam = model.AssignedTeam;
                existingProfile.Mentor = model.Mentor;
                existingProfile.UploadCV = model.UploadCV;
                existingProfile.Status = model.Status;
                

                _dbContext.InternProfiles.Update(existingProfile);
                await _dbContext.SaveChangesAsync();

                return existingProfile.Id;
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an error code if needed
                return -1;
            }
        }

        public async Task<int> DeleteInternProfileAsync(int id)
        {
            try
            {
                // Find the existing intern profile by ID
                var existingProfile = await _dbContext.InternProfiles.FindAsync(id);

                if (existingProfile == null)
                {
                    return -1; // Profile not found
                }

                _dbContext.InternProfiles.Remove(existingProfile);
                await _dbContext.SaveChangesAsync();

                return id;
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an error code if needed
                return -1;
            }
        }


        public async Task<int> CreateEvaluationFormAsync(EvaluationFormModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.EvaluatorEmail);
            if (user == null)
            {
                return 0; // User not found
            }

            var internProfile = await _dbContext.InternProfiles.FindAsync(model.InternProfileId);
            if (internProfile == null)
            {
                return 0; // Intern profile not found
            }

            var evaluationForm = new EvaluationFormModel
            {
                EvaluationCriteria = model.EvaluationCriteria,
                Rating = model.Rating,
                Weight = model.Weight,
                InternProfileId = internProfile.Id,
                EvaluatorId = user.Id
            };

            _dbContext.EvaluationForms.Add(evaluationForm);
            await _dbContext.SaveChangesAsync();
            return evaluationForm.Id;
        }

        public async Task<int> CreateOrganizationAsync(OrganizationsModel model)
        {
            try
            {
                // Check if an organization with the same name already exists
                //var existingProfile = await _dbContext.Organizations.FindAsync(model.CompanyName);

                //if (existingProfile != null)
                //{
                //    return -1;
                //}

                var organizationProfile = new OrganizationsModel
                {
                    CompanyName = model.CompanyName
                };

                _dbContext.Organizations.Add(organizationProfile);
                await _dbContext.SaveChangesAsync();
                return organizationProfile.Id;
            }
            catch (Exception ex)
            {
                // Return null to indicate a failure
                return -1;
            }
        }

        public async Task<IEnumerable<OrganizationsModel>> GetOrganizationAsync()
        {
            try
            {
                // Fetch intern profiles from the database
                var organizationProfile = await _dbContext.Organizations.ToListAsync();
                Console.WriteLine("Oreganizations retuened successfully");
                return organizationProfile;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}