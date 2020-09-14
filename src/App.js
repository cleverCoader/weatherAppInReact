import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import Whether from './components/whether.component';
import Form from './components/form.component';

const APIKEY = "c92ed0af42e526eeb37764db5d2d8a1d";


class App extends React.Component {   //else import {Component as well} to avoid React.Component

    constructor(){
      super();

      this.state={
        city:undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        celsius: undefined,
        temp_max:undefined,
        temp_min:undefined,
        description: "",
        error: false

      };
      

      this.weathericon = {
        ThunderStorm:"wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds:"wi-day-sunny"
      }
    }

    calCelsius(temp){
      let cell=Math.floor(temp-273.15);
      return cell;
    }
  
  get_Weathericon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weathericon.ThunderStorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
      break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weathericon.Rain });
      break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeID ===800:
        this.setState({ icon: this.weathericon.Clear });
        break;
       
      default:
        this.setState({ icon: this.weathericon.Clear });
      
    }
  }

  getWeather = async (e) => {
      
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
  
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country} &appid=${APIKEY}`);
        const response= await api_call.json();
  
        console.log(response);
  
        this.setState({
          city: `${response.name}, ${response.sys.country} `,
          country: response.sys.country,
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false
        });
        this.get_Weathericon(this.weathericon, response.weather[0].id);  


    }
  
    else {
      this.setState({ error: true });
    }

    };

  render() { 
    return ( 
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error} />
      <Whether 
      city={this.state.city}
      country={this.state.country} 
      temp_celsius={this.state.celsius} 
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weathericon={this.state.icon}
      
      
      />
    </div>
     );
  }
}
 


export default App;


