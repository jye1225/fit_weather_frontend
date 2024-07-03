import { useEffect, useState } from 'react';
import bgStyle from '../css/MainWeatherBG.module.css'

const MainWeatherBG = () => {
    const [SKY, setSKY] = useState('');    //SKY -> 1맑음  3구름많음 4흐림 
    const [PTY, setPTY] = useState('');    //PTY -> 0없음 1비 2비/눈 3눈 4소나기 

    const [bgImg, setBgImg] = useState('');//건물이미지
    const bgfile = ['a', 'b', 'c', 'd'];//건물이미지 img/weatherBG/bg/a.png

    const bgLoad = () => {
        const random = Math.floor(Math.random() * (bgfile.length));
        console.log(random, 'random');
        setBgImg(bgfile[random]);
    }

    useEffect(() => {

        const storedSky = localStorage.getItem('pmSKY');
        const storedPty = localStorage.getItem('pmPTY');
        if (storedSky && storedPty) {
            // setSKY(storedSky);
            setSKY(1);//임시고정
            setPTY(storedPty);
        }

        bgLoad();
    }, [])

    useEffect(() => {
        console.log('^^^^SKY, PTY 변동 감지^^^', SKY, PTY);
    }, [SKY, PTY])

    return (
        <div className={bgStyle.MainweatherBG}>
            <img className={bgStyle.skyWeather} src={`img/weatherBG/sky/${SKY}.png`} alt="SKY" />
            <img className={bgStyle.bg} src={`img/weatherBG/bg/${bgImg}.png`} alt="bgImg" />
        </div>
    )
}

export default MainWeatherBG