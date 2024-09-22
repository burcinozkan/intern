import 'dart:convert';

List<CountryModel> countryModelFromJson(String str) => List<CountryModel>.from(
    json.decode(str).map((x) => CountryModel.fromJson(x)));

String countryModelToJson(List<CountryModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class CountryModel {
  String? name;
  String? capital;
  String? region;
  String? currency;
  String? flag;
  String? language;

  CountryModel({
    this.name,
    this.capital,
    this.region,
    this.currency,
    this.flag,
    this.language,
  });

  factory CountryModel.fromJson(Map<String, dynamic> json) => CountryModel(
        name: json["name"],
        capital: json["capital"],
        region: json["region"],
        currency: json["currency"],
        flag: json["flag"],
        language: json["language"],
      );

  Map<String, dynamic> toJson() => {
        "name": name,
        "capital": capital,
        "region": region,
        "currency": currency,
        "flag": flag,
        "language": language,
      };
}
