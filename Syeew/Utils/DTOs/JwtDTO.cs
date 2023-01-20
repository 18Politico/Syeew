namespace Syeew.Utils.DTOs
{
    public class JwtDTO
    {
        public string Token { get; set; }
        public JwtDTO(string token)
        {
            Token = token;
        }
    }
}
