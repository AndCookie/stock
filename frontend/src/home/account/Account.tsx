import { useState } from "react";
import Balance from "./Balance";
import History from "./History";
import Favorites from "./Favorites";
import styles from "./Account.module.css";

const Account = () => {
  const [selectedCategory, setSelectedCategory] = useState("보유 종목");

  const categories = ["보유 종목", "주문 내역", "관심 종목"];

  const renderContent = () => {
    if (selectedCategory === "보유 종목") {
      return <Balance />;
    } else if (selectedCategory === "주문 내역") {
      return <History />;
    } else if (selectedCategory === "관심 종목") {
      return <Favorites />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.tabButton} ${
              selectedCategory === category ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default Account;
