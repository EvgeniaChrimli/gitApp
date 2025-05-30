import React from "react";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { lastUpdatedThunk } from "./lastUpdatedThunk";
import styles from "./LastUpdate.module.css";

const LastUpdated = () => {
  const dispatch: AppDispatch = useDispatch();
  const repos = useSelector((state: RootState) => state.lastUpdateSlice.repo);

  React.useEffect(() => {
    dispatch(lastUpdatedThunk());
  }, []);

  return (
    <section className={styles.lastUpdate}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Последние обновленные репозитории</h3>
        <p className={styles.subtitle}>
          Указаны репозитории с количеством звезд более 20.000
        </p>
        <ul className={styles.list}>
          {repos.map((item) => (
            <li key={item.id} className={styles.item}>
              <p className={styles.name}>
                <span className={styles.bold}>Name:</span> {item.name}
              </p>
              <p className={styles.crreated}>
                <span className={styles.bold}> Created at: </span>
                {item.created_at
                  ? Math.floor(
                      (Date.now() - new Date(item.created_at).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : "Unknown"}
                day
              </p>
              <div className={styles.infogroup}>
                <p className={styles.info}>
                  <span className={styles.bold}>Forks:</span> {item.forks}
                </p>
                <p className={styles.info}>
                  <span className={styles.bold}>Watchers:</span> {item.watchers}
                </p>
                <p className={styles.info}>
                  <span className={styles.bold}>Issues count:</span>{" "}
                  {item.open_issues_count}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LastUpdated;
