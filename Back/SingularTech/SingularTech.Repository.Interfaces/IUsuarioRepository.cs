using SingularTech.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Repository.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuario> UsuarioLista();
        void UsuarioInsert(Usuario usuario);
    }
}
