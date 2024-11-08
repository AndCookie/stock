import React from "react"
import { IOrderButtonProps } from "../definitions"
import styles from "./OrderButton.module.css";

const OrderButton: React.FC<IOrderButtonProps> = ({ mode, type, trackedPrice, price, quantity }) => {
  // quantity가 string이거나 0이면 주문 안가도록 예외처리하기
  const isDisabled = quantity === "" || quantity === 0;
  
  return(
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.orderButton} ${mode === "BUY" ? styles.buy : styles.sell}`}
        disabled={isDisabled}
        onMouseDown={(event) => {
          event.stopPropagation(); // 클릭 시 드래그 방지
        }}
      >
        {mode === "BUY" ? "구매하기" : "판매하기"}
      </button>
    </div>
    // <div>
    //   <div>총 금액</div>
    //   <div>{mode === "BUY" ? "구매하기" : "판매하기"}</div>
    //   <div>{mode === "BUY" ? "구매하기" : "판매하기"}</div>
    //   <div>{type === "STANDARD" ? "일반 주문" : "조건 주문"}</div>
    //   <div>{trackedPrice}원 감시 중</div>
    //   <div>{price}원</div>
    //   <div>{quantity}주</div>
    // </div>
  );
};

export default OrderButton;
