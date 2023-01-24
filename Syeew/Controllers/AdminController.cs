using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Syeew.DTOs;
using Syeew.Utils.DTOs;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<Admin>>> RegisterNewAdmin([FromBody] Admin admin)
        {
            try
            {
                return Ok(await _adminRepository.Add(admin));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
            finally
            {
                _adminRepository.Dispose();
            }
        }
    }
}
