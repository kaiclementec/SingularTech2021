using SingularTech.Business.Interfaces;
using SingularTech.Entities;
using SingularTech.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SingularTech.Business
{
    public class UsuarioManager : IUsuarioManager
    {
        private readonly IUsuarioRepository _usuarioRepository;
        public UsuarioManager(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public void UsuarioInsert(Usuario usuario)
        {
            usuario.FechaNacimiento = Convert.ToDateTime(usuario.FechaNacimientoString);
            _usuarioRepository.UsuarioInsert(usuario);
        }

        public List<Usuario> UsuarioLista()
        {
            return _usuarioRepository.UsuarioLista();
        }
    }
}
