import styles from './UserInfo.module.css';
import goldMedal from '../../assets/images/userRanking/🥇.png';
import silverMedal from '../../assets/images/userRanking/🥈.png';
import bronzeMedal from '../../assets/images/userRanking/🥉.png';
import { IUserInfoProps } from './definition';

const UserInfo = ({ dataRank, userName, profit }: IUserInfoProps) => {
  const selectMedal = (rank: string) => {
    if (rank === '1') {
      return goldMedal;
    } else if (rank === '2') {
      return silverMedal;
    } else if (rank === '3') {
      return bronzeMedal;
    }
  };

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <img src={selectMedal(dataRank)} alt="" className={styles.medalIcon} />
        <div className={styles.userName}>{userName}</div>
      </div>
      <div className={Number(profit) > 0 ? `${styles.isProfitPlus}` : `${styles.isProfitMinus}`}>
        {profit}%
      </div>
    </div>
  );
};

export default UserInfo;
