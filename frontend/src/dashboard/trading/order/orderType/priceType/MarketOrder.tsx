// 시장가 주문

import React, { useState } from "react";
import styles from "./MarketOrder.module.css"

const MarketOrder: React.FC = () => {
  // 구매 가격과 수량 상태 관리
  const [quantity, setQuantity] = useState<string | number>("");

  // 수량 증가 함수
  const increaseQuantity = () => setQuantity(prev => (prev === "" ? 1 : (Number(prev) + 1)));

  // 수량 감소 함수
  const decreaseQuantity = () => setQuantity(prev => (prev === "" ? 1 : Math.max(1, Number(prev) - 1)));

  // 수량 입력란에 숫자만 입력되도록 제한하는 함수
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
    setQuantity(inputQuantity >= 1 ? inputQuantity : "");
  };

  return (
    <div>
      <div
        className={styles.inputContainer}
        onMouseDown={(event) => {
          event.stopPropagation(); // 클릭 시 드래그 방지
        }}
      >
        <label>구매가격</label>
        <div className={styles.inputBox}>
          <input
            type="text"
            value="최대한 빠른 가격"
            disabled
          />
          <button disabled>−</button>
          <button disabled>+</button>
        </div>
      </div>

      <div
        className={styles.inputContainer}
        onMouseDown={(event) => {
          event.stopPropagation(); // 클릭 시 드래그 방지
        }}
      >
        <label>수량</label>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={quantity !== "" ? `${quantity} 주` : ""}
            onChange={handleQuantityChange}
            placeholder="수량을 입력하세요"
          />
          <button onClick={decreaseQuantity}>−</button>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
    </div>
  );
};

export default MarketOrder
