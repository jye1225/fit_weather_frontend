import style from '../css/DetailContentCon.module.css';

import DetailContentArea from './DetailContentArea';
import DetailTitleArea from './DetailTitleArea';

function DetailContentCon() {
  return (
    <section className={style.detailContent}>
      <DetailTitleArea />
      <DetailContentArea />
    </section>
  );
}

export default DetailContentCon;
