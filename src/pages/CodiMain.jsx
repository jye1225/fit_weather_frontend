import style from '../css/Codi.module.css'

import Header from "../components/Header";
import H2Codi from '../components/H2Codi'

const CodiMain = () => {
    return (
        <main className={`mw ${style.codiMain}`}>
            <Header />
            <H2Codi />

            CodiMain
        </main>
    );
};

export default CodiMain;
