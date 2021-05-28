using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SingularTech.Business.Interfaces;
using SingularTech.Entities;

namespace SingularTech.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioManager _usuarioManager;
        public UsuarioController(IUsuarioManager usuarioManager)
        {
            _usuarioManager = usuarioManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> Get()
        {
            return _usuarioManager.UsuarioLista();
        }

        [HttpPost]
        public void Post([FromBody] Usuario usuario)
        {
            _usuarioManager.UsuarioInsert(usuario);
        }
    }
}
