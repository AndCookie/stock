import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IIndicatorCardProps } from './definitions';
import { useIndexStore } from '../../store/useIndexStore';
import IndicatorChart from './IndicatorChart';

import krFlag from '../../assets/images/indicator/kr.png';
import usFlag from '../../assets/images/indicator/us.png';
import yenIcon from '../../assets/images/indicator/yen2.png';
import goldIcon from '../../assets/images/indicator/gold2.png';
import oilIcon from '../../assets/images/indicator/oil2.png';
import wonIcon from '../../assets/images/indicator/won.png';

import styles from './Indicators.module.css';
import { COLORS } from '../../common/utils';

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
  const { kospiData, kosdaqData, nasdaqData, djiData, yendollarData, wondollarData, wtiData, goldData } = useIndexStore();

  const indexData = {
    "국내": {
      "코스피": kospiData,
      "코스닥": kosdaqData,
    },
    "해외": {
      "다우존스": djiData,
      "나스닥": nasdaqData,
    },
    "환율": {
      "원/달러": wondollarData,
      "엔/달러": yendollarData,
    },
    "원자재": {
      "WTI": wtiData,
      "금": goldData,
    },
  };

  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const indexTypes = ["국내", "해외", "환율", "원자재"];
  const indexList = indexData[indexTypes[indexTypeId]][index];

  // 이미지 경로 가져오기 함수
  const getFlagSrc = (index: string) => flagMap[index] || "";
  const flagSrc = getFlagSrc(index);

  const current = indexList[indexList.length - 1];
  const previous = indexList[indexList.length - 2];
  const changeValue = current.bstp_nmix_prpr ? current.bstp_nmix_prpr - previous.bstp_nmix_prpr : current.ovrs_nmix_prpr - previous.ovrs_nmix_prpr;
  const changeRate = previous.bstp_nmix_prpr ? (changeValue / previous.bstp_nmix_prpr) * 100 : (changeValue / previous.ovrs_nmix_prpr) * 100;

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
        <div className={styles.value}>{current.bstp_nmix_prpr ? parseFloat(current.bstp_nmix_prpr).toFixed(2) : parseFloat(current.ovrs_nmix_prpr).toFixed(2)}</div>
        <div className={styles.percentage} style={{ color: changeValue >= 0 ? COLORS.positive : COLORS.negative }}>
          {changeValue >= 0 ? `+${changeValue.toFixed(2)}` : changeValue.toFixed(2)} ({changeRate.toFixed(1)}%)
        </div>
      </div>
      <div className={styles.imageInfo}>
        <IndicatorChart indexTypeId={indexTypeId} index={index} color={changeValue >= 0 ? COLORS.positive : COLORS.negative} />
      </div>
    </div>
  );
};

export default IndicatorCard;