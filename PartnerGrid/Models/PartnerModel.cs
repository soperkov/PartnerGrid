namespace PartnerGrid.Models
{
    public class PartnerModel
    {
        public int PartnerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string? Address { get; set; }

        public string PartnerNumber { get; set; }

        public string? CroatianPin { get; set; }

        public int PartnerTypeId { get; set; }

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

        public string CreateByUser { get; set; }

        public bool IsForeign { get; set; }

        public string? ExternalCode { get; set; }

        public int PolicyCount { get; set; }

        public double TotalPolicyAmount { get; set; }

        public char Gender { get; set; }

    }
}
