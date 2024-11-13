import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const kospi200Companies = [
  '삼성전자',
  'SK하이닉스',
  'LG화학',
  '삼성바이오로직스',
  'NAVER',
  '현대차',
  '카카오',
  '삼성SDI',
  '기아',
  'POSCO홀딩스',
  '현대모비스',
  'LG에너지솔루션',
  '셀트리온',
  'KB금융',
  '삼성물산',
  '신한지주',
  'LG전자',
  'SK이노베이션',
  'SK텔레콤',
  '삼성생명',
  '한국전력',
  'SK',
  'HMM',
  '아모레퍼시픽',
  'LG생활건강',
  '하나금융지주',
  'KT&G',
  'SK바이오사이언스',
  '우리금융지주',
  '한화솔루션',
  '카카오뱅크',
  '고려아연',
  '기업은행',
  'S-Oil',
  '포스코케미칼',
  'KT',
  '한국조선해양',
  '삼성에스디에스',
  '삼성전기',
  'LG디스플레이',
  '한온시스템',
  'CJ제일제당',
  '현대중공업',
  '한화에어로스페이스',
  '엔씨소프트',
  '현대제철',
  '넷마블',
  '대한항공',
  '롯데케미칼',
  '두산밥캣',
  '한미사이언스',
  '한미약품',
  '삼성화재',
  '강원랜드',
  '현대글로비스',
  '아모레G',
  '한국타이어앤테크놀로지',
  '코웨이',
  'LG유플러스',
  'SK바이오팜',
  '삼성증권',
  '현대건설',
  'GS',
  '금호석유',
  '하이브',
  'DB손해보험',
  '한국가스공사',
  'NH투자증권',
  '한화생명',
  '오리온',
  '한국금융지주',
  '미래에셋증권',
  '두산에너빌리티',
  'GS건설',
  '한국항공우주',
  'CJ대한통운',
  '한화',
  '현대해상',
  '한국앤컴퍼니',
  'LG이노텍',
  'BGF리테일',
  '현대백화점',
  'DL이앤씨',
  '삼성카드',
  '효성티앤씨',
  '효성첨단소재',
  '현대위아',
  '한솔케미칼',
  '호텔신라',
  'LS',
  '대우건설',
  '한국앤컴퍼니',
  '한샘',
  '롯데지주',
  '한화시스템',
  'OCI',
  '현대로템',
  '코오롱인더',
  '한국콜마',
  '한전KPS',
  '휠라홀딩스',
  '대한유화',
  '한세실업',
  'F&F',
  '신세계',
  '동서',
  '한국앤컴퍼니',
];

const useDropdown = (inputValue: string) => {
  const navigate = useNavigate();
  const [dropDownList, setDropDownList] = useState(kospi200Companies);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [isFocus, setIsFocus] = useState(false);

  const updatedDropDownList = () => {
    if (inputValue === '') {
      setDropDownList([]);
      return;
    }

    const getRelatedKeywordArr = kospi200Companies.filter(
      (textItem) =>
        textItem.includes(inputValue.toLocaleLowerCase()) ||
        textItem.includes(inputValue.toUpperCase())
    );

    setDropDownList(getRelatedKeywordArr);
    setDropDownItemIndex(-1);
  };

  const handleDropDownKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.trim() === '' || event.nativeEvent.isComposing) return;

    if (event.code === 'ArrowDown') {
      if (dropDownItemIndex === dropDownList.length - 1) {
        setDropDownItemIndex(-1);
      } else {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }
    }

    if (event.code === 'ArrowUp') {
      if (dropDownItemIndex === -1) {
        setDropDownItemIndex(dropDownList.length - 1);
      } else {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }
    }

    if (event.code === 'Enter') {
      // 원래 let
      const keyword = dropDownList[dropDownItemIndex]
        ? dropDownList[dropDownItemIndex]
        : inputValue;
      navigate(`/search?keyword=${keyword}`);
    }
  };

  const handleClickSearchBox = (e: MouseEvent) => {
    const isFocus = (e.target as HTMLElement).closest('form')?.dataset.id;
    console.log('Clicked outside of search box:', !isFocus);
    if (isFocus) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  };

  const handleClickDropDownList = (dropDownItem: string) => {
    navigate(`/search?keyword=${dropDownItem}`);
  };

  useEffect(() => {
    updatedDropDownList();
    console.log('Updated dropDownList:', dropDownList);
    setIsFocus(true);
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener('click', handleClickSearchBox);
    return () => {
      document.removeEventListener('click', handleClickSearchBox);
    };
  }, []);

  return {
    handleClickDropDownList,
    handleDropDownKeyDown,
    isFocus,
    dropDownList,
    setDropDownItemIndex,
    dropDownItemIndex,
  };
};

export default useDropdown;
