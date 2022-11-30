using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuantitativeDataController : ControllerBase
    {

        private readonly IQuantitativeDataRepository _quantitativeDataRepository;

        public QuantitativeDataController (IQuantitativeDataRepository quantitativeDataRepository)
        {
            _quantitativeDataRepository = quantitativeDataRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuantitativeData>>> GetQuantitativeDatas()
        {
            try
            {
                return Ok(await _quantitativeDataRepository.GetQuantitativeDatas());
            }
            catch (Exception)
            {
                return (OkObjectResult)StatusCode(StatusCodes.Status500InternalServerError, "Error");   
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

    }
}
