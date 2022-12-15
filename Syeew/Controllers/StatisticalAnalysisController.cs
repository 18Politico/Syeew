using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Mvc;
using Syeew.DTOs;
using Syeew.Utils;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalAnalysisController : ControllerBase
    {
        private readonly IQuantitativeDataRepository _quantitativeDataRepository;

        private DataStatsCalculator DataStatsCalculator;

        public StatisticalAnalysisController(IQuantitativeDataRepository quantitativeDataRepository)
        {
            _quantitativeDataRepository = quantitativeDataRepository;
            DataStatsCalculator = DataStatsCalculator.GetIstance();
        }

        [HttpGet("/average/nets")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> NetsAverageBy([FromQuery] string companyName,
                                                                                         [FromQuery] DateTime from,
                                                                                         [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.NetsAverage(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/average/revenuesWithIva")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> RevenuesWithIvaAverageBy([FromQuery] string companyName,
                                                                                                   [FromQuery] DateTime from,
                                                                                                   [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.RevenuesWithIvaAverage(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/average/qtys")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> QtysAverageBy([FromQuery] string companyName,
                                                                                        [FromQuery] DateTime from,
                                                                                        [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.QtysAverage(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/mode/nets")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> NetsModeBy([FromQuery] string companyName,
                                                                                     [FromQuery] DateTime from,
                                                                                     [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.NetsMode(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/mode/revenuesWithIva")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> RevenuesWithIvaModeBy([FromQuery] string companyName,
                                                                                                [FromQuery] DateTime from,
                                                                                                [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.RevenuesWithIvaMode(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error");
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/mode/qtys")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> QtysModeBy([FromQuery] string companyName,
                                                                                     [FromQuery] DateTime from,
                                                                                     [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.QtysMode(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/median/nets")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> NetsMedianBy([FromQuery] string companyName,
                                                                                       [FromQuery] DateTime from,
                                                                                       [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.NetsMedian(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/median/revenuesWithIva")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> RevenuesWithIvaMedianBy([FromQuery] string companyName,
                                                                                                  [FromQuery] DateTime from,
                                                                                                  [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.RevenuesWithIvaMedian(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error");
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [HttpGet("/median/qtys")]
        public async Task<ActionResult<ICollection<StatisticalAnalysis>>> QtysMedianBy([FromQuery] string companyName,
                                                                                       [FromQuery] DateTime from,
                                                                                       [FromQuery] DateTime to)
        {
            try
            {
                var datas = await this._quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.Company.CompanyName.ToLower().Equals(companyName.ToLower())
                                                                                                    && DataDateIsBetween(qD.Date, from, to)));

                var stats = DataStatsCalculator.QtysMedian(datas);

                return Ok(stats);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error" + ex);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        private bool DataDateIsBetween(DateTime dtDate, DateTime from, DateTime to)
        {
            return DateTime.Compare(dtDate, from) >= 0 && DateTime.Compare(dtDate, to) <= 0;    
        }

        
    }

}
