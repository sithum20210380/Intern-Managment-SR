using Backend.Models;

namespace Backend.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<int> CreateInternProfileAsync(InternProfileModel model);
        Task<int> CreateEvaluationFormAsync(EvaluationFormModel model);
        Task<IEnumerable<InternProfileModel>> GetInternProfilesAsync();

    }
}
