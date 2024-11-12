import { WebSocketServer } from "ws";

const socket = new WebSocketServer({ port: 8080 });

const fakeTradingData = () => {
  const now = new Date();
  const formatTime = (date) =>
    `${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}`;

  return {
    type: "TRADING",
    payload: {
      STCK_CNTG_HOUR: formatTime(now),
      STCK_PRPR: parseFloat((50000 * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
      CNTG_VOL: Math.floor(Math.random() * 1000),
      ACML_VOL: Math.floor(100000 + Math.random() * 5000),
      CTTR: parseFloat((50 + Math.random() * 50).toFixed(2)),
      CCLD_DVSN: Math.random() < 0.33 ? 1 : Math.random() < 0.66 ? 3 : 5,
    }
  };
};

const fakeOrderBookData = () => {
  const randomPrice = () => Math.floor(1000 + Math.random() * 1000);
  const randomVolume = () => Math.floor(Math.random() * 1000);

  return {
    type: "ORDER_BOOK",
    payload: {
      ASKP1: randomPrice(),
      ASKP2: randomPrice(),
      ASKP3: randomPrice(),
      ASKP4: randomPrice(),
      ASKP5: randomPrice(),
      ASKP6: randomPrice(),
      ASKP7: randomPrice(),
      ASKP8: randomPrice(),
      ASKP9: randomPrice(),
      ASKP10: randomPrice(),
      BIDP1: randomPrice(),
      BIDP2: randomPrice(),
      BIDP3: randomPrice(),
      BIDP4: randomPrice(),
      BIDP5: randomPrice(),
      BIDP6: randomPrice(),
      BIDP7: randomPrice(),
      BIDP8: randomPrice(),
      BIDP9: randomPrice(),
      BIDP10: randomPrice(),
      ASKP_RSQN1: randomVolume(),
      ASKP_RSQN2: randomVolume(),
      ASKP_RSQN3: randomVolume(),
      ASKP_RSQN4: randomVolume(),
      ASKP_RSQN5: randomVolume(),
      ASKP_RSQN6: randomVolume(),
      ASKP_RSQN7: randomVolume(),
      ASKP_RSQN8: randomVolume(),
      ASKP_RSQN9: randomVolume(),
      ASKP_RSQN10: randomVolume(),
      BIDP_RSQN1: randomVolume(),
      BIDP_RSQN2: randomVolume(),
      BIDP_RSQN3: randomVolume(),
      BIDP_RSQN4: randomVolume(),
      BIDP_RSQN5: randomVolume(),
      BIDP_RSQN6: randomVolume(),
      BIDP_RSQN7: randomVolume(),
      BIDP_RSQN8: randomVolume(),
      BIDP_RSQN9: randomVolume(),
      BIDP_RSQN10: randomVolume(),
      TOTAL_ASKP_RSQN: randomVolume() * 10,
      TOTAL_BIDP_RSQN: randomVolume() * 10,
    },
  };
};

const sendData = (ws, data) => {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(data));
  }
};

socket.on("connection", (ws) => {
  const intervalId = setInterval(() => {
    sendData(ws, fakeTradingData());
    sendData(ws, fakeOrderBookData());
  }, 1000);

  ws.on("close", () => {
    clearInterval(intervalId);
  });

  ws.on("error", (error) => {
    console.error(error);
  });
});