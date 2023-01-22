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
using System.Collections;
using System.Data;
using System.Globalization;
using System.Reflection;
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
        public async Task<ActionResult<ICollection<BoxPlotDataDayDTO>>> BoxPlotDataDay([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var grouped = filteredData.GroupBy(d => new {day = d.Dt.Day, month = d.Dt.Month, year = d.Dt.Year } ); 

                List<BoxPlotDataDayDTO> response = ObtainStatsFromGroup(grouped, request.Content);

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
            DateTime from = new DateTime(customFrom.Year, customFrom.Month, customFrom.Day);
            DateTime to = new DateTime(customTo.Year, customTo.Month, customTo.Day);
            return DateTime.Compare(dateToCheck, from) >= 0 && DateTime.Compare(dateToCheck, to) <= 0;
        }


        private List<BoxPlotDataDayDTO> ObtainStatsFromGroup(IEnumerable<IGrouping<dynamic, IQuantitativeData>> groups, string content)
        {
            List<BoxPlotDataDayDTO> statsFromGroup = new List<BoxPlotDataDayDTO>();

            for (int i = 0; i < groups.Count(); i++)
            {
                var group = groups.ElementAt(i);
                var firstData = group.ElementAt(0);
                var customDate = new CustomDate(firstData.Dt.Day, firstData.Dt.Month - 1, firstData.Dt.Year);
                var boxPlotData = new BoxPlotDataDayDTO(customDate);
                var properties = new double[group.Count()];

                for (int j = 0; j < group.Count(); j++)
                {
                    var data = group.ElementAt(j);
                    var property = data.GetType().GetProperty(content)?.GetValue(data, null)?.ToString();
                    properties[j] = Double.Parse(property!);
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
        public async Task<ActionResult<ICollection<BoxPlotDataMonthDTO>>> BoxPlotDataMonth([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var groupes = filteredData.GroupBy(d => new { month = d.Dt.Month, year = d.Dt.Year })
                                          .OrderBy(g => g.First().Dt.Year)
                                          ;//.ThenBy(d => d.First().Dt.Month);

                LinkedList<BoxPlotDataMonthDTO> response = new(); 
                //List<BoxPlotDataDayDTO> list = new();
                for (int i = 0; i < groupes.Count(); i++) {
                    var group = groupes.ElementAt(i);
                    var orderedGroup = group.OrderBy(d => d.Dt.Month).ToArray();
                    var stats = OrderedGroups(orderedGroup, request.Content);
                    LinkedList<string> months = new();
                    double[] numbers = new double[5];
                    foreach (var stat in stats)
                    {
                        //LinkedList<string> months = new();
                        var date = stat.Date;
                        var month = new DateTime(date.Year, date.Month, date.Day)
                                    .ToString("MMM", CultureInfo.InvariantCulture);

                        months.AddLast(month);
                        numbers = stat.Stats;
                    }
                    var boxPlotData = new BoxPlotDataMonthDTO(months.ToArray(),stats: numbers);
                    response.AddLast(boxPlotData);
                }

                //foreach(var group in groupes) { group = group.OrderBy(d => d.Dt.Month).ToList(); }
                 
                //var groups = ObtainStatsFromGroup(grouped, request.Content);

                //List<BoxPlotDataMonthDTO> response = new(); //ObtainStatsFromGroup(grouped, request.Content);



                //List<List<IQuantitativeData>> groups = new();

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

        private List<BoxPlotDataDayDTO> /*void*/ OrderedGroups(IQuantitativeData[] group, /*ref List<BoxPlotDataDayDTO> list,*/ string content)
        {
            List<BoxPlotDataDayDTO> list = new List<BoxPlotDataDayDTO>();

            //for (int i = 0; i < groups.Count(); i++)
            //{
                //var group = group_prmt[0];
                var firstData = group[0];
                var customDate = new CustomDate(firstData.Dt.Day, firstData.Dt.Month - 1, firstData.Dt.Year);
                var boxPlotData = new BoxPlotDataDayDTO(customDate);
                var properties = new double[group.Length];

                for (int j = 0; j < group.Length; j++)
                {
                    var data = group.ElementAt(j);
                    var property = data.GetType().GetProperty(content)?.GetValue(data, null)?.ToString();
                    properties[j] = Double.Parse(property!);
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
                list.Add(boxPlotData);
            //}
            return list;
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
                    response.AddLast(new TemporalDataDTO(new CustomDate(data.Dt.Day, data.Dt.Month-1, data.Dt.Year),
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

