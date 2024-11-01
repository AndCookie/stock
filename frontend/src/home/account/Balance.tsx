import React, { useState } from 'react';
import styles from './Balance.module.css';

const Balance = () => {
  const [filter, setFilter] = useState('가나다순'); // 필터링 기준 상태
  const [activeSort, setActiveSort] = useState('현재가'); // 현재가/평가금 활성화 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const data = {
    balance: "1,400원",
    totalValue: "982,859원",
    totalChange: "-16,637원 (1.6%)",
    holdings: [
      { name: "피엔티", shares: "19주", currentValue: "52,300원", estimatedValue: "978,344원", currentChange: "-19,156 (1.9%)", estimatedChange: "+0.9%" },
      { name: "로블록스", shares: "0.01563주", currentValue: "60,726원", estimatedValue: "52,901원", currentChange: "+1.9%", estimatedChange: "-2.1%" },
      { name: "메타", shares: "0.004605주", currentValue: "791,579원", estimatedValue: "3,614원", currentChange: "-3.2%", estimatedChange: "+3.4%" }
    ]
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleFilterChange = (newFilter: '가나다순' | '구매순') => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.totalValue}>{data.totalValue}</div>
      <p className={styles.totalChange}>{data.totalChange}</p>
      <p className={styles.balance}>보유 잔고 {data.balance}</p>
      
      <div className={styles.sorting}>
        <div className={styles.dropdown}>
          <button className={styles.filterButton} onClick={toggleDropdown}>
            {filter} <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <div onClick={() => handleFilterChange('가나다순')}>가나다순</div>
              <div onClick={() => handleFilterChange('구매순')}>구매순</div>
            </div>
          )}
        </div>
        
        <div className={styles.sortOptions}>
          <button
            className={`${styles.sortButtonOne} ${activeSort === '현재가' ? styles.activeSortButton : ''}`}
            onClick={() => setActiveSort('현재가')}
          >
            현재가
          </button>
          <button
            className={`${styles.sortButtonTwo} ${activeSort === '평가금' ? styles.activeSortButton : ''}`}
            onClick={() => setActiveSort('평가금')}
          >
            평가금
          </button>
        </div>
      </div>

      <div className={styles.holding}>
        {data.holdings.map((item) => (
          <div key={item.name} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemShares}>{item.shares}</span>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.itemValue}>
                {activeSort === '현재가' ? item.currentValue : item.estimatedValue}
              </span>
              <span
                className={`${styles.itemChange} ${
                  (activeSort === '현재가' ? item.currentChange : item.estimatedChange).includes('+') ? styles.positive : styles.negative
                }`}
              >
                {activeSort === '현재가' ? item.currentChange : item.estimatedChange}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
