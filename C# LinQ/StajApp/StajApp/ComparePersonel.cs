using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StajApp
{
    internal class ComparePersonel : IComparer<Personel>
    {
        public int Compare(Personel x, Personel y)
        {
            if (x.Ad != y.Ad)
                return string.Compare(x.Ad, y.Ad);
            else
                return string.Compare(x.Soyad, y.Soyad);
        }
    }
}
