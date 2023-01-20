
using System.ComponentModel.DataAnnotations;

namespace Syeew.Utils.DTOs
{
    public class LoginDTO
    {
        public string Name { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
