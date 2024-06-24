import style from '../css/DetailContentArea.module.css';
import DetailCoordiReview from './DetailCoordiReview';

function DetailContentArea() {
  return (
    <div className={style.contentArea}>
      <p>
        오늘도 그댄 어여쁜 바다로 내게 다가와 투명한 그대 마음에 하늘을 가득
        담은 걸 밝았던 많은 모습들 그대로 남아있을 때 내가 바라고 바랬던 사람이
        내게로 올까 네가 그 바다에 닿을 때까지 나는 네 줄을 놓지 않을게 너를
        올려주고 고운 그대 저 바다에 닿을 때까지 우리 한 발씩 그대로 있었고 땀,
        작은 눈물이 고여 모든 사람들 헤엄칠 수 있게 큰 바다가 될 때까지 곱게
        놓여진 우리의 추억이 드넓었던 세상에서 너를 올려주면 고운 그대 저 바다에
        닿게 될 거야
      </p>
      <div className={style.imgCon}>
        <img src="/img/img1.jpg" alt="이미지" />
      </div>
      <DetailCoordiReview />
    </div>
  );
}

export default DetailContentArea;
