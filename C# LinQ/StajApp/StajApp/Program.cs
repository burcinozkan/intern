#region Day 1 - Try-Catch & Transaction

//var isim = "sertan";
//int sayı = Convert.ToInt32(isim);

//try
//{
//    var isim = "sertan";
//    int sayi = Convert.ToInt32(isim);
//}
//catch (Exception ex)
//{
//    Console.WriteLine("Hata : " + ex.ToString());
//}

//try
//{
//    var isim = "sertan";
//    int sayi = Convert.ToInt32(isim);
//}
//catch (FormatException ex)
//{

//}
//catch (OverflowException ex)
//{

//}
//catch (Exception ex)
//{

//}
//finally
//{
//    Console.WriteLine("İşlem bitti");
//}

//try
//{
//    var isim = "sertan";
//    int sayi = Convert.ToInt32(isim);
//}
//catch (FormatException ex)
//{

//}
//catch (Exception ex2)
//{

//}

//static bool LogException(Exception exception)
//{
//    return false;
//}

//static bool LogException2(Exception exception)
//{
//    return true;
//}

//using StajApp;
//using System.Data.SqlClient;

//try
//{
//	throw new CustomException("Özel bir hata oluştu", new Exception("InnerException hatası"), "Ek bilgi : ....");
//}
//catch (CustomException ex)
//{
//	Console.WriteLine("Özel hata oluştu " + ex.Message);
//    Console.WriteLine("Ek bilgi " + ex.AdditionalInfo);
//    Console.WriteLine("Ek bilgi " + ex.InnerException.Message);
//}

//try
//{
//	throw new ApplicationException("işlem hatası");
//}
//catch (Exception ex1)
//{
//	try
//	{
//		throw new ApplicationException("hata2",ex1);
//	}
//	catch (Exception ex2)
//	{
//		Console.WriteLine("hata yakalandı" + ex2.Message);
//		if (ex2.InnerException != null)
//		{
//			Console.WriteLine(ex1.Message);
//            Console.WriteLine(ex2.InnerException.Message);
//        }
//	}
//}

//string connectionString = "Data Source=.;Integrated Security=True;Connect Timeout=30;Encrypt=False";

//SqlTransaction transaction = null;

//using (SqlConnection contex = new SqlConnection(connectionString))
//{
//	try
//	{
//		contex.Open();

//		transaction = contex.BeginTransaction();

//		SqlCommand cmd = new SqlCommand("insert into StajDB.dbo.Personel (IdPersonel, PersonelAd, PersonelSoyad, PersonelNo) values (1, 'sertan', 'kula', 1)", contex, transaction);
//        SqlCommand cmd2 = new SqlCommand("insert into StajDB.dbo.Personel (IdPersonel, PersonelAd, PersonelSoyad, PersonelNo) values (2, 'sertan', 'kula', 2)", contex, transaction);
//        SqlCommand cmd3 = new SqlCommand("insert into StajDB.dbo.Personel (IdPersonel, PersonelAd, PersonelSoyad, PersonelNo) values (1, 'sertan', 'kula', 1)", contex, transaction);

//        cmd.ExecuteNonQuery();
//		transaction.Save("burayadon");
//        cmd2.ExecuteNonQuery();
//        cmd3.ExecuteNonQuery();

//		transaction.Commit();
//    }
//	catch (Exception)
//	{
//		transaction.Rollback("burayadon");
//		transaction.Commit();
//	}
//	finally 
//	{ 
//		contex.Close(); 
//	}
//}

#endregion

#region Day 2 - LinQ

//using StajApp;

//var sayilar = new int[] { 1, 2, 3, 11, 12, 13 };
//var sayilar2 = new int[] { 1, 2, 3, 14, 15, 16 };

//var sonuc = from x in sayilar
//            where x < 10
//            select x;

//IEnumerable<int> sonuc = sayilar.Where(x => x < 10);

//var sayiList = new List<int>();
//foreach (var say in sayilar)
//{
//    if (say < 10)
//    {
//        sayiList.Add(say);
//    }
//}

//foreach (var say in sonuc)
//{
//    Console.WriteLine(say);
//}

//var personeller = new List<Personel>
//{
//    new Personel() {Ad = "testAd1", Soyad = "testSoyad1", PersonelNo = 1, ProjeId = 1},
//    new Personel() {Ad = "testAd1", Soyad = "testSoyad2", PersonelNo = 2, ProjeId = 1},
//    new Personel() {Ad = "testAd3", Soyad = "testSoyad3", PersonelNo = 3, ProjeId = 2},
//    new Personel() {Ad = "testAd3", Soyad = "testSoyad4", PersonelNo = 4, ProjeId = 4}
//};

//var sonuc = from x in personeller
//            select x;

//var sonuc = personeller.Where(x => x.PersonelNo == 1 || x.ProjeId == 1).Select(x => x.Ad);

//var sonuc = from x in personeller
//            where x.PersonelNo == 1 || x.ProjeId == 1
//            select x.Soyad;

//var sonuc = (from x in personeller
//            orderby x.Ad descending, x.Soyad
//            select x.Ad).Reverse();

//var sonuc = personeller.Select(x => x.Ad).Reverse();

//var sonuc = personeller.OrderBy(x => x, new ComparePersonel()).Select(x => x.Ad);

//var sonuc = from x in personeller
//            group x by x.Ad into adGroup
//            select adGroup.Key;

//var sonuc = personeller.GroupBy(x => x.Ad).Select(x => x.Key);

//var sonuc = from x in personeller
//            group x by x. Ad != "testAd4";

//var sonuc = personeller.GroupBy(x => x.Ad != "testAd4").Select(x => x.Key);

//var sonuc = personeller.GroupBy(x => x, new CompareEqualityPersonel());

//var projeler = new List<Proje>
//{
//    new Proje(){ProjeId = 1, ProjeAd = "testProje1"},
//    new Proje(){ProjeId = 2, ProjeAd = "testProje2"},
//    new Proje(){ProjeId = 3, ProjeAd = "testProje3"}
//};

//var sonuc = from x in personeller
//            join y in projeler on x.ProjeId equals y.ProjeId
//            select new { Adı = x.Ad + ' ' + x.Soyad, ProjeAdı = y.ProjeAd };

//var sonuc = personeller.Join(projeler, x => x.ProjeId, y => y.ProjeId, (x, y) => new { Adı = x.Ad + ' ' + x.Soyad, ProjeAdı = y.ProjeAd });

//var sonuc = from x in personeller
//            from y in projeler
//            where x.ProjeId == y.ProjeId
//            select new { Adı = x.Ad + ' ' + x.Soyad, ProjeAdı = y.ProjeAd };

//var sonuc = from x in personeller
//            join y in projeler on x.ProjeId equals y.ProjeId into prj
//            from y in prj.DefaultIfEmpty()
//            select new { Adı = x.Ad + ' ' + x.Soyad, ProjeAdı = y == null ? "kayıt_yok" : y.ProjeAd };

//var sonuc = personeller.SelectMany(x => projeler.Where(y => y.ProjeId == x.ProjeId), (x, y) => new { Adı = x.Ad + ' ' + x.Soyad, ProjeAdı = y.ProjeAd });

//var sonuc = from x in sayilar
//            where x < 10
//            select x;

//var sonuc = (from x in sayilar
//            where x < 10
//            select x).ToList();

//for (int i = 0; i < sayilar.Length; i++)
//{
//    sayilar[i] = sayilar[i] - 5;
//}

//var sonuc = personeller.SkipWhile(x => x.PersonelNo == 4);

//var sonuc = (from x in personeller
//            select x).Take(2);

//var sonuc = personeller.Select(x => x.Ad).Distinct();

//var sonuc = sayilar.Except(sayilar2);

//var sonuc = personeller.ToDictionary(x => x.PersonelNo);

//var sonuc2 = sonuc[3].Ad + ' ' + sonuc[3].Soyad;

//var karisikList = new object[] { 1, 2, 3, "test1", "test2" };

//var sonuc = karisikList.OfType<string>();

//var sonuc = personeller.FirstOrDefault(x => x.Ad == "testAd5");

//var sonuc = Enumerable.Repeat(4, 3);

//var sonuc = personeller.Any(x => x.PersonelNo == 5);

//var sonuc = personeller.Count(x => x.Ad == "testAd1");

//var sonuc = sayilar.Sum();

//var sonuc = personeller.Select(x => x.Ad).Min(x => x.Length);

//var sonuc = sayilar.Max();

//foreach (var item in sonuc)
//{
//    Console.WriteLine(item);
//}

//var sonuc = sayilar.Average();

//var sonuc = sayilar.CarpMax(4);

//Console.WriteLine(sonuc);

#endregion