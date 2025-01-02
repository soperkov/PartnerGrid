using PartnerGrid.Models;

namespace PartnerGrid.Interfaces
{
    public interface IPolicyRepository : IRepository<PolicyModel>
    {
        Task<IEnumerable<PolicyModel>> GetAllAsync();

        Task<int> CreateAsync(PolicyModel entity);

        Task<PolicyModel> GetByIdAsync(int id);

        Task UpdateAsync(PolicyModel entity);

        Task DeleteAsync(int id);

        Task<IEnumerable<PolicyModel>> GetPoliciesByPartnerIdAsync(int id);
    }
}
