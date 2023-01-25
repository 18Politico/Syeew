using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private static readonly string V = UserRole.ADMIN.ToString();
        private readonly ICompanyRepository _repository;

        public CompanyController(ICompanyRepository repository)
        {
            _repository = repository;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<ICollection<Company>>> GetCompanies()
        {
            try
            {
                return Ok(await _repository.GetCompanies());
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error " + e);
            }
            finally
            {
                _repository.Dispose();
            }
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet("{companyName}")]
        public async Task<ActionResult<Company>> GetCompanyBy(string companyName)
        {
            try
            {
                var result = await _repository.GetBy(c => new ValueTask<bool>(c.NomeAttivita.Equals(companyName)));

                var company = result.ElementAt(0);

                return Ok(company);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error " + e);
            }
            finally
            {
                _repository.Dispose();
            }
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Company>> InsertCompany([FromBody] Company company)
        {
            try
            {
                return Ok(await _repository.Add(company));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error " + e);
            }
            finally
            {
                _repository.Dispose();
            }
        }

    }
}
