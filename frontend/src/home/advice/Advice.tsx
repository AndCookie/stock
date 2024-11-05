
import styles from './Advice.module.css'

const Advice = () => {
  // const data = useIndexData()
  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        개인 맞춤형 종목 추천
      </div>
      <div className={styles.content}>
        삼성전자<br></br>
        삼성물산<br></br>
        삼성SDS<br></br>
        삼성SDI<br></br>
        삼성디스플레이<br></br>
        삼성전기<br></br>
        삼성화재<br></br>
        삼성생명<br></br>
        삼성증권<br></br>
        삼성카드<br></br>
        삼성카드<br></br>
        삼성바이오로직스<br></br>
        삼성웰스토리<br></br>
        제일기획<br></br>
        호텔신라<br></br>
        멀티캠퍼스<br></br>
      </div>
    </div>
  );
};

export default Advice