import styles from './UserInfo.module.css';
import goldMedal from '../../assets/images/userRanking/🥇.png';
import silverMedal from '../../assets/images/userRanking/🥈.png';
import bronzeMedal from '../../assets/images/userRanking/🥉.png';

const UserInfo = ({ index = 1 }) => {
  const selectMedal = (index: number) => {
    if (index === 0) {
      return goldMedal;
    } else if (index === 1) {
      return silverMedal;
    } else if (index === 2) {
      return bronzeMedal;
    }
  };

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <img src={selectMedal(index)} alt="" className={styles.medalIcon} />
        <div className={styles.userName}>유저명</div>
      </div>
      <div>수익률</div>
    </div>
  );
};

export default UserInfo;
