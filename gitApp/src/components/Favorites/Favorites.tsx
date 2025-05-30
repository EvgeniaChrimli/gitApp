import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { removeFavorite } from "../../redux/allReposSlice";
import { Link } from "react-router";
import styles from "./Favorite.module.css";
import Navigation from "../Navigation/Navigation";
const Favorites = () => {
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.allReposSlice.favorite
  );
  const remove = (id: number) => {
    dispatch(removeFavorite(id));
  };
  return (
    <section>
      <div className={styles.container}>
        <Navigation />
        <ul className={styles.list}>
          {favorites.map((item) => (
            <li key={item.id} className={styles.item}>
              <Link className={styles.link} to={`/${item.full_name}`}>
                {item.full_name}
              </Link>
              <button className={styles.btn} onClick={() => remove(item.id)}>
                remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Favorites;
