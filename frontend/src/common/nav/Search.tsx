import { FormEvent } from 'react';
import useInput from '../hooks/useInput';
import styles from './Nav.module.css';
import { fetchSearch } from './actions';
import { useState, useEffect } from 'react';
import { getRelativePosition } from 'chart.js/helpers';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { inputValue, handleChange } = useInput('');
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchSearch(inputValue);
    if (res) {
      // TODO: navigate로 이동
      console.log(res);
    }
  };

  useEffect(() => {
    const handleClickSearchBox = (e: MouseEvent) => {
      const isFocus = (e.target as HTMLElement).closest('form')?.dataset.id;
      if (isFocus) {
        setIsFocus(true);
      } else {
        setIsFocus(false);
      }
    };

    window.addEventListener('click', handleClickSearchBox);
    return () => {
      window.removeEventListener('click', handleClickSearchBox);
    };
  }, [setIsFocus]);

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

  const [dropDownList, setDropDownList] = useState(kospi200Companies);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const updateDropDownList = () => {
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

  useEffect(() => {
    updateDropDownList();
  }, [inputValue]);

  const navigate = useNavigate();

  const handleClickDropDownList = (dropDownItem: string) => {
    // 나중에 검색 결과로 이동할 수 있도록 로직 수정
    navigate('/');
  };

  const handleDropDownKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.trim() === '' || event.nativeEvent.isComposing) return;

    if (event.code === 'ArrowDown') {
      dropDownItemIndex === dropDownList.length - 1
        ? setDropDownItemIndex(-1)
        : setDropDownItemIndex(dropDownItemIndex + 1);
    }

    if (event.code === 'ArrowUp') {
      dropDownItemIndex === -1
        ? setDropDownItemIndex(dropDownList.length - 1)
        : setDropDownItemIndex(dropDownItemIndex - 1);
    }
    if (event.code === 'Enter') {
      let keyword = dropDownList[dropDownItemIndex] ? dropDownList[dropDownItemIndex] : inputValue;
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.search}
          placeholder="주식, 메뉴, 종목코드를 검색하세요"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
