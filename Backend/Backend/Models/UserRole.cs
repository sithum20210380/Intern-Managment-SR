namespace Backend.Models;
using System.ComponentModel.DataAnnotations;

public class UserRole
{
    [Key]
    public int RoleID { get; set; }
    public string RoleName { get; set; }
}

