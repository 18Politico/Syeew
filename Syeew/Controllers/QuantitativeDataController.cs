﻿using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MathNet.Numerics.Statistics;
using Syeew.DTOs;
using System.Collections;
using Microsoft.AspNetCore.Authorization;
using System.Data;

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

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<ICollection<QuantitativeData>>> GetQuantitativeDatas()
        {
            try
            {
                return Ok(await _quantitativeDataRepository.GetQuantitativeDatas());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error");   
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{companyWithName}")]
        public async Task<ActionResult<ICollection<QuantitativeData>>> QuantitativeDatasOf([FromQuery] string companyWithName)
        {
            try
            {
                return Ok(await _quantitativeDataRepository.GetBy(qD => 
                            new ValueTask<bool>(qD.MatriceNome.ToLower()
                                                .Contains(companyWithName.ToLower())))
                        );
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error");
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<QuantitativeData>> InsertQuantitativeData([FromBody] QuantitativeData quantitativeData)
        {
            try
            {
                return Ok(await _quantitativeDataRepository.Add(quantitativeData));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error");
            }
            finally
            {
                _quantitativeDataRepository.Dispose();
            }
        }

    }
}
