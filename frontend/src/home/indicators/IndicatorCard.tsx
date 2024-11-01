import { useNavigate } from 'react-router-dom';
import styles from './Indicators.module.css';
import { IndicatorCardProps } from './definitions';

const IndicatorCard = ({ index, indexTypeId }: IndicatorCardProps) => {
  const navigate = useNavigate();

  const cardClick = () => {
    navigate(`/market/${indexTypeId}`);
  };

  return (
    <div className={styles.metricBox} onClick={cardClick}>
      {index}
    </div>
  )
}

export default IndicatorCard