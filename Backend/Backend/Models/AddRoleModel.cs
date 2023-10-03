namespace Backend.Models;
using System.ComponentModel.DataAnnotations;

public class AddRoleModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Role { get; set; }
}
