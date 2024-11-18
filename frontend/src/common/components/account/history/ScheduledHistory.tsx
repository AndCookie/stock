import React from 'react';
import { useState, useEffect } from 'react';
import { useScheduledHistoryStore } from '../../../../store/useHistoryStore';
import { IScheduledHistoryData } from '../../../../store/definitions';

const ScheduledHistory: React.FC<{ filter: string; isMyPage: boolean }> = ({
  filter,
  isMyPage,
}) => {
  // isDetailPage가 true면 filter가 stockCode
  // isDetailPage가 false면 메인페이지랑 마이페이지
  const isDetailPage = filter !== 'ALL';

  // TODO 이건 나중에 디자인 끝나고 지우세요!!
  console.log('Temp', isMyPage);
  console.log('Temp', isDetailPage);

  const { scheduledHistoryData, fetchScheduledHistoryData, deleteScheduledArray } =
    useScheduledHistoryStore();
  const [filteredHistoryData, setFilteredHistoryData] = useState<IScheduledHistoryData[]>([]);

  const deleteScheduledHistoryData = (index: number) => {
    if (!deleteScheduledArray.includes(index)) {
      deleteScheduledArray.push(index);
      fetchScheduledHistoryData();
    }
    console.log(deleteScheduledArray);
  };

  useEffect(() => {
    if (!scheduledHistoryData) {
      fetchScheduledHistoryData();
    }
  }, []);

  useEffect(() => {
    if (scheduledHistoryData) {
      console.log('### scheduledHistoryData: ', scheduledHistoryData);
      if (filter === 'ALL') {
        setFilteredHistoryData(scheduledHistoryData);
      } else {
        setFilteredHistoryData(scheduledHistoryData.filter(({ pdno }) => pdno === filter));
      }
    }
  }, [scheduledHistoryData]);

  const renderHistoryData = (historyData: IScheduledHistoryData[]) =>
    historyData.length - deleteScheduledArray.length > 0 ? (
      historyData.map((order, index) =>
        !deleteScheduledArray.includes(index) ? (
          <div key={index}>
            <span>{order.prdt_name}</span>
            <span>
              현재가 {order.tar_pr}원 {order.sll_buy_dvsn_cd === 'BUY' ? '이하' : '이상'}일 때
            </span>
            <span>
              {order.sll_buy_dvsn_cd === 'BUY' ? '구매' : '판매'} {order.ord_qty}주
            </span>{' '}
            ·{' '}
            <span>
              {order.ord_unpr === 0 ? '시장가 주문' : `지정가 주문 · 주문가 ${order.ord_unpr}원`}
            </span>
            {/* 대기 주문 취소 */}
            <div onClick={() => deleteScheduledHistoryData(index)}>X</div>
          </div>
        ) : null
      )
    ) : (
      <p>조건내역이 없습니다</p>
    );

  return (
    <div>
      <div className="content">
        <div className="section">
          <div className="title">조건 현황 {filteredHistoryData.length - deleteScheduledArray.length}건</div>
          {renderHistoryData(filteredHistoryData)}
        </div>
      </div>
    </div>
  );
};

export default ScheduledHistory;
