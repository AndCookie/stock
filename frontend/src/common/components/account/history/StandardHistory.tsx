import React from "react";
import { useState, useEffect } from "react";
import { useStandardHistoryStore } from "../../../../store/useHistoryStore";
import { IStandardHistoryData } from "../../../../store/definitions";
import styles from "../History.module.css";

const StandardHistory: React.FC<{ filter: string; isMyPage: boolean }> = ({ filter, isMyPage }) => {
  // const isDetailPage = filter !== "ALL";
  const today = new Date();
  const initialYear = today.getFullYear();
  const initialMonth = today.getMonth() + 1;
  const { standardHistoryData, fetchStandardHistoryData } = useStandardHistoryStore();
  const [filteredHistoryData, setFilteredHistoryData] = useState<IStandardHistoryData[] | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPendingView, setIsPendingView] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const togglePendingView = () => {
    setIsPendingView((prev) => !prev);
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
      console.log("### standardHistoryData: ", standardHistoryData)
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

  const filteredByDateHistoryData = (filteredHistoryData || []).filter(({ ord_dt, mode }) => {
    const orderYear = ord_dt.slice(0, 4);
    const orderMonth = ord_dt.slice(4, 6);
    return (
      parseInt(orderYear) === selectedYear &&
      parseInt(orderMonth) === selectedMonth &&
      (mode === "completed" || mode === "cancelled")
    );
  });
  const completedHistoryData = (filteredHistoryData || []).filter(({ mode }) => mode === "completed" || mode === "cancelled");
  const pendingHistoryData = (filteredHistoryData || []).filter(({ mode }) => mode === "pending");
  const last60Months = getLast60Months();

  const renderHistoryData = (historyData: IStandardHistoryData[]) =>
    historyData.length > 0 ? (
      historyData.map((order, index) => (
        <div key={index} className={`${isMyPage ? styles.orderModal : styles.order}`}>
          <span className={`${isMyPage ? styles.dateModal : styles.date}`}>
            {formatDate(order.ord_dt)}
          </span>
          <div className={`${isMyPage ? styles.orderInfoModal : styles.orderInfo}`}>
            <div className={styles.name}>{order.prdt_name}</div>
            <div className={styles.orderDetail}>
              <span
                className={`${isMyPage ? styles.statusModal : styles.status} ${
                  order.mode === 'cancelled'
                    ? styles['status-cancelled']
                    : order.mode === 'pending'
                    ? styles['status-pending']
                    : order.sll_buy_dvsn_cd === 'BUY'
                    ? styles['status-buy']
                    : styles['status-sell']
                  }`}
              >
                {order.sll_buy_dvsn_cd === "BUY" ? "구매" : "판매"}{" "}
                {order.mode === "completed" ? "완료" : order.mode === "pending" ? "대기" : "취소"}
              </span>{" "}
              ·{" "}
              <span className={`${isMyPage ? styles.sharesModal : styles.shares}`}>
                {order.ord_qty}주
              </span>
            </div>
          </div>
          {order.mode === "cancelled" ? (
            <div className={styles.price}></div>
          ) : (
            <div className={`${styles.price} ${isMyPage ? styles.priceModal : ''}`}>
              <span className={styles.priceTerm}>주당</span> {isMyPage && <br />}
              {order.avg_prvs.toLocaleString()}원
            </div>
          )}
        </div>
      ))
    ) : (
      <p className={styles.emptyMessage}>주문내역이 없습니다</p>
    );

  return(
    <div>
      {isPendingView ? (
        <div>
          {/* TODO backButton CSS */}
          <button
            className={styles.backButton}
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
            }}
            onClick={() => setIsPendingView(false)}
          >
            ◀ 뒤로가기
          </button>

          <div className={styles.content}>
            <div className={styles.section}>
              <div className={styles.title}>대기 중인 주문</div>
              {renderHistoryData(pendingHistoryData)}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* TODO pendingButton CSS */}
          <button
            className={styles.pendingButton}
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
            }}
            onClick={togglePendingView}
          >
            ▶ 대기 중인 주문 {pendingHistoryData.length}건
          </button>

          {filter === "ALL" ? (
            <>
              <div className={styles.dateDropdown}>
                <button
                  className={styles.filterButton}
                  onMouseDown={(event) => {
                    event.stopPropagation(); // 클릭 시 드래그 방지
                  }}
                  onClick={toggleDropdown}
                >
                  {selectedDate || "날짜 선택"}{" "}
                  <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    {last60Months.map((date, index) => (
                      <div
                        key={index}
                        onMouseDown={(event) => {
                          event.stopPropagation(); // 클릭 시 드래그 방지
                        }}
                        onClick={() => handleDateChange(date)}
                      >
                        {date[0]}년 {date[1]}월
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.section}>
                  <div className={styles.title}>완료된 주문</div>
                  {renderHistoryData(filteredByDateHistoryData)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.content}>
                <div className={styles.section}>
                  {renderHistoryData(completedHistoryData)}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StandardHistory
