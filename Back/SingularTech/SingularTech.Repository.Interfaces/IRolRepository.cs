using SingularTech.Entities;
using System;
using System.Collections.Generic;

namespace SingularTech.Repository.Interfaces
{
    public interface IRolRepository
    {
        List<Rol> rolLista();
        void rolInsert(Rol rol);

        Rol rolXId(Rol rol);
    }
}
