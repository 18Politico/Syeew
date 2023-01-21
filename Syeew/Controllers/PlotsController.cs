using Azure;
using Azure.Core;
using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using MathNet.Numerics.Statistics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Syeew.DTOs;
using Syeew.Utils;
using Syeew.Utils.DTOs;
using System.Data;
using System.Text.RegularExpressions;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlotsController : ControllerBase
    {
        private readonly IQuantitativeDataRepository _quantitativeDataRepository;
        public PlotsController(IQuantitativeDataRepository quantitativeDataRepository)
        {
            _quantitativeDataRepository = quantitativeDataRepository;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<BoxPlotDataDTO>>> BoxPlotDataDay([FromBody] RequestDataDTO request)
        {
            try
            {
                //var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(request.Content));
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                //var filteredData = await _quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(
                //                                                                qD.MatriceNome.ToLower().Equals(request.CompanyName.ToLower())
                //                                                                && DateIsBetween(request.From, request.To, qD.Dt)));

                var filteredData = await this.GetFilteredData(request);

                var grouped = filteredData.GroupBy(d => new CustomDate(d.Dt.Day, d.Dt.Month + 1, d.Dt.Year));

                List<BoxPlotDataDTO> response = ObtainStatsFromGroup(grouped, request.Content);

                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        private bool ContentIsNotValid(RequestDataDTO request)
        {
            var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(request.Content));
            if (check.Count() == 0)
                return true;
            return false;
        }

        private Task<ICollection<QuantitativeData>> GetFilteredData(RequestDataDTO request)
        {
            return _quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(qD.MatriceNome.ToLower().Contains(request.CompanyName.ToLower())
                                                                               && DateIsBetween(request.From, request.To, qD.Dt)));
        }

        private bool DateIsBetween(CustomDate customFrom, CustomDate customTo, DateTime dateToCheck)
        {
            DateTime from = new DateTime(customFrom.Year, customFrom.Month+1, customFrom.Day);
            DateTime to = new DateTime(customTo.Year, customTo.Month+1, customTo.Day);
            return DateTime.Compare(dateToCheck, from) >= 0 && DateTime.Compare(dateToCheck, to) <= 0;
        }

        private List<BoxPlotDataDTO> ObtainStatsFromGroup(IEnumerable<IGrouping<CustomDate, IQuantitativeData>> groups, string content)
        {
            List<BoxPlotDataDTO> statsFromGroup = new List<BoxPlotDataDTO>();

            foreach (var group in groups)
            {
                group.Key.Month -= 1; 
                var boxPlotData = new BoxPlotDataDTO(group.Key);
                var properties = new double[group.Count()];

                for (int i = 0; i < group.Count(); i++)
                {
                    var data = group.ElementAt(i);
                    var property = data.GetType().GetProperty(content)?.GetValue(data, null)?.ToString();
                    properties[i] = Double.Parse(property!);
                }
                //var Stats = new DescriptiveStatistics(properties);
                var minimum = Statistics.Minimum(properties);
                boxPlotData.Stats[0] = minimum;
                var firstQuartile = Statistics.LowerQuartile(properties);
                boxPlotData.Stats[1] = firstQuartile;
                var median = Statistics.Median(properties);
                boxPlotData.Stats[2] = median;
                var thirdQuartile = Statistics.UpperQuartile(properties);
                boxPlotData.Stats[3] = thirdQuartile;
                var maximum = Statistics.Maximum(properties);
                boxPlotData.Stats[4] = maximum;
                statsFromGroup.Add(boxPlotData);
            }

            return statsFromGroup;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<BoxPlotDataDTO>>> BoxPlotDataMonth([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var grouped = filteredData.GroupBy(d => new CustomDate(-1, d.Dt.Month+1, d.Dt.Year));

                List<BoxPlotDataDTO> response = ObtainStatsFromGroup(grouped, request.Content);

                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }


        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<TemporalDataDTO>>> TemporalDataDay([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var response = new LinkedList<TemporalDataDTO>();

                foreach(var data in filteredData)
                {
                    response.AddLast(new TemporalDataDTO(new CustomDate(data.Dt.Day, data.Dt.Month+1, data.Dt.Year),
                                                        Double.Parse(data.GetType().GetProperty(request.Content)?.GetValue(data, null)?.ToString()!)));
                }

                return Ok(response);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }


        }

    }
}

