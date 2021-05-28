using SingularTech.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Business.Interfaces
{
    public interface IUsuarioManager
    {
        List<Usuario> UsuarioLista();
        void UsuarioInsert(Usuario usuario);
    }
}
