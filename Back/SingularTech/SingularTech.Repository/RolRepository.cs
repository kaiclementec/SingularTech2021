using Dapper;
using Microsoft.Extensions.Configuration;
using SingularTech.Entities;
using SingularTech.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace SingularTech.Repository
{
    public class RolRepository : IRolRepository
    {
        private readonly IConfiguration _configuration;
        public RolRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public List<Rol> rolLista()
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                try
                {
                    var query = "Rol_List";
                    var result = conn
                        .Query<Rol>(query, null, commandType: CommandType.StoredProcedure)
                        .ToList();
                    
                    return result;
                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    conn.Close();
                }
            }
        }

        public void rolInsert(Rol rol)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                try
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Estado", rol.Estado, DbType.Boolean, ParameterDirection.Input,1);
                    parameters.Add("@Nombre", rol.Nombre, DbType.String, ParameterDirection.Input, 250);

                    var query = "Rol_Insert";
                    var result = conn
                        .Query<Rol>(query, parameters, commandType: CommandType.StoredProcedure)
                        .ToList();
                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    conn.Close();
                }
            }
        }

        public Rol rolXId(Rol rol)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                try
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Id", rol.Id, DbType.Int32, ParameterDirection.Input, 50);

                    var query = "Rol_x_Id";
                    var result = conn
                        .Query<Rol>(query, parameters, commandType: CommandType.StoredProcedure)
                        .FirstOrDefault();

                    return result;
                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    conn.Close();
                }
            }
        }


        private IDbConnection GetConnection()
        {
            var connectionString = _configuration.GetSection("ConnectionStrings").GetSection("SingularTechConnection").Value;
            var conn = new SqlConnection(connectionString);
            return conn;
        }
    }
}
