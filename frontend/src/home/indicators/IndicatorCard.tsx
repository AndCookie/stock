import { useNavigate } from 'react-router-dom';
import styles from './Indicators.module.css';
import { IIndicatorCardProps } from './definitions';
import { useIndexStore } from '../../store/useIndexStore';
import { COLORS } from '../../common/utils';
import IndicatorChart from './IndicatorChart';

const IndicatorCard = ({ indexTypeId, index }: IIndicatorCardProps) => {
  const { indexData } = useIndexStore();

  const indexTypes = ['국내', '해외', '환율', '원자재'];
  const indexList = indexData![indexTypes[indexTypeId]][index];

  const current = indexList[indexList.length - 1];
  const previous = indexList[indexList.length - 2];

  const changeValue = current.value - previous.value;
  const changeRate = (changeValue / previous.value) * 100;

  const navigate = useNavigate();
  const cardClick = () => {
    navigate(`/market/${indexTypeId}`);
  };

  return (
    <div className={styles.metricBox} onClick={cardClick}>
      <div>{index}</div>
      <div>{current.value}</div>
      <div style={{ color: changeValue >= 0 ? COLORS.positive : COLORS.negative }}>
        {changeValue >= 0 ? `+${changeValue.toFixed(2)}` : changeValue.toFixed(2)}
        ({changeRate.toFixed(1)}%)
      </div>
      <IndicatorChart indexTypeId={indexTypeId} index={index} color={changeValue >= 0 ? COLORS.positive : COLORS.negative} />
    </div>
  );
};

export default IndicatorCard;
