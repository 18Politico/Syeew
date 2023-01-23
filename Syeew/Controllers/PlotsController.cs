using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using MathNet.Numerics.Statistics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syeew.DTOs;
using Syeew.Utils;
using Syeew.Utils.DTOs;
using System.Data;
using System.Globalization;

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

                List<BoxPlotDataDayDTO> response = ObtainStatsFromGroup(grouped, request.ContentY);

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
            var check = typeof(QuantitativeData).GetProperties().Where(info => info.Name.Equals(request.ContentY));
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
                var minimum = Math.Round( Statistics.Minimum(properties), 2);
                boxPlotData.Stats[0] = minimum;
                var firstQuartile = Math.Round( Statistics.LowerQuartile(properties), 2);
                boxPlotData.Stats[1] = firstQuartile;
                var median = Math.Round( Statistics.Median(properties), 2 );
                boxPlotData.Stats[2] = median;
                var thirdQuartile = Math.Round(  Statistics.UpperQuartile(properties), 2);
                boxPlotData.Stats[3] = thirdQuartile;
                var maximum = Math.Round( Statistics.Maximum(properties), 2);
                boxPlotData.Stats[4] = maximum;
                statsFromGroup.Add(boxPlotData);
            }

            return statsFromGroup;
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<BoxPlotDataMonthDTO>> BoxPlotDataMonth([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var groupes = filteredData.GroupBy(d => new { month = d.Dt.Month, year = d.Dt.Year })
                                          .OrderBy(g => g.First().Dt.Year);

                LinkedList<string> months = new(); 
                LinkedList<double[]> numbers = new();
                for (int i = 0; i < groupes.Count(); i++) {
                    var group = groupes.ElementAt(i);
                    var orderedGroup = group.OrderBy(d => d.Dt.Month).ToArray();
                    var stats = OrderedGroups(orderedGroup, request.ContentY);
                    foreach (var stat in stats)
                    {
                        var date = stat.Date;
                        var date_converted = new DateTime(date.Year, date.Month + 1, date.Day);
                        var month = date_converted.ToString("MMM", CultureInfo.InvariantCulture) + " " + date.Year.ToString();
                        months.AddLast(month);
                        numbers.AddLast(stat.Stats);
                    }
                    
                }

                var response = new BoxPlotDataMonthDTO(months.ToArray(), numbers.ToArray());

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

        //Da usare questo anche per le statistiche giornaliere 
        private List<BoxPlotDataDayDTO> OrderedGroups(IQuantitativeData[] group, string content)
        {
            List<BoxPlotDataDayDTO> list = new();

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
            var minimum = Math.Round(Statistics.Minimum(properties), 2);
            boxPlotData.Stats[0] = minimum;
            var firstQuartile = Math.Round(Statistics.LowerQuartile(properties), 2);
            boxPlotData.Stats[1] = firstQuartile;
            var median = Math.Round(Statistics.Median(properties), 2);
            boxPlotData.Stats[2] = median;
            var thirdQuartile = Math.Round(Statistics.UpperQuartile(properties), 2);
            boxPlotData.Stats[3] = thirdQuartile;
            var maximum = Math.Round(Statistics.Maximum(properties), 2);
            boxPlotData.Stats[4] = maximum;
            list.Add(boxPlotData);
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
                                                        Double.Parse(data.GetType().GetProperty(request.ContentY)?.GetValue(data, null)?.ToString()!)));
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

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<PieDataDTO>>> PieDataMonth([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var groups = filteredData.GroupBy(d => new { label = d.Cat1, month = d.Dt.Month, year = d.Dt.Year });

                Console.WriteLine("numero di gruppi = " + groups.Count());


                LinkedList<TemporalDataDTO> response = new();

                foreach (var group in groups)
                {
                    Console.WriteLine("numero di elementi nel gruppo = " + group.Count());

                    double contentData = 0;
                    foreach(var data in group)
                    {
                        contentData += Double.Parse(data.GetType().GetProperty(request.ContentY)?.GetValue(data, null)?.ToString()!);
                    }
                    var toAddInResponse = new PieDataDTO(group.First().Cat1, contentData);
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

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<ICollection<ParameterDataDTO>>> ParameterDataDay([FromBody] RequestDataDTO request)
        {
            try
            {
                if (ContentIsNotValid(request))     
                    throw new ArgumentException("Content " + "\"content\"" + "non valido");

                var filteredData = await this.GetFilteredData(request);

                var groups = filteredData.GroupBy(d => new {  day = d.Dt.Day, month = d.Dt.Month, year = d.Dt.Year });

                LinkedList<TemporalDataDTO> response = new();

                foreach (var group in groups)
                {
                    double contentData = 0;
                    foreach (var data in group)
                    {
                        contentData += Double.Parse(data.GetType().GetProperty(request.ContentY)?.GetValue(data, null)?.ToString()!);
                    }
                    var toAddInResponse = new PieDataDTO(group.First().Cat1, contentData);
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

