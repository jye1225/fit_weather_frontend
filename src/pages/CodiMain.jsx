import style from '../css/Codi.module.css'

import Header from "../components/Header";
import H2Codi from '../components/H2Codi';
// import CodiLogBox from '../components/CodiLogBox';

const CodiMain = () => {
    return (
        <main className={`mw ${style.codiMain}`}>
            <Header />
            <H2Codi />

            {/* <CodiLogBox /> */}
        </main>
    );
};

export default CodiMain;
