using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public int RolID { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string CorreoElectronico { get; set; }
        public string FechaNacimientoString { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Password { get; set; }

    }
}
