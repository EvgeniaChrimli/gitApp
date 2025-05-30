import AllRepos from "../components/AllRepos/AllRepos";
import Chart from "../components/Chart/Chart";
import LastUpdated from "../components/LastUpdated/LastUpdated";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <AllRepos />
      <h2 className={styles.title}>Статистика по репозиториям</h2>
      <div className={styles.wrapper}>
        <Chart />
        <LastUpdated />
      </div>
    </div>
  );
};

export default HomePage;
