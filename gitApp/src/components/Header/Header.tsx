import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Link } from "react-router";
import { useTheme } from "../Theme/ThemeContext";
import more from "/more.svg";
import styles from "./Header.module.css";

const Header = () => {
  const { theme, toogle } = useTheme();
  const favorite = useSelector(
    (state: RootState) => state.allReposSlice.favorite
  );
  const count = favorite.length;
  function normalize_count_form(number: number, words_arr: string[]) {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
      let options = [2, 0, 1, 1, 1, 2];
      return words_arr[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : options[number % 10 < 5 ? number % 10 : 5]
      ];
    }
    return words_arr[1];
  }
  const res = normalize_count_form(count, [
    "репозитоий",
    "репозитория",
    "репозиториев",
  ]);
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.logo}>LOGO.</div>
          <div className={styles.favorites}>
            <p className={styles.desktop}>
              В избранном {count} {res}
            </p>
            <p className={styles.mobile}>Избранное</p>
            <Link to="favorites">
              <img className={styles.img} src={more} alt="more" />
            </Link>
            <button className={styles.btn} onClick={toogle}>
              {theme}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
