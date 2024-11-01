import { stringToRelativeDate } from "../../common/utils";

// 뉴스와 공시 모두 사용합니다
const Item = ({
  main,
  date,
  sub,
  url,
}: {
  main: string;
  date: string;
  sub: string;
  url: string;
}) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const relativeDate = stringToRelativeDate(date);

  return (
    // cursor : pointer 넣어주세요!
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <div>{main}</div>
      <div>
        {relativeDate} | {sub}
      </div>
    </div>
  );
};

export default Item;
