import React, { useState, useEffect } from 'react';
import styles from './History.module.css';

type Order = {
  date: string;
  name: string;
  status: string;
  shares: string;
  price: string;
};

const History = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(`${today.getFullYear()}년 ${today.getMonth() + 1}월`);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split('-');
    return `${parseInt(month)}.${parseInt(day)}`;
  };

  const orders = [
    { date: '2024-06-16', name: '카카오', status: '구매완료', shares: '1주', price: '60,000원' },
    { date: '2024-06-16', name: '카카오', status: '판매완료', shares: '1주', price: '60,000원' },
    { date: '2024-07-01', name: '삼성전자', status: '구매완료', shares: '3주', price: '50,000원' },
    { date: '2024-07-11', name: '삼성전자', status: '판매완료', shares: '3주', price: '50,000원' },
    { date: '2024-08-08', name: '피엔티', status: '구매완료', shares: '19주', price: '52,500원' },
    { date: '2024-08-08', name: '피엔티', status: '판매완료', shares: '19주', price: '52,500원' },
    { date: '2024-09-09', name: '한진자동차', status: '구매대기', shares: '9주', price: '90,000원' },
    { date: '2024-10-10', name: '우진전자', status: '판매대기', shares: '10주', price: '100,000원' },
    { date: '2024-11-11', name: '병주증권', status: '구매완료', shares: '11주', price: '100,000원' },
    { date: '2024-11-15', name: '광영오버시스리미티드', status: '판매대기', shares: '11주', price: '1,111,111원' },
    { date: '2024-11-24', name: '태완엘레베이터', status: '판매완료', shares: '24주', price: '1,124,124원' },
  ];

  const uniqueMonths = Array.from(new Set(orders.map(order => {
    const [year, month] = order.date.split('-');
    return `${year}년 ${parseInt(month)}월`;
  })));

  const getSelectedYearAndMonth = () => {
    if (selectedDate) {
      const [year, month] = selectedDate.split(' ');
      return { year: year.replace('년', ''), month: month.replace('월', '') };
    }
    return { year: '', month: '' };
  };

  const { year: selectedYear, month: selectedMonth } = getSelectedYearAndMonth();
  const filteredOrders = orders.filter(({ date }) => {
    const [orderYear, orderMonth] = date.split('-');
    return orderYear === selectedYear && parseInt(orderMonth) === parseInt(selectedMonth);
  });

  const completedOrders = filteredOrders.filter(order => order.status.includes('완료'));
const pendingOrders = filteredOrders.filter(order => order.status.includes('대기'));

  const renderOrderList = (orders: Order[], emptyMessage: string) => (
    orders.length > 0 ? orders.map((order, index) => (
      <div key={index} className={styles.order}>
        <span className={styles.date}>{formatDate(order.date)}</span>
        <div className={styles.orderInfo}>
          <div className={styles.name}>{order.name}</div>
          <div className={styles.orderDetail}>
            <span className={`${styles.status} ${order.status.includes('구매') ? styles['status-buy'] : styles['status-sell']}`}>
              {order.status}
            </span> · <span className={styles.shares}>{order.shares}</span>
          </div>
        </div>
        <span className={styles.price}>{order.price}</span>
      </div>
    )) : <p className={styles.emptyMessage}>{emptyMessage}</p>
  );

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabOne} ${activeTab === '전체' ? styles.activeTabButton : ''}`}
          onClick={() => setActiveTab('전체')}
        >
          전체
        </button>
        <button
          className={`${styles.tabTwo} ${activeTab === '조건주문' ? styles.activeTabButton : ''}`}
          onClick={() => setActiveTab('조건주문')}
        >
          조건주문
        </button>
      </div>

      <div className={styles.dateDropdown}>
        <button className={styles.filterButton} onClick={toggleDropdown}>
          {selectedDate || '날짜 선택'} <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            {uniqueMonths.map((month, index) => (
              <div key={index} onClick={() => handleDateChange(month)}>
                {month}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.title}>완료된 주문</div>
          {renderOrderList(completedOrders, '주문내역이 없습니다')}
        </div>

        <div className={styles.section}>
          <div className={styles.title}>미완료 주문</div>
          {renderOrderList(pendingOrders, '주문내역이 없습니다')}
        </div>
      </div>
    </div>
  );
};

export default History;