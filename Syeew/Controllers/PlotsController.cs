using Azure;
using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using MathNet.Numerics.Statistics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Syeew.DTOs;
using Syeew.Utils;
using Syeew.Utils.DTOs;
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

        [HttpGet("{companyWithName}/{from}/{to}/{content}")]
        public async Task<ActionResult<ICollection<BoxPlotDataDTO>>> BoxPlotDataDay([FromQuery] string companyWithName,
                                                                                [FromQuery] string from,
                                                                                [FromQuery] string to,
                                                                                [FromQuery] string content)
        {
            try
            {
                var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(content));
                if (check.Count() == 0)
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await _quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(
                                                                                qD.MatriceNome.ToLower().Equals(companyWithName.ToLower())
                                                                                && DateIsBetween(DateTime.Parse(from), DateTime.Parse(to), qD.Dt)));

                var grouped = filteredData.GroupBy(d => new CustomDate(d.Dt.Day, d.Dt.Month, d.Dt.Year));

                List<BoxPlotDataDTO> response = ObtainStatsFromGroup(grouped, content);

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

        private bool DateIsBetween(DateTime from, DateTime to, DateTime date)
        {
            return DateTime.Compare(date, from) >= 0 && DateTime.Compare(date, to) <= 0;
        }

        private List<BoxPlotDataDTO> ObtainStatsFromGroup(IEnumerable<IGrouping<CustomDate, IQuantitativeData>> groups, string content)
        {
            List<BoxPlotDataDTO> statsFromGroup = new List<BoxPlotDataDTO>();

            foreach (var group in groups)
            {
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

        [HttpGet("{companyWithName}/{from}/{to}/{content}")]
        public async Task<ActionResult<ICollection<BoxPlotDataDTO>>> BoxPlotDataMonth([FromQuery] string companyWithName,
                                                                                         [FromQuery] string from,
                                                                                         [FromQuery] string to,
                                                                                         [FromQuery] string content)
        {
            try
            {
                var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(content));
                if (check.Count() == 0)
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await _quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(
                                                                                qD.MatriceNome.ToLower().Equals(companyWithName.ToLower())
                                                                                && DateIsBetween(DateTime.Parse(from), DateTime.Parse(to), qD.Dt)));

                var grouped = filteredData.GroupBy(d => new CustomDate(-1, d.Dt.Month, d.Dt.Year));

                List<BoxPlotDataDTO> response = ObtainStatsFromGroup(grouped, content);

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

        [HttpGet("{companyWithName}/{from}/{to}/{content}")]
        public async Task<ActionResult<ICollection<DateContentDTO>>> Data([FromQuery] string companyWithName,
                                                                                         [FromQuery] string from,
                                                                                         [FromQuery] string to,
                                                                                         [FromQuery] string content)
        {
            try
            {
                var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(content));
                if (check.Count() == 0)
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await _quantitativeDataRepository.GetBy(qD => new ValueTask<bool>(
                                                                                qD.MatriceNome.ToLower().Equals(companyWithName.ToLower())
                                                                                && DateIsBetween(DateTime.Parse(from), DateTime.Parse(to), qD.Dt)));

                var response = new LinkedList<DateContentDTO>();

                foreach(var data in filteredData)
                {
                    response.AddLast(new DateContentDTO(new CustomDate(data.Dt.Day, data.Dt.Month, data.Dt.Year),
                                                        Double.Parse(data.GetType().GetProperty(content)?.GetValue(data, null)?.ToString()!)));
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

