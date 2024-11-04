import { useEffect, useState } from "react";
import styles from "./Balance.module.css";
import { useBalanceStore } from "../../store/useBalanceStore";
import { COLORS } from '../../common/utils';

const Balance = () => {
  const { balanceData, fetchBalanceData } = useBalanceStore();

  useEffect(() => {
    fetchBalanceData();
  }, [])

  const [filter, setFilter] = useState("가나다순"); // 필터링 기준 상태
  const [activeSort, setActiveSort] = useState("현재가"); // 현재가/평가금 활성화 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleFilterChange = (newFilter: "가나다순" | "구매순") => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  const calculatePercentage = (prev: number, current: number) => {
    return ((Math.abs(current - prev) / prev) * 100).toFixed(1)
  };

  if (!balanceData) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.totalValue}>{balanceData.currentValue.toLocaleString()}원</div>
      <p
        className={styles.totalChange}
        style={{
          color:
            balanceData.currentValue - balanceData.prevValue >= 0
              ? COLORS.positive
              : COLORS.negative,
        }}
      >{balanceData.currentValue > balanceData.prevValue ? '+' : ''}{(balanceData.currentValue - balanceData.prevValue).toLocaleString()}원
        ({calculatePercentage(balanceData.prevValue, balanceData.currentValue)}%)
      </p>
      <p className={styles.balance}>보유 잔고 {balanceData.balance.toLocaleString()}원</p>

      <div className={styles.sorting}>
        <div className={styles.dropdown}>
          <button className={styles.filterButton} onClick={toggleDropdown}>
            {filter}{" "}
            <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <div onClick={() => handleFilterChange("가나다순")}>가나다순</div>
              <div onClick={() => handleFilterChange("구매순")}>구매순</div>
            </div>
          )}
        </div>

        <div className={styles.sortOptions}>
          <button
            className={`${styles.sortButtonOne} ${activeSort === "현재가" ? styles.activeSortButton : ""}`}
            onClick={() => setActiveSort("현재가")}
          >
            현재가
          </button>
          <button
            className={`${styles.sortButtonTwo} ${activeSort === "평가금" ? styles.activeSortButton : ""}`}
            onClick={() => setActiveSort("평가금")}
          >
            평가금
          </button>
        </div>
      </div>

      <div className={styles.holding}>
        {balanceData.holdings.map((item) => (
          <div key={item.name} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemShares}>{item.shares}주</span>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.itemValue}>
                {activeSort === "현재가"
                  ? item.currentValue.toLocaleString()
                  : item.currentEstimatedValue.toLocaleString()}원
              </span>
              <span
                style={{
                  color:
                    activeSort === "현재가"
                      ? item.currentValue > item.prevValue
                        ? COLORS.positive
                        : item.currentValue < item.prevValue
                        ? COLORS.negative
                        : COLORS.neutral
                      : item.currentEstimatedValue > item.prevEstimatedValue
                        ? COLORS.positive
                        : item.currentEstimatedValue < item.prevEstimatedValue
                        ? COLORS.negative
                        : COLORS.neutral
                }}
              >
                {activeSort === "현재가"
                  ? `${item.currentValue > item.prevValue ? '+' : ''}${(item.currentValue - item.prevValue).toLocaleString()} (${calculatePercentage(item.prevValue, item.currentValue)}%)`
                  : `${item.currentEstimatedValue > item.prevEstimatedValue ? '+': ''}${(item.currentEstimatedValue - item.prevEstimatedValue).toLocaleString()} (${calculatePercentage(item.prevEstimatedValue, item.currentEstimatedValue)}%)`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
