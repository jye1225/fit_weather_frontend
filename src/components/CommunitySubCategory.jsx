import style from '../css/CommunitySubCategory.module.css';

function CommunitySubCategory() {
  return (
    <div>
      <button className={`${style.weatherCate} `}>오늘날씨</button>
      <button className={`${style.coordiCate} ${style.on}`}>오늘코디</button>
    </div>
  );
}

export default CommunitySubCategory;
