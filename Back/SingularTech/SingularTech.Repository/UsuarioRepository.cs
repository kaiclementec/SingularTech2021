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
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IConfiguration _configuration;
        public UsuarioRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void UsuarioInsert(Usuario usuario)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                try
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Nombres", usuario.Nombres, DbType.String, ParameterDirection.Input, 250);
                    parameters.Add("@Apellidos", usuario.Apellidos, DbType.String, ParameterDirection.Input, 250);
                    parameters.Add("@CorreoElectronico", usuario.CorreoElectronico, DbType.String, ParameterDirection.Input, 250);
                    parameters.Add("@FechaNacimiento", usuario.FechaNacimiento, DbType.DateTime, ParameterDirection.Input, 250);
                    parameters.Add("@Password", usuario.Password, DbType.String, ParameterDirection.Input, 250);
                    parameters.Add("@RolID", usuario.RolID, DbType.Int32, ParameterDirection.Input, 250);

                    var query = "Usuario_Insert";
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

        public List<Usuario> UsuarioLista()
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                try
                {
                    var query = "Usuario_List";
                    var result = conn
                        .Query<Usuario>(query, null, commandType: CommandType.StoredProcedure)
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

        private IDbConnection GetConnection()
        {
            var connectionString = _configuration.GetSection("ConnectionStrings").GetSection("SingularTechConnection").Value;
            var conn = new SqlConnection(connectionString);
            return conn;
        }
    }
}
