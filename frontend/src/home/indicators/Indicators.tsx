import React, { useEffect, useState, useRef } from 'react';
// import Slider from 'react-slick';
import styles from './Indicators.module.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import IndicatorCard from './IndicatorCard';
import { useIndexStore } from '../../store/useIndexStore';

// 슬라이더 설정
// const sliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 2500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   swipeToSlide: true,
//   arrows: false,
//   centerMode: false,
//   ltr: true,
//   autoplay: true, // 자동으로 슬라이드 전환
//   autoplaySpeed: 0,
//   cssEase: 'linear',
//   responsive: [
//     {
//       breakpoint: 1440,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
    
//     {
//       breakpoint: 992,
//       settings: {
//         slidesToShow: 2,
//       },
//     },

//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1,
//       },
//     },
//   ],
// };

const Indicators: React.FC = () => {
  const { indexData, fetchIndexData } = useIndexStore();
  const [formattedData, setFormattedData] = useState<JSX.Element[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchIndexData();
  }, [fetchIndexData]);

  useEffect(() => {
    if (indexData) {
      const indices = ['코스피', '코스닥', '다우존스', '나스닥', '원/달러', '엔/달러', '금', 'WTI'];
      const dataElements = indices.map((index, i) => (
        <IndicatorCard key={i} indexTypeId={Math.floor(i / 2)} index={index} />
      ));
      setFormattedData([...dataElements, ...dataElements]); // 요소를 두 번 복제하여 자연스러운 연결
    }
  }, [indexData]);

  if (!indexData) {
    return <div className={styles.loading}>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <section className={styles.marqueeContainer}>
      <div className={styles.marquee} ref={marqueeRef}>
        {formattedData}
        {formattedData}
      </div>
    </section>
  );
};

export default Indicators;