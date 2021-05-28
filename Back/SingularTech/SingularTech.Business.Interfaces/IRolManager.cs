using SingularTech.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Business.Interfaces
{
    public interface IRolManager
    {
        List<Rol> rolLista();
        void rolInsert(Rol rol);
        Rol rolXId(Rol rol);
    }
}
