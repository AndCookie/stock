import { useState, useEffect } from "react";
import styles from "./History.module.css";
import { useHistoryStore } from "../../../store/useHistoryStore";
import { IHistoryData } from "../../../store/definitions";

const History = () => {
  const { historyData, fetchHistoryData } = useHistoryStore();

  const [activeTab, setActiveTab] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetchHistoryData();

    const today = new Date();
    setSelectedDate(`${today.getFullYear()}년 ${today.getMonth() + 1}월`);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split("-");
    return `${parseInt(month)}.${parseInt(day)}`;
  };

  const uniqueMonths = Array.from(
    new Set(
      (historyData || []).map((order) => {
        const [year, month] = order.date.split("-");
        return `${year}년 ${parseInt(month)}월`;
      })
    )
  );

  const getSelectedYearAndMonth = () => {
    if (selectedDate) {
      const [year, month] = selectedDate.split(" ");
      return { year: year.replace("년", ""), month: month.replace("월", "") };
    }
    return { year: "", month: "" };
  };

  const { year: selectedYear, month: selectedMonth } =
    getSelectedYearAndMonth();
  const filteredOrders = (historyData || []).filter(({ date }) => {
    const [orderYear, orderMonth] = date.split("-");
    return (
      orderYear === selectedYear &&
      parseInt(orderMonth) === parseInt(selectedMonth)
    );
  });

  const completedOrders = filteredOrders.filter((order) =>
    order.status.includes("완료")
  );
  const pendingOrders = filteredOrders.filter((order) =>
    order.status.includes("대기")
  );

  const renderOrderList = (historyData: IHistoryData[], emptyMessage: string) =>
    historyData.length > 0 ? (
      historyData.map((order, index) => (
        <div key={index} className={styles.order}>
          <span className={styles.date}>{formatDate(order.date)}</span>
          <div className={styles.orderInfo}>
            <div className={styles.name}>{order.name}</div>
            <div className={styles.orderDetail}>
              <span
                className={`${styles.status} ${order.status.includes("구매")
                  ? styles["status-buy"]
                  : styles["status-sell"]
                  }`}
              >
                {order.status}
              </span>{" "}
              · <span className={styles.shares}>{order.shares}주</span>
            </div>
          </div>
          <span className={styles.price}>{order.price.toLocaleString()}원</span>
        </div>
      ))
    ) : (
      <p className={styles.emptyMessage}>{emptyMessage}</p>
    );

  if (!historyData) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabOne} ${activeTab === "전체" ? styles.activeTabButton : ""}`}
          onClick={() => setActiveTab("전체")}
        >
          전체
        </button>
        <button
          className={`${styles.tabTwo} ${activeTab === "조건주문" ? styles.activeTabButton : ""}`}
          onClick={() => setActiveTab("조건주문")}
        >
          조건주문
        </button>
      </div>

      <div className={styles.dateDropdown}>
        <button className={styles.filterButton} onClick={toggleDropdown}>
          {selectedDate || "날짜 선택"}{" "}
          <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
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
          {renderOrderList(completedOrders, "주문내역이 없습니다")}
        </div>

        <div className={styles.section}>
          <div className={styles.title}>미완료 주문</div>
          {renderOrderList(pendingOrders, "주문내역이 없습니다")}
        </div>
      </div>
    </div>
  );
};

export default History;
