namespace Backend.Constants
{
    public class Authorization
    {
        public enum Roles
        {
            Administrator,
            Management,
            Evaluator,
            Mentor,
            Intern,
            User
        }
        public const string default_username = "sithum";
        public const string default_email = "sithum@gmail.com";
        public const string default_password = "Password_9.";
        public const string default_firstname = "sithum";
        public const string default_lastname = "raveesha";
        public const Roles default_role = Roles.Administrator;
    }
}
