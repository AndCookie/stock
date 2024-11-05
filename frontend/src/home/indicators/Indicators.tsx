import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styles from './Indicators.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IndicatorCard from './IndicatorCard';
import { useIndexStore } from '../../store/useIndexStore';

// 슬라이더 설정
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
      },
    },
    
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Indicators: React.FC = () => {
  const { indexData, fetchIndexData } = useIndexStore();

  useEffect(() => {
    fetchIndexData()
  }, [])

  // const indices = ['코스피', '코스닥', '나스닥', 'S&P 500', '다우존스', '원/달러', '금', 'WTI'];
  const indices = ['코스피', '코스닥', '다우존스', '나스닥', '원/달러', '엔/달러', '금', 'WTI'];

  if (!indexData) {
    return <div></div>;
  }

  return (
    <section className={styles.metrics}>
      <Slider {...sliderSettings}>
        {indices.map((index, i) => (
          <IndicatorCard key={i} indexTypeId={Math.floor(i / 2)} index={index} />
        ))}
      </Slider>
    </section>
  );
};

export default Indicators;
