using DataSourceSyeew.Entities;
using DataSourceSyeew.Repositories.InterfacesRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Syeew.Utils.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Syeew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminLoginController : ControllerBase
    {
        private readonly IAdminRepository _adminService;

        private IConfiguration _config;

        public AdminLoginController(IAdminRepository adminService, IConfiguration config)
        {
            _adminService = adminService;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<JwtDTO>> Login([FromBody] LoginDTO login)
        {
            string token = String.Empty;

            var admin = Authenticate(login);

            if (admin != null)
            {
                token = Generate(admin);
            }
            return await Task.FromResult(new JwtDTO(token));
        }

        private string Generate(Admin admin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, admin.Name),
                new Claim(ClaimTypes.Email, admin.Email),
                //new Claim(ClaimTypes.GivenName, admin.GivenName),
                new Claim(ClaimTypes.Surname, admin.Surname),
                new Claim(ClaimTypes.Role, admin.Role.ToString())

                //TODO: controlla se primary sid va bene
                //,new Claim(ClaimTypes.PrimarySid, admin.Id.ToString())
                // NameIdentifier probabilmente e quello giusto

            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        private Admin? Authenticate(LoginDTO login)
        {
            var currentAdmin = this._adminService.GetBy(dbAdmin => new ValueTask<bool> 
                                                                    (dbAdmin.Name.ToLower() == login.Name.ToLower() 
                                                                     && dbAdmin.Password == login.Password))
                                                 .Result
                                                 .First();

            if (currentAdmin != null)
                return currentAdmin;
            else
                return null;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult<Admin>> GetUserByJwt([FromBody] JwtDTO jwt)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _config["Jwt:Issuer"],
                ValidAudience = _config["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_config["Jwt:key"]!))
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken securityToken;

            var principle = tokenHandler.ValidateToken(jwt.Token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = (JwtSecurityToken)securityToken;

            if (jwtSecurityToken != null && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                                                                                StringComparison.InvariantCultureIgnoreCase))
            {
                var userName = principle.FindFirst(ClaimTypes.Name)?.Value;
                return Ok(await _adminService.GetBy(admin => new ValueTask<bool>(admin.Name.Equals(userName))));
            }

            return NotFound("token strano");
        }

    }
}
