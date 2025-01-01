
namespace PartnerGrid.Models
{
    public class PolicyModel
    {
        public int PolicyId { get; set; }

        public int PartnerId { get; set; }

        public string PolicyNumber { get; set; }

        public decimal PolicyAmount { get; set; }

        //public  PartnerModel Partner { get; set; }

    }
}
