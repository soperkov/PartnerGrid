using Dapper;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;

namespace PartnerGrid.Databases
{
    public class PolicyRepository : IRepository<PolicyModel>
    {
        private readonly DapperDbContext _dbContext;

        public PolicyRepository(DapperDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<PolicyModel>> GetAllAsync()
        {
            var query = "SELECT * FROM Policies";

            using (var connection = _dbContext.CreateConnection())
            {
                return (await connection.QueryAsync<PolicyModel>(query)).ToList();
            }
        }

        public async Task<PolicyModel> GetByIdAsync(int policyId)
        {
            var query = "SELECT * FROM Policies WHERE PolicyId = @PolicyId";

            using (var connection = _dbContext.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<PolicyModel>(query, new { PolicyId = policyId });
            }
        }

        public async Task<int> CreateAsync(PolicyModel policy)
        {
            var query = @"
                INSERT INTO Policies (
                    PartnerId, 
                    PolicyNumber, 
                    PolicyAmount
                ) 
                VALUES (
                    @PartnerId, 
                    @PolicyNumber, 
                    @PolicyAmount
                ); 
                SELECT CAST(SCOPE_IDENTITY() as int);";

            using (var connection = _dbContext.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(query, policy);
            }
        }

        public async Task UpdateAsync(PolicyModel policy)
        {
            var query = @"
                UPDATE Policies
                SET 
                    PartnerId = @PartnerId, 
                    PolicyNumber = @PolicyNumber, 
                    PolicyAmount = @PolicyAmount
                WHERE PolicyId = @PolicyId";

            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, policy);
            }
        }

        public async Task DeleteAsync(int policyId)
        {
            var query = "DELETE FROM Policies WHERE PolicyId = @PolicyId";

            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { PolicyId = policyId });
            }
        }
    }
}
