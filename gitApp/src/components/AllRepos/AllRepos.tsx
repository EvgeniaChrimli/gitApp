import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { allReposThunk } from "./allReposThunk";
import {
  addToFavorite,
  initFavorite,
  setSelectedLanguage,
} from "../../redux/allReposSlice";
import { Link } from "react-router";
import saved from "/save.svg";
import plus from "/plus.svg";
import arrow from "/arrowright.svg";
import styles from "./AllRepos.module.css";
import Search from "../Search/Search";
import Skeleton from "../Skeleton/Skeleton";

const AllRepos = () => {
  const { repos, favorite, selectedLanguage, loading } = useSelector(
    (state: RootState) => state.allReposSlice
  );
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    dispatch(allReposThunk({ page: page, per_page: 6 }));
    const storage = localStorage.getItem("like");
    const parseData = storage ? JSON.parse(storage) : [];
    dispatch(initFavorite(parseData));
  }, [dispatch, page]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const addFavorite = (id: number) => {
    dispatch(addToFavorite(id));
  };

  const filteredRepos = repos
    .filter((repo) =>
      selectedLanguage === "All" ? true : repo.language === selectedLanguage
    )
    .filter((repo) =>
      search.trim() === ""
        ? true
        : repo.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <section className={styles.repos}>
      <h1 className={styles.title}>Список всех репозиториев</h1>
      <div className={styles.filters}>
        <Search onSearch={setSearch} />
        <select
          className={styles.select}
          onChange={(e) => dispatch(setSelectedLanguage(e.target.value))}
        >
          <option value="All">Все языки</option>
          <option value="TypeScript">TypeScript</option>
          <option value="HTML">HTML</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="C++">C++</option>
        </select>
      </div>
      <div className={styles.row}>
        {loading
          ? skeletons
          : filteredRepos.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.top}>
                  <div className={styles.topText}>
                    <span className={styles.bold}>Watchers:</span>
                    <span> {item.watchers}</span>
                  </div>
                  <div className={styles.topText}>
                    <span className={styles.bold}>Forks:</span>
                    <span>{item.forks}</span>
                  </div>
                </div>
                <div className={styles.name}>
                  <span className={styles.bold}>Name:</span> {item.name}
                </div>
                <p className={styles.lang}>
                  <span className={styles.bold}>Language: </span>
                  {item.language || "not specified"}
                </p>
                <div className={styles.actions}>
                  <img
                    className={styles.favorite}
                    onClick={() => addFavorite(item.id)}
                    src={
                      favorite.some((repo) => repo.id === item.id)
                        ? saved
                        : plus
                    }
                  />
                  <Link className={styles.favorite} to={`/${item.full_name}`}>
                    <img className={styles.favorite} src={arrow} alt="info" />
                  </Link>
                </div>
              </div>
            ))}
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.btn} onClick={prevPage} disabled={page < 1}>
          Назад
        </button>
        <button className={styles.btn} onClick={nextPage}>
          Вперед
        </button>
      </div>
    </section>
  );
};

export default AllRepos;
