﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DataSourceSyeew.Entities.InterfacesEntities
{
    public interface IUser
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Password { get; set; }

        string Role { get; init; }

        //UserRole Role { get; init; }
        string Email { get; set; }
        string Surname { get; set; }
    }
}
