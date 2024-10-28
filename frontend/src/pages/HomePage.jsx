import React from 'react';
import Slider from 'react-slick';
import styles from '@/styles/HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,  // 센터 모드를 켜서 간격 조정 가능
    centerPadding: "40px", // 슬라이드 간격 설정
    responsive: [
      {
        breakpoint: 768, // 모바일 대응
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header 영역 */}
      <header className={styles.header}>
        <div className={styles.logo}>모두모투</div>
        <input className={styles.search} placeholder="주식, 메뉴, 종목코드를 검색하세요" />
        <div className={styles.icons}>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
        </div>
      </header>

      {/* 주요 지표 영역 - 캐러셀 */}
      <section className={styles.metrics}>
        <Slider {...sliderSettings}>
          <div className={styles.metricBox}>코스피</div>
          <div className={styles.metricBox}>코스닥</div>
          <div className={styles.metricBox}>나스닥</div>
          <div className={styles.metricBox}>S&P 500</div>
          <div className={styles.metricBox}>다우존스</div>
          <div className={styles.metricBox}>원/달러</div>
          <div className={styles.metricBox}>금</div>
          <div className={styles.metricBox}>WTI</div>
        </Slider>
      </section>

      {/* 중앙 메인 콘텐츠 영역 */}
      <section className={styles.mainContent}>
        <div className={styles.portfolio}>보유 종목</div>
        <div className={styles.rankings}>모의투자 랭킹</div>
        <div className={styles.realtimeChart}>실시간 차트</div>
      </section>

      {/* 하단 뉴스 영역 */}
      <section className={styles.news}>
        <div className={styles.newsItem}>뉴스 1</div>
        <div className={styles.newsItem}>뉴스 2</div>
        <div className={styles.newsItem}>뉴스 3</div>
      </section>
    </div>
  );
};

export default HomePage;
