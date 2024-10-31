import { useIndexData } from "./hooks/useIndexData";
// import styles from './IndexChart.module.css';

interface IndexChartProps {
  index: string;
}

const IndexChart: React.FC<IndexChartProps> = ({ index }) => {
  const indexData = useIndexData();
  return (
    <>
    {index}
    
    </>
  );
};

export default IndexChart;
