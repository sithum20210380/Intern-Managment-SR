using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(RegisterModel model)
        {

            var result = await _userService.RegisterAsync(model);
            return Ok(result);
        }

        [HttpPost("token")]
        public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
        {
            var result = await _userService.GetTokenAsync(model);
            return Ok(result);
        }

        [HttpPost("addrole")]
        public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
        {
            var result = await _userService.AddRoleAsync(model);
            return Ok(result);
        }

        [HttpPost("createinternprofile")]
        public async Task<IActionResult> CreateInternProfileAsync(InternProfileModel model)
        {
            try
            {
                var result = await _userService.CreateInternProfileAsync(model);
                if (result > 0)
                {
                    return Ok($"Intern profile created with ID: {result}");
                }

                return BadRequest("Failed to create intern profile.");
            }
            catch (Exception ex)
            {
                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while saving changes.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }

        }

        [HttpGet("internprofiles")]
        public async Task<IActionResult> GetInternProfilesAsync()
        {
            try
            {
                // Fetch intern profiles from the database using your _userService or _dbContext
                var internProfiles = await _userService.GetInternProfilesAsync();

                // Check if any profiles were found
                if (internProfiles != null && internProfiles.Any())
                {
                    return Ok(internProfiles);
                }

                return NotFound("No intern profiles found.");
            }
            catch (Exception ex)
            {
                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while fetching intern profiles.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }
        }

        [HttpPut("updateinternprofile/{id}")]
        public async Task<IActionResult> UpdateInternProfileAsync(int id, InternProfileModel model)
        {
            var result = await _userService.UpdateInternProfileAsync(id, model);
            if (result > 0)
            {
                return Ok($"Intern profile with ID {result} updated successfully.");
            }
            return NotFound("Intern profile not found.");
        }

        [HttpDelete("deleteinternprofile/{id}")]
        public async Task<IActionResult> DeleteInternProfileAsync(int id)
        {
            var result = await _userService.DeleteInternProfileAsync(id);
            if (result > 0)
            {
                return Ok($"Intern profile with ID {result} deleted successfully.");
            }
            return NotFound("Intern profile not found.");
        }

        [HttpPost("createevaluationform")]
        public async Task<IActionResult> CreateEvaluationFormAsync(EvaluationFormModel model)
        {
            var result = await _userService.CreateEvaluationFormAsync(model);
            if (result > 0)
            {
                return Ok($"Evaluation form created with ID: {result}");
            }
            return BadRequest("Failed to create evaluation form.");
        }

        [HttpPost("createOrganization")]
        public async Task<IActionResult> CreateOrganizationAsync(OrganizationsModel model)
        {
            try
            {
                var result = await _userService.CreateOrganizationAsync(model);
                if (result > 0)
                {
                    return Ok($"Organization created with ID: {result}");
                }

                return BadRequest("Failed to create Organization.");
            }
            catch (Exception ex)
            {
                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while saving changes.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }

        }

        [HttpGet("GetOrganization")]
        public async Task<IActionResult> GetOrganizationAsync()
        {
            try
            {
                // Fetch Organizations from the database using your _userService or _dbContext
                var Organizations = await _userService.GetOrganizationAsync();

                // Check if any profiles were found
                if (Organizations != null && Organizations.Any())
                {
                    return Ok(Organizations);
                }

                return NotFound("No Organizations found.");
            }
            catch (Exception ex)
            {
                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while fetching Organizations.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }
        }

        [HttpDelete("deleteOrganization/{id}")]
        public async Task<IActionResult> DeleteOrganizationAsync(int id)
        {
            var result = await _userService.DeleteOrganizationAsync(id);
            if (result > 0)
            {
                return Ok($"Organizaton with ID {result} deleted successfully.");
            }
            return NotFound("Organizaton not found.");
        }

        [HttpPost("inviteUser")]
        public async Task<IActionResult> InviteUserAsync(InviteUserModel model)
        {
            try
            {
                var result = await _userService.InviteUserAsync(model);
                if (result > 0)
                {
                    return Ok($"Email sent sucessfully: {result}");
                }

                return BadRequest("Failed to send email.");
            }
            catch (Exception ex)
            {
                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while saving changes.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }

        }

    }
}
