﻿using DataSourceSyeew.Entities.InterfacesEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew.Entities
{
    public class Admin : IUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        [NotMapped]
        public string Role { get; init; } = "Admin";

        //public UserRole Role { get; init; } = UserRole.ADMIN;
        public string Email { get; set; }
        public string Surname { get; set; }
    }
}
