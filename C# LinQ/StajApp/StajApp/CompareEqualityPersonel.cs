using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StajApp
{
    internal class CompareEqualityPersonel : IEqualityComparer<Personel>
    {
        public bool Equals(Personel x, Personel y)
        {
            if (x.Ad == y.Ad)
                return true;
            else
                return false;
        }

        public int GetHashCode(Personel obj)
        {
            return obj.Ad.GetHashCode();
        }
    }
}
