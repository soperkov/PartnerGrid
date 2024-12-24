using Dapper;
using PartnerGrid.Models;
using PartnerGrid.Interfaces;


namespace PartnerGrid.Databases
{
    public class PartnerRepository : IRepository<PartnerModel>
    {
        private readonly DapperDbContext _dbContext;

        public PartnerRepository(DapperDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<PartnerModel>> GetAllAsync()
        {
            var query = "SELECT * FROM Partners";

            using (var connection = _dbContext.CreateConnection())
            {
                return (await connection.QueryAsync<PartnerModel>(query)).ToList();
            }
        }

        public async Task<PartnerModel> GetByIdAsync(int partnerId)
        {
            var query = "SELECT * FROM Partners WHERE PartnerId = @PartnerId";

            using (var connection = _dbContext.CreateConnection())
            {
                return (await connection.QuerySingleOrDefaultAsync<PartnerModel>(query, new { PartnerId = partnerId }));
            }
        }

        public async Task<int> CreateAsync(PartnerModel partner)
        {
            var query = @"
                INSERT INTO Partners (
                    FirstName, 
                    LastName, 
                    Address, 
                    PartnerNumber, 
                    CroatianPin, 
                    PartnerTypeId, 
                    CreatedAtUtc, 
                    CreateByUser, 
                    IsForeign, 
                    ExternalCode, 
                    Gender
                ) 
                VALUES (
                    @FirstName, 
                    @LastName, 
                    @Address, 
                    @PartnerNumber, 
                    @CroatianPin, 
                    @PartnerTypeId, 
                    @CreatedAtUtc, 
                    @CreateByUser, 
                    @IsForeign, 
                    @ExternalCode, 
                    @Gender
                ); 
                SELECT CAST(SCOPE_IDENTITY() as int);";

            using (var connection = _dbContext.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(query, partner);
            }
        }

        public async Task UpdateAsync(PartnerModel partner)
        {
            var query = @"
                UPDATE Partners
                SET 
                    FirstName = @FirstName, 
                    LastName = @LastName, 
                    Address = @Address,
                    PartnerNumber = @PartnerNumber, 
                    CroatianPin = @CroatianPin,
                    PartnerTypeId = @PartnerTypeId,
                    CreatedAtUtc = @CreatedAtUtc, 
                    CreateByUser = @CreateByUser, 
                    IsForeign = @IsForeign, 
                    ExternalCode = @ExternalCode, 
                    Gender = @Gender
                WHERE PartnerId = @PartnerId";

            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, partner);
            }
        }

        public async Task DeleteAsync(int partnerId)
        {
            var query = "DELETE FROM Partners WHERE PartnerId = @PartnerId";

            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { PartnerId = partnerId });
            }
        }
    }
}
