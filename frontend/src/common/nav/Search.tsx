import { FormEvent } from 'react';
import useInput from '../hooks/useInput';
import styles from './Nav.module.css';
import { fetchSearch } from './actions';

const Search = () => {
  const { inputValue, handleChange } = useInput('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchSearch(inputValue);
    if (res) {
      // TODO: navigate로 이동
      console.log(res);
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
