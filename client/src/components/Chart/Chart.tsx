import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import type { RootState } from "../../redux/store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Chart = () => {
  const { reposLanguage, loading, error } = useSelector(
    (state: RootState) => state.chartSlice
  );

  const labels = Object.keys(reposLanguage);
  const dataValues = Object.values(reposLanguage);

  const backgroundColors = [
    "#94BBE9",
    "#EEAECA",
    "##C4B4D9",
    "#B5B6DE",
    "#94BBE9",
    "#94BBE9",
    "#C4B4D9",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Количество репозиториев",
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <p style={{ width: 500 }}>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (labels.length === 0) return <p>Нет данных для отображения</p>;

  return (
    <section>
      <div className={styles.chart}>
        <h2 className={styles.title}>Репозитории по языкам</h2>
        <div className={styles.subtitle}>
          Статистика по языкам на текущей странице
        </div>
        <Doughnut data={chartData} />
      </div>
    </section>
  );
};

export default Chart;
