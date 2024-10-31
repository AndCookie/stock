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

// MetricCard 컴포넌트
const MetricCard: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => (
  <div className={styles.metricBox} onClick={onClick} role="button" style={{ cursor: 'pointer' }}>
    {name}
  </div>
);

const Indicators: React.FC = () => {
  const navigate = useNavigate();

  const clickIndicator = () => {
    navigate('/market');
  };

  return (
    <section className={styles.metrics}>
      <Slider {...sliderSettings}>
        {['코스피', '코스닥', '나스닥', 'S&P 500', '다우존스', '원/달러', '금', 'WTI'].map((name) => (
          <MetricCard key={name} name={name} onClick={clickIndicator} />
        ))}
      </Slider>
    </section>
  );
};

export default Indicators;
