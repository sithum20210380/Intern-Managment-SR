using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class EvaluationFormModel
    {
        public int Id { get; set; }

        public string EvaluatorEmail { get; set; }

        [Required]
        public string EvaluationCriteria { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public double Weight { get; set; }

        // Foreign key relationship to InternProfile
        public int InternProfileId { get; set; }
        public InternProfileModel InternProfile { get; set; }

        // Foreign key relationship to ApplicationUser (Evaluator)
        public string EvaluatorId { get; set; }
        public ApplicationUser Evaluator { get; set; }
    }
}
