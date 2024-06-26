import style from '../css/CommunitySubCategory.module.css';

function CommunitySubCategory() {
  return (
    <div>
      <span className={`fontTitleS ${style.weatherCate} ${style.on}`}>
        오늘날씨
      </span>
      <span className={`fontTitleS ${style.coordiCate} ${style.on}`}>
        오늘코디
      </span>
    </div>
  );
}

export default CommunitySubCategory;
