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
  centerPadding: "100px",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, centerPadding: "50px" },
    },
  ],
};

const Indicators: React.FC = () => {
  const indices = ['코스피', '코스닥', '나스닥', 'S&P 500', '다우존스', '원/달러', '금', 'WTI'];

  const navigate = useNavigate();

  const cardClick = (indexTypeId: number) => {
    navigate(`/market/${indexTypeId}`);
  };

  return (
    <section className={styles.metrics}>
      <Slider {...sliderSettings}>
        {indices.map((index, i) => (
          <div key={index} className={styles.metricBox} onClick={() => cardClick(Math.floor(i / 2))}>
            {index}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Indicators;
