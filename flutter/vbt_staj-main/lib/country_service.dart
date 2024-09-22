import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:vbt_staj/country_model.dart';

class CountryService {
  Future<List<CountryModel>> fetchCountry() async {
    var dio = Dio(BaseOptions(baseUrl: "https://raw.githubusercontent.com/"));
    var response = await dio.get(
        "atilsamancioglu/IA19-DataSetCountries/master/countrydataset.json");
    List<CountryModel> list = countryModelFromJson(response.data);
    print(list.length);
    return list;
  }
}
