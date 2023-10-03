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
                // Log the exception for debugging purposes
                // logger.LogError(ex, "Error while fetching intern profiles");

                // Return the inner exception message and stack trace for more details
                var errorMessage = ex.InnerException?.Message ?? "An error occurred while fetching intern profiles.";
                var stackTrace = ex.StackTrace;

                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = errorMessage, StackTrace = stackTrace });
            }
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
    }
}
