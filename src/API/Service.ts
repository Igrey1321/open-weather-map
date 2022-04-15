export default class Service {
  static apiKey = 'b798b5680ad4d18d0c36c0f8a950dbaa';

  static async getGeocoding(city: string) {
    return await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`,
    ).then((value) => value.json());
  }

  static async getWeather(lat: number, lon: number) {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`,
    ).then((value) => value.json());
  }

  static async getHourlyWeather(lat: number, lon: number) {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${this.apiKey}`,
    ).then((value) => value.json());
  }
}
