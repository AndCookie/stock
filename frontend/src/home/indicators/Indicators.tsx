import React from 'react';
import Slider from 'react-slick';
import styles from './Indicators.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IndicatorCard from './IndicatorCard';

// 슬라이더 설정
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  swipeToSlide: true,
  arrows: false,
  centerMode: true,
  centerPadding: "100px",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, centerPadding: "50px" },
    },
  ],
};

const Indicators: React.FC = () => {
  // const indices = ['코스피', '코스닥', '나스닥', 'S&P 500', '다우존스', '원/달러', '금', 'WTI'];
  const indices = ['코스피', '코스닥', '다우존스', '나스닥', '원/달러', '엔/달러', '금', 'WTI'];

  return (
    <section className={styles.metrics}>
      <Slider {...sliderSettings}>
        {indices.map((index, i) => (
          <IndicatorCard index={index} indexTypeId={Math.floor(i / 2)} />
        ))}
      </Slider>
    </section>
  );
};

export default Indicators;
