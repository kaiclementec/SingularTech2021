using SingularTech.Business.Interfaces;
using SingularTech.Entities;
using SingularTech.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Business
{
    public class RolManager : IRolManager
    {
        private readonly IRolRepository _rolRepository;
        public RolManager(IRolRepository rolRepository)
        {
            _rolRepository = rolRepository;
        }

        public void rolInsert(Rol rol)
        {
            _rolRepository.rolInsert(rol);
        }

        public List<Rol> rolLista()
        {
            return _rolRepository.rolLista();
        }

        public Rol rolXId(Rol rol)
        {
            return _rolRepository.rolXId(rol);
        }
    }
}
