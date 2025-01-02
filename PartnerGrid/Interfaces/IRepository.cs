namespace PartnerGrid.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();

        Task<int> CreateAsync(T entity);

        Task<T> GetByIdAsync(int id);

        Task UpdateAsync(T entity);

        Task DeleteAsync(int id);
    }
}
