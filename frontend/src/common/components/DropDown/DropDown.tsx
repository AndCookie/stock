import styles from './DropDown.module.css';
import { IDropDownProps } from './definition';

const Dropdown = ({
  handleClickDropDownList,
  dropDownList,
  setDropDownItemIndex,
  dropDownItemIndex,
}: IDropDownProps) => {
  return (
    <div className={styles.DropDownBox}>
      {dropDownList.length === 0 && (
        <div className={styles.DropDownItem}>해당하는 단어가 없습니다</div>
      )}

      {dropDownList.slice(0, 4).map((dropDownItem, dropDownIndex) => {
        return (
          <div
            key={`${dropDownItem}-${dropDownIndex}`}
            onClick={() => handleClickDropDownList(dropDownItem)}
            onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
            className={`${styles.DropDownItem} ${
              dropDownItemIndex === dropDownIndex ? styles.selected : ''
            } `}
          >
            <div>{dropDownItem}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
