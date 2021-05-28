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
    public class RolController : ControllerBase
    {
        private readonly IRolManager _rolManager;
        public RolController(IRolManager rolManager)
        {
            _rolManager = rolManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Rol>> Get()
        {
            return _rolManager.rolLista();
        }

        [HttpGet("{id}")]
        public ActionResult<Rol> Get(int id)
        {
            var rol = new Rol();
            rol.Id = id;

            return _rolManager.rolXId(rol);
        }

        [HttpPost]
        public void Post([FromBody] Rol rol)
        {
            _rolManager.rolInsert(rol);
        }
     }
}
