
import styles from './UserRanking.module.css'
import UserInfo from './UserInfo'

const UserRanking = () => {
  // const data = useIndexData()
  return(
    <div className={styles.container}>
      UserRanking
      <UserInfo />
    </div>
  )
}

export default UserRanking