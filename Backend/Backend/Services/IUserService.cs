using Backend.Models;

namespace Backend.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<IEnumerable<ApplicationUser>> GetInviteUserAsync();

        Task<int> CreateInternProfileAsync(InternProfileModel model);
        Task<int> UpdateInternProfileAsync(int id, InternProfileModel model);
        Task<int> DeleteInternProfileAsync(int id);
        Task<IEnumerable<InternProfileModel>> GetInternProfilesAsync();

        Task<int> CreateEvaluationFormAsync(EvaluationFormModel model);
        
        Task<int> CreateOrganizationAsync(OrganizationsModel model);
        Task<IEnumerable<OrganizationsModel>> GetOrganizationAsync();
        Task<int> DeleteOrganizationAsync(int id);

        Task<int> InviteUserAsync(InviteUserModel model);
        
    }
}
