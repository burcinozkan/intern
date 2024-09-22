using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StajApp
{
    internal static class CarpMaxClass
    {

        public static int CarpMax(this IEnumerable<int> list, int carpim) 
        {
            var sonuc = (from x in list select x).Max();

            return sonuc * carpim;
        }
    }
}
