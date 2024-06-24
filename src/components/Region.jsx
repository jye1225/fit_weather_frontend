import style from '../css/Region.module.css';

function Region({ color, border }) {
  const customStyle = {
    color: color || 'var(--primary-color)',
    border: border || `1px solid var(--primary-color)`,
  };

  return (
    <span className={style.region} style={customStyle}>
      강남구
    </span>
  );
}

export default Region;
