using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class InternProfileModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required] 
        public string? Email { get; set; }

        [Required]
        public string? University { get; set; }

        public int InterviewScore { get; set; }
        public string? InterviewFeedback { get; set; }
        public string? Evolution1Score { get; set; }
        public string? Evolution1Feedback { get; set; }
        public string? Evolution2Score { get; set; }
        public string? Evolution2Feedback { get; set; }
        public string? Accomplishments { get; set; }
        public double GPA { get; set; }
        public string? ProjectDetails { get; set; }
        public string? AssignedTeam { get; set; }
        public string? Mentor { get; set; }
        public string? UploadCV { get; set; }
        public string? Status { get; set; }
    }
}
