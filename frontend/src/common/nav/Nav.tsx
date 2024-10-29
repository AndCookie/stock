import styles from './Nav.module.css';

const Nav = () => {

  return (
    <>
      {/* Header 영역 */}
      <header className={styles.header}>
        <div className={styles.logo}>모두모투</div>
        <input className={styles.search} placeholder="주식, 메뉴, 종목코드를 검색하세요" />
        <div className={styles.icons}>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
        </div>
      </header>
    
    </>
  );
};

export default Nav;
