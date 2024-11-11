
import styles from './StockRanking.module.css'
import StockInfo from './StockInfo'

const StockRanking = () => {
  // const data = useIndexData()
  return(
    <div className={styles.container}>
      StockRanking
      <StockInfo />
    </div>
  )
}

export default StockRanking