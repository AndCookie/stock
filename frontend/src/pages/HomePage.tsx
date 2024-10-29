import Slider from 'react-slick';
import styles from './HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {

  const sliderSettings = {
    dots: false, // 슬라이더 아래 페이지 네비게이션 도트
    infinite: true, // 슬라이드가 끝에 도달했을 때 처음으로 돌아가도록 설정
    speed: 500, // 슬라이드가 전환되는 속도
    slidesToShow: 4, // 한 화면에 동시에 보여질 슬라이드의 개수
    slidesToScroll: 4, // 한 번에 스크롤할 슬라이드의 개수
    swipeToSlide: true, // 사용자가 드래그한 위치로 이동
    arrows: true, // 좌우 화살표
    centerMode: true,  // 슬라이드를 중앙에 배치하고, 양 옆의 슬라이드 일부를 노출
    centerPadding: "100px", // 슬라이드의 양쪽에 남길 여백
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <>

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
    </>
  );
};

export default HomePage;
