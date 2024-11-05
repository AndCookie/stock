// To. ALL
// 위젯 내부에 클릭해야되는 버튼 있는 경우,
// 해당 버튼에 onMouseDown 이벤트나 onClick 이벤트 발생 시
// stopPropagation이랑 setIsDraggable 설정해주세요.
// setIsDraggable은 props로 받으시면 됩니다.

// To. 광영
// dashboard 페이지에서 Ctrl+스크롤로 화면 축소해서 50까지 줄여보면
// 화면 크기에 따라서 위젯 내에 차트가 차지하는 크기 비중이 달라지는데
// 이 부분 고쳐주세요.

// To. 선재누나
// 추가하기 버튼 위치 임의로 넣어놨는데 바꿔주세요!
// alert창 CSS 부탁드립니다.
// userSelect: 'none' 꼭 넣어야 합니다!! 텍스트 선택 방지 목적입니다. (Ctrl+f로 찾아보시면 딱 하나 있습니다.)

// TO DO
// Layout 정보 갱신될 때마다 백엔드에 POST 요청 보내서 저장하기, GET 요청 결과가 null이면 initialLayout으로

import React, { useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';

// 위젯 임포트
import Chart from "../dashboard/chart/Chart";
import Info from "../dashboard/info/Info";
import OrderBook from "../dashboard/orderBook/OrderBook";
import Symbol from "../dashboard/symbol/Symbol";
import Trading from "../dashboard/trading/Trading";
import TradingTrend from "../dashboard/tradingTrend/TradingTrend";
import TradingVolume from "../dashboard/tradingVolume/TradingVolume";

// 훅 임포트
import useWindowSize from './hooks/useWindowSize';

// 디자인
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import styles from './DashboardPage.module.css';

// 컴포넌트 타입 정의
type WidgetComponentProps = {
  setIsDraggable: (value: boolean) => void;
};

// 위젯 컴포넌트를 동적으로 매핑하기 위한 객체
const widgetComponents: { [key: string]: React.ComponentType<WidgetComponentProps> } = {
  chartWidget: Chart,
  infoWidget: Info,
  orderBookWidget: OrderBook,
  symbolWidget: Symbol,
  tradingWidget: Trading,
  tradingTrendWidget: TradingTrend,
  tradingVolumeWidget: TradingVolume,
};

const DashboardPage = () => {
  const { width, height } = useWindowSize(); // 윈도우 크기 가져오기

  // 초기 레이아웃 설정
  const initialLayout: Layout[] = [
    { i: 'chartWidget', x: 0, y: 2, w: 6, h: 10 },
    { i: 'infoWidget', x: 0, y: 12, w: 3, h: 4 },
    { i: 'orderBookWidget', x: 6, y: 0, w: 3, h: 16 },
    { i: 'symbolWidget', x: 0, y: 0, w: 6, h: 2 },
    { i: 'tradingWidget', x: 9, y: 8, w: 3, h: 8 },
    { i: 'tradingTrendWidget', x: 3, y: 12, w: 3, h: 4 },
    { i: 'tradingVolumeWidget', x: 9, y: 0, w: 3, h: 8 },
  ];
  
  const [layout, setLayout] = useState<Layout[]>(initialLayout); // 위젯 레이아웃 상태
  const [forceRerenderKey, setForceRerenderKey] = useState(0); // 강제 리렌더링을 위한 key
  const [isWidgetVisible, setIsWidgetVisible] = useState<{ [key: string]: boolean }>({
    chartWidget: true,
    infoWidget: true,
    orderBookWidget: true,
    symbolWidget: true,
    tradingWidget: true,
    tradingTrendWidget: true,
    tradingVolumeWidget: true,
  }); // 각 위젯의 가시성 상태
  const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부
  const [isDraggable, setIsDraggable] = useState(true); // 드래그 가능 여부를 상태로 관리

  const maxRows = 16;
  const maxCols = 12;

  // 드래그 종료 시 & 크기 조정 완료 시 호출되는 함수
  const handleLayoutChange = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout
  ) => {
    // 모든 아이템을 순회하며, 각 item의 y + h가 maxRows를 초과하는지 확인
    const exceedsMaxRows = layout.some(item => item.y + item.h > maxRows);

    // maxRows를 초과하면 드래그 제한
    if (exceedsMaxRows) {
      // 이전 위치로 복원
      setLayout(prevLayout =>
        prevLayout.map(item =>
          item.i === newItem.i
            ? { ...item, x: oldItem.x, y: oldItem.y } // 원래 위치로 복원
            : item
        )
      );

      // 강제 리렌더링을 위해 key 값 업데이트
      setForceRerenderKey(prevKey => prevKey + 1);
    } else {
      setLayout(layout); // 문제 없으면 위치를 업데이트
    }
  };

  // 모달 창 토글 함수
  const toggleModal = () => setShowModal(!showModal);

  // 위젯 추가 시, 추가할 공간 찾는 함수
  const findNewPos = (): [number, number] => {
    // 2D 배열 초기화
    const arr: number[][] = Array.from({ length: maxRows }, () => Array(maxCols).fill(0));
    // layout에 따라 arr 채우기
    for (let item of layout) {
      for (let t = item.y; t < item.y + item.h; t++) {
        for (let i = item.x; i < item.x + item.w; i++) {
          arr[t][i] = 1;
        }
      }
    }
    // toAdd의 새로운 위치 찾기
    for (let y = 0; y < maxRows - 4; y++) {
      for (let x = 0; x < maxCols - 2; x++) {
        let flag = true;
        for (let t = 0; t < 5; t++) {
          if (arr[y + t].slice(x, x + 3).some(value => value !== 0)) {
            flag = false;
            break;
          }
        }
        if (flag) {
          return [x, y];
        }
      }
    }
    return [-1, -1];
  };

  // 위젯을 추가하는 함수
  const handleAddWidget = (widgetId: string) => {
    if (!isWidgetVisible[widgetId]) {
      const newPos = findNewPos();
      // 만약 newPos[0] == -1이거나 newPos[1] == -1이면
      if (newPos[0] === -1 || newPos[1] === -1) {
        alert("위젯을 추가할 수 없습니다.");
      } else {
        // 아니면 위젯 가시성 상태 업데이트
        setIsWidgetVisible(prev => ({ ...prev, [widgetId]: true }));
        // 그리고 새 위치에 위젯 추가
        setLayout(prev => [...prev, { i: widgetId, x: newPos[0], y: newPos[1], w: 3, h: 5 }]);
      }
      // 강제 리렌더링을 위해 key 값 업데이트
      setForceRerenderKey(prevKey => prevKey + 1);
      toggleModal();
    }
  };

  // 위젯을 숨기는 함수
  const handleRemoveWidget = (widgetId: string) => {
    // 위젯 가시성 상태 업데이트
    setIsWidgetVisible(prev => ({ ...prev, [widgetId]: false }));
    // 레이아웃에서 위젯 제거
    setLayout(prev => prev.filter(item => item.i !== widgetId));
  };

return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '50px' }}>
        {/* 우측 상단에 추가하기 버튼 */}
        <button
          onClick={toggleModal}
          style={{
            color: 'black',
          }}
        >
          추가하기
        </button>
      </div>

      <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw', position: 'relative', userSelect: 'none' }}>
        <div>
          {/* 모달 창 */}
          {showModal && (
            <div
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101
              }}
              onClick={toggleModal} // 바깥 영역 클릭 시 모달 닫힘
            >
              <div
                style={{
                  backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
              >
                <button
                  onClick={toggleModal}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10000,
                    border: 'none',
                    width: '20px',
                    height: '20px',
                    color: 'black',
                  }}
                >
                  X
                </button>
                <h3 style={{ color: 'black', }}>위젯 추가/숨김</h3>
                <ul>
                  {/* 위젯 리스트: 각 위젯의 가시성 여부에 따라 추가 또는 숨김 버튼 표시 */}
                  {Object.keys(isWidgetVisible).map(widgetId => (
                    <li key={widgetId} style={{ color: 'black', }}>
                      {widgetId.toUpperCase()} - {isWidgetVisible[widgetId] ? "보임" : "숨김"}
                      {isWidgetVisible[widgetId] ? (
                        <button
                          onClick={() => handleRemoveWidget(widgetId)}
                          style={{
                            color: 'black',
                          }}
                        >
                          숨김
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddWidget(widgetId)}
                          style={{
                            color: 'black',
                          }}
                        >
                          추가
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {/* <button
                  onClick={toggleModal}
                  style={{ color: 'black', }}
                >
                  닫기
                </button> */}
              </div>
            </div>
          )}
        </div>

        <div>
          {/* 그리드 레이아웃 */}
          <GridLayout
            key={forceRerenderKey} // 강제 리렌더링을 위해 key 사용
            className="layout"
            layout={layout}
            cols={maxCols}
            maxRows={maxRows}
            rowHeight={Math.floor(height / 20)}
            width={width - 35}
            isDraggable={isDraggable} // 상태에 따라 드래그 가능 여부 제어
            isResizable={true}
            resizeHandles={['se']}
            autoSize={true}
            onLayoutChange={(layout) => console.log(layout)}
            onDragStop={handleLayoutChange} // 드래그 종료 시 커스텀 로직 적용
            onResizeStop={handleLayoutChange} // 크기 조정 완료 시 커스텀 로직 적용
          >
            {/* 가시성 상태에 따라 위젯을 조건부로 렌더링 */}
            {Object.keys(isWidgetVisible).map(widgetId => (
              isWidgetVisible[widgetId] && (
                <div key={widgetId} className="drag-handle" style={{ overflow: 'hidden', position: 'relative', backgroundColor: 'grey', }}>
                  <div>
                    {/* 위젯을 숨기기 위한 X 버튼 */}
                    <button
                      onMouseDown={(event) => {
                        event.stopPropagation(); // 부모 요소로의 이벤트 전파를 막아, 드래그보다 클릭이 우선
                        setIsDraggable(false); // X 버튼 클릭 시 드래그 비활성화
                      }}
                      onClick={(event) => {
                        event.stopPropagation(); // 부모 요소로의 이벤트 전파를 막아, 드래그가 작동하지 않도록
                        handleRemoveWidget(widgetId); // 해당 위젯을 제거하는 함수 호출
                        setIsDraggable(true); // 클릭 후 드래그 다시 활성화
                      }}
                      style={{
                        position: 'absolute', top: 0, right: 0, zIndex: 10000, border: 'none', width: '20px', height: '20px', color: 'black',
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div>
                    {/* 동적으로 위젯 컴포넌트를 생성 & setIsDraggable 전달 */}
                    {React.createElement(widgetComponents[widgetId], { setIsDraggable })}
                  </div>
                </div>
              )
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
