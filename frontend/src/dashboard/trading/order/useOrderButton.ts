import axios from "axios";
import { useCallback } from "react";
import { IPlaceOrderProps } from "../definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const useOrderButton = () => {
  const placeOrder = useCallback(async (orderData: IPlaceOrderProps) => {
    const payload = {
      stock_code: orderData.stockCode,
      trade_type: orderData.mode.toLowerCase(),
      amount: orderData.finalQuantity.toString(),
      price: orderData.price.toString(),
      target_price: orderData.trackedPrice.toString(),
    };

    try {
      const response = await axios.post(`${baseURL}stocks/order/`, payload);
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }, []);

  return { placeOrder };
};

export default useOrderButton;
