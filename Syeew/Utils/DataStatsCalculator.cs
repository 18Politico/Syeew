using DataSourceSyeew.Entities;
using DataSourceSyeew.Entities.InterfacesEntities;
using Syeew.DTOs;

namespace Syeew.Utils
{
    public class DataStatsCalculator
    {
        private static DataStatsCalculator Istance;

        private DataStatsCalculator() { }

        public static DataStatsCalculator GetIstance()
        {
            if (Istance == null)
            {
                Istance = new DataStatsCalculator();
            }
            return Istance;
        }

        public ICollection<StatisticalAnalysis> NetsAverage(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateAverage(NetsFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> RevenuesWithIvaAverage(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateAverage(RevenueWithIvasFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> QtysAverage(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateAverage(QtysFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> NetsMode(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMode(NetsFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> RevenuesWithIvaMode(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMode(RevenueWithIvasFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> QtysMode(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMode(QtysFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> NetsMedian(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMedian(NetsFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> RevenuesWithIvaMedian(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMedian(RevenueWithIvasFrom(group)))));
            return result;
        }

        public ICollection<StatisticalAnalysis> QtysMedian(ICollection<QuantitativeData> datas)
        {
            var result = new LinkedList<StatisticalAnalysis>();

            var res = datas.GroupBy(dt => dt.Dt,
                                   (date, group) => result.AddLast(new StatisticalAnalysis(group.First().Company.NomeAttività,
                                                                                           date.Day,
                                                                                           date.Month,
                                                                                           date.Year,
                                                                                           CalculateMedian(QtysFrom(group)))));
            return result;
        }

        private double[] NetsFrom(IEnumerable<IQuantitativeData> group)
        {
            double[] nets = new double[group.Count()];
            var arrayFromGroup = group.ToArray();
            for (int i = 0; i < group.Count(); i++)
            {
                nets[i] = arrayFromGroup[i].Netto;
            }
            return nets;
        }

        private double[] RevenueWithIvasFrom(IEnumerable<IQuantitativeData> group)
        {
            double[] nets = new double[group.Count()];
            var arrayFromGroup = group.ToArray();
            for (int i = 0; i < group.Count(); i++)
            {
                nets[i] = arrayFromGroup[i].FattIvato;
            }
            return nets;
        }

        private double[] QtysFrom(IEnumerable<IQuantitativeData> group)
        {
            double[] nets = new double[group.Count()];
            var arrayFromGroup = group.ToArray();
            for (int i = 0; i < group.Count(); i++)
            {
                nets[i] = arrayFromGroup[i].Qta;
            }
            return nets;
        }

        private double CalculateAverage(double[] datas)
        {
            return StatisticalAnalysisCalculator.Average(datas);
        }

        private double CalculateMode(double[] datas)
        {
            return StatisticalAnalysisCalculator.Mode(datas);
        }

        private double CalculateMedian(double[] datas)
        {
            return StatisticalAnalysisCalculator.Median(datas);
        }

        private protected static class StatisticalAnalysisCalculator
        {
            public static double Average(double[] datas)
            {
                double sum = 0;
                foreach (var data in datas)
                {
                    sum += data;
                }
                return sum / datas.Length;
            }

            public static double Mode(double[] datas)
            {
                Dictionary<int, double> seen = Countfrequencies(datas);
                var maxKey = seen.Keys.Max();
                double mode;
                seen.TryGetValue(maxKey, out mode);
                return mode;
            }

            private static Dictionary<int, double> Countfrequencies(double[] datas)
            {
                var orderedDatas = datas.OrderBy(num => num).ToList();
                Dictionary<int, double> seen = new Dictionary<int, double>();
                for (int i = 0; i < orderedDatas.Count; i++)
                {
                    int numOfTimes = 1;
                    while ((i + 1) < orderedDatas.Count)
                    {
                        if (orderedDatas[i] == orderedDatas[i + 1])
                        {
                            numOfTimes++;
                            i++;
                        }
                        else
                        {
                            seen.Add(numOfTimes, orderedDatas[i]);
                        }
                    }
                }
                return seen;
            }

            public static double Median(double[] datas)
            {
                datas = datas.OrderBy(num => num).ToArray<double>();
                if (datas.Length % 2 != 0)
                {
                    return OddCase(datas);
                }
                else
                {
                    return EvenCase(datas);
                }
            }

            private static double OddCase(double[] datas)
            {
                int medianItemIndex = (datas.Length) / 2;
                return datas[medianItemIndex];
            }

            //int medianItemIndex = (datas.Length + 1) / 2 ;
            //return datas[medianItemIndex - 1];

            private static double EvenCase(double[] datas)
            {
                int index1 = (datas.Length / 2) - 1;
                int index2 = datas.Length / 2;
                return (datas[index1] + datas[index2]) / 2;
            }

        }


    }
}
