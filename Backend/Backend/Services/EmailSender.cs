using System;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Backend.Services
{
	public class EmailSender
	{
        public async Task SendEmail(string subject, string toEmail, string username, string message)
        {
            try
            {
                var apiKey = "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";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("sithum18raveesha@gmail.com", "Xtership IMS");
                var to = new EmailAddress(toEmail, username);
                var plainTextContent = message;
                var htmlContent = "";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately (e.g., log the error)
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }
    }
}

