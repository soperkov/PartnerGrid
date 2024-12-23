using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace PartnerGrid.Databases
{
    public class DapperDbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }        
    }
}
