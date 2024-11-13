import { useState, useEffect } from "react";
import { useStandardHistoryStore } from "../../../../store/useHistoryStore";
import { IStandardHistoryData } from "../../../../store/definitions";
import styles from "../History.module.css";

const StandardHistory = () => {
  const filter = "ALL";
  const today = new Date();
  const initialYear = today.getFullYear();
  const initialMonth = today.getMonth() + 1;
  const { standardHistoryData, fetchStandardHistoryData } = useStandardHistoryStore();
  const [filteredHistoryData, setFilteredHistoryData] = useState<IStandardHistoryData[] | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDateChange = (date: [number, number]) => {
    const year = date[0];
    const month = date[1];
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(`${year}년 ${month}월`);
    setIsDropdownOpen(false);
  };

  const formatDate = (ord_dt: string) => {
    const month = ord_dt.slice(4, 6);
    const day = ord_dt.slice(6, 8);
    return `${parseInt(month)}.${parseInt(day)}`;
  };

  const getLast60Months = () => {
    const lastDates: [number, number][] = [];
    let year = initialYear;
    let month = initialMonth;
    
    // 60개월이 너무 많으면 아래에 i < 60을 조정하면 됩니다.
    for (let i = 0; i < 60; i++) {
      lastDates.push([year, month]);
      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
    }
    
    return lastDates;
  };

  useEffect(() => {
    if (!standardHistoryData) {
      fetchStandardHistoryData();
    }
  }, []);

  useEffect(() => {
    if (standardHistoryData) {
      if (filter === "ALL") {
        setFilteredHistoryData(standardHistoryData);
      } else {
        setFilteredHistoryData(
          standardHistoryData.filter(({ pdno }) => pdno === filter)
        );
      }
      setSelectedYear(initialYear);
      setSelectedMonth(initialMonth);
      setSelectedDate(`${initialYear}년 ${initialMonth}월`);
    }
  }, [standardHistoryData]);

  const filteredByDate = (filteredHistoryData || []).filter(({ ord_dt }) => {
    const orderYear = ord_dt.slice(0, 4);
    const orderMonth = ord_dt.slice(4, 6);
    return (
      parseInt(orderYear) === selectedYear &&
      parseInt(orderMonth) === selectedMonth
    );
  });
  const completedHistoryData = filteredByDate.filter((order) => order.rmn_qty === 0 && order.ord_qty === order.tot_ccld_qty)
  const pendingHistoryData = filteredByDate.filter((order) => order.rmn_qty !== 0)
  const cancelledHistoryData = filteredByDate.filter((order) => order.rmn_qty === 0 && order.ord_qty === order.cncl_cfrm_qty)
  const last60Months = getLast60Months();

  const renderHistoryData = (historyData: IStandardHistoryData[], mode: string) =>
    historyData.length > 0 ? (
      historyData.map((order, index) => (
        <div key={index} className={styles.order}>
          <span className={styles.date}>{formatDate(order.ord_dt)}</span>
          <div className={styles.orderInfo}>
            <div className={styles.name}>{order.prdt_name}</div>
            <div className={styles.orderDetail}>
              <span
                className={`${styles.status} ${order.sll_buy_dvsn_cd === "BUY"
                  ? styles["status-buy"]
                  : styles["status-sell"]
                  }`}
              >
                {order.sll_buy_dvsn_cd === "BUY" ? "구매" : "판매"}
                {" "}
                {mode === "completed" ? "완료" : mode === "pending" ? "대기" : "취소"}
              </span>{" "}
              · <span className={styles.shares}>{order.ord_qty}주</span>
            </div>
          </div>
          {mode === "cancelled" ? (
            <span className={styles.price}></span>
          ) : (
            <span className={styles.price}>주당 {order.avg_prvs.toLocaleString()}원</span>
          )}
        </div>
      ))
    ) : (
      <p className={styles.emptyMessage}>주문내역이 없습니다</p>
    );

  return(
    <div>
      <div className={styles.dateDropdown}>
        <button className={styles.filterButton} onClick={toggleDropdown}>
          {selectedDate || "날짜 선택"}{" "}
          <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            {last60Months.map((date, index) => (
              <div key={index} onClick={() => handleDateChange(date)}>
                {date[0]}년 {date[1]}월
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.title}>체결된 주문</div>
          {renderHistoryData(completedHistoryData, "completed")}
        </div>

        <div className={styles.section}>
          <div className={styles.title}>미체결 주문</div>
          {renderHistoryData(pendingHistoryData, "pending")}
        </div>

        <div className={styles.section}>
          <div className={styles.title}>취소된 주문</div>
          {renderHistoryData(cancelledHistoryData, "cancelled")}
        </div>
      </div>
    </div>
  );
};

export default StandardHistory
