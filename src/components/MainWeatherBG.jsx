import bgStyle from '../css/MainWeatherBG.module.css'

const MainWeatherBG = () => {
    return (
        <div className={bgStyle.MainweatherBG}>
            <img className={bgStyle.skyWeather} src="img/weatherBG/bg720_sample.png" alt="weatherBG720sample" />
        </div>
    )
}

export default MainWeatherBG