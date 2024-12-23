using Dapper;
using PartnerGrid.Models;


namespace PartnerGrid.Databases
{
    public class PartnerRepository
    {
        private readonly DapperDbContext _dbContext;

        public PartnerRepository(DapperDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<PartnerModel>> GetAllPartnersAsync()
        {
            var query = "SELECT * FROM Partners";

            using (var connection = _dbContext.CreateConnection())
            {
                return (await connection.QueryAsync<PartnerModel>(query)).ToList();
            }
        }

        public async Task<PartnerModel> GetPartnerByIdAsync(int partnerId)
        {
            var query = "SELECT * FROM Partners WHERE PartnerId = @PartnerId";

            using (var connection = _dbContext.CreateConnection())
            {
                return (await connection.QuerySingleOrDefaultAsync<PartnerModel>(query, new { PartnerId = partnerId }));
            }
        }

        public async Task<int> CreatePartnerAsync(PartnerModel partner)
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

        public async Task UpdatePartnerAsync(PartnerModel partner)
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

        public async Task DeletePartnerAsync(int partnerId)
        {
            var query = "DELETE FROM Partners WHERE PartnerId = @PartnerId";

            using (var connection = _dbContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { PartnerId = partnerId });
            }
        }
    }
}
