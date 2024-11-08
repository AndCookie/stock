import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Indicators.module.css';
import { IIndicatorCardProps } from './definitions';
import { useIndexStore } from '../../store/useIndexStore';
import { COLORS } from '../../common/utils';
import IndicatorChart from './IndicatorChart';

import krFlag from '../../assets/images/indicator/kr.png';
import usFlag from '../../assets/images/indicator/us.png';
import yenIcon from '../../assets/images/indicator/yen2.png';
import goldIcon from '../../assets/images/indicator/gold2.png';
import oilIcon from '../../assets/images/indicator/oil2.png';
import wonIcon from '../../assets/images/indicator/won.png';

// 이미지 매핑 객체
const flagMap: Record<string, string> = {
  '코스피': krFlag,
  '코스닥': krFlag,
  '나스닥': usFlag,
  '다우존스': usFlag,
  '원/달러': wonIcon,
  '엔/달러': yenIcon,
  '금': goldIcon,
  'WTI': oilIcon,
};

const IndicatorCard = ({ indexTypeId, index }: IIndicatorCardProps) => {
  const { indexData } = useIndexStore();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const indexTypes = ['국내', '해외', '환율', '원자재'];

  // 이미지 경로 가져오기 함수
  const getFlagSrc = (index: string) => flagMap[index] || '';

  const flagSrc = getFlagSrc(index);

  const indexList = indexData ? indexData[indexTypes[indexTypeId]][index] : undefined;

  if (!indexList || indexList.length < 2) {
    return <div className={styles.metricBox}>데이터를 불러올 수 없습니다.</div>;
  }

  const current = indexList[indexList.length - 1];
  const previous = indexList[indexList.length - 2];
  const changeValue = current.value - previous.value;
  const changeRate = (changeValue / previous.value) * 100;

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      navigate(`/market/${indexTypeId}`);
    }
  };

  return (
    <div
      className={styles.metricBox}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.textInfo}>
        <div className={styles.title}>
          {flagSrc && <img src={flagSrc} alt="flag" className={styles.flagIcon} />}
          {index}
        </div>
        <div className={styles.value}>{current.value}</div>
        <div className={styles.percentage} style={{ color: changeValue >= 0 ? COLORS.positive : COLORS.negative }}>
          {changeValue >= 0 ? `+${changeValue.toFixed(2)}` : changeValue.toFixed(2)}
          ({changeRate.toFixed(1)}%)
        </div>
      </div>
      <div className={styles.imageInfo}>
        <IndicatorChart indexTypeId={indexTypeId} index={index} color={changeValue >= 0 ? COLORS.positive : COLORS.negative} />
      </div>
    </div>
  );
};

export default IndicatorCard;