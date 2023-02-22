import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'


export default function Home() {

  const apiKey = process.env.NEXT_PUBLIC_API;
  const location = 'Vancouver';
  const units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10))
      let num = parseInt(weather.dt_txt.substr(8, 2), 10)

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("here")
        console.log(response.data.list[index]);

        var month = '';
        var icon = '';

        if (weather.dt_txt.substr(5, 2) == 1) {
          month = 'Jan';
        } else if (weather.dt_txt.substr(5, 2) == 2) {
          month = 'Feb';
        } else if (weather.dt_txt.substr(5, 2) == 3) {
          month = 'Mar';
        } else if (weather.dt_txt.substr(5, 2) == 4) {
          month = 'April';
        } else if (weather.dt_txt.substr(5, 2) == 5) {
          month = 'May';
        } else if (weather.dt_txt.substr(5, 2) == 6) {
          month = 'June';
        } else if (weather.dt_txt.substr(5, 2) == 7) {
          month = 'July';
        } else if (weather.dt_txt.substr(5, 2) == 8) {
          month = 'Aug';
        } else if (weather.dt_txt.substr(5, 2) == 9) {
          month = 'Sept';
        } else if (weather.dt_txt.substr(5, 2) == 10) {
          month = 'Oct';
        } else if (weather.dt_txt.substr(5, 2) == 11) {
          month = 'Nov';
        } else if (weather.dt_txt.substr(5, 2) == 12) {
          month = 'Dec';
        }

        if (weather.weather[0].main == 'Clouds') {
          icon = '/icons/broken-clouds.png';
        } else if (weather.weather[0].main == 'Clear') {
          icon = '/icons/clear-sky.png';
        } else if (weather.weather[0].main == 'Atmosphere') {
          icon = '/icons/mist.png';
        } else if (weather.weather[0].main == 'Rain') {
          icon = '/icons/rain.png';
        } else if (weather.weather[0].main == 'Drizzle') {
          icon = '/icons/shower-rain.png';
        } else if (weather.weather[0].main == 'Snow') {
          icon = '/icons/snow.png';
        } else if (weather.weather[0].main == 'Thunderstorm') {
          icon = '/icons/thunderstorm.png';
        }

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[now.getDay()];

        return (
          <div className={styles.weatherCont}>
            <p className={styles.weekday}>{day} </p>
            <p className={styles.month}> {month} {weather.dt_txt.substr(8, 2)}, {weather.dt_txt.substr(0, 4)}</p>
            <div key={index}>
              <Image
                src={icon}
                alt={icon}
                width={100}
                height={100}
                priority
              />
              <div className={styles.degreeCont}>
                <div className={styles.degree}>{weather.main.temp.toFixed(1)} </div>
                <div className={styles.celsius}> °C</div>
              </div>
              <div className={styles.weather}>{weather.weather[0].main}</div>
            </div>
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(() => {
    if (grabWeather.current === true) {
      fetchWeather();
    }

    return () => {
      grabWeather.current = true;
    }
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <Image
          className={styles.logo}
          src="/weather-forecast-logo.png"
          alt="weather-forecast-logo"
          width={400}
          height={200}
          priority
        />

        <p className={styles.data}>
          {data}
        </p>
        <p className={styles.footer}>
          By William Chu
        </p>
        <p className={styles.lastUpdated}>
          Vancouver, BC Weather <br />
          Last updated: {date}
        </p>
      </main>
    </>
  )
}
