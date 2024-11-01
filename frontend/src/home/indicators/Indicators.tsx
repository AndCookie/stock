import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './Indicators.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  centerPadding: "50px",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1.5, centerPadding: "50px" },
    },
  ],
};

const Indicators: React.FC = () => {
  const navigate = useNavigate();

  // MetricCard 클릭 시 이동 함수
  const handleCardClick = () => {
    navigate('/market');
  };

  return (
    <section className={styles.metrics}>
      <Slider {...sliderSettings}>
        {['코스피', '코스닥', '나스닥', 'S&P 500', '다우존스', '원/달러', '금', 'WTI'].map((name) => (
          <div key={name} className={styles.metricBox} onClick={handleCardClick}>
            {name}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Indicators;
