using DataSourceSyeew.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSourceSyeew
{
    public class SyeewContext : DbContext
    {

        public DbSet<QuantitativeData> QuantitativeDatas { get; set; }

        public SyeewContext() { }
        public SyeewContext(DbContextOptions<SyeewContext> options) : base(options) { }
    }
}
