import { FormEvent } from 'react';
import useInput from '../hooks/useInput';
import styles from './Nav.module.css';
import { fetchSearch } from './actions';
import useDropdown from '../hooks/useDropdown';
import Dropdown from '../components/DropDown';

const Search = () => {
  const { inputValue, handleChange } = useInput('');

  const {
    handleDropDownKeyDown,
    isFocus,
    handleClickDropDownList,
    dropDownList,
    setDropDownItemIndex,
    dropDownItemIndex,
  } = useDropdown(inputValue);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchSearch(inputValue);
    console.log('Fetch Search Result:', res);
    if (res) {
      // TODO: navigate로 이동
      console.log(res);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} data-id='searchForm'>
        <input
          className={styles.search}
          placeholder="주식, 메뉴, 종목코드를 검색하세요"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleDropDownKeyDown}
        />
        {isFocus && (
          <Dropdown
            handleClickDropDownList={handleClickDropDownList}
            dropDownList={dropDownList}
            setDropDownItemIndex={setDropDownItemIndex}
            dropDownItemIndex={dropDownItemIndex}
          />
        )}
      </form>
    </div>
  );
};

export default Search;
