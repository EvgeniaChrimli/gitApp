import React from "react";
import { useParams } from "react-router";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { repoPageThunk } from "./RepoPageThunk";
import Navigation from "../Navigation/Navigation";
import styles from "./RepoPage.module.css";

const RepoPage = () => {
  const { owner, repo } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const ownrepo = useSelector((state: RootState) => state.RepoPageSlice.repo);
  const [readme, setReadme] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!owner || !repo) return;
    else {
      dispatch(repoPageThunk({ owner, repo }));
    }
  }, []);

  React.useEffect(() => {
    const fetchReadme = async () => {
      try {
        const res = await fetch(
          `https://git-app-kappa.vercel.app/api/github/repos/${owner}/${repo}/readme`
        );
        const data = await res.json();
        const decoded = atob(data.content);
        setReadme(decoded);
      } catch (error) {
        console.error("Ошибка загрузки README:", error);
        setReadme("README не найден");
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [owner, repo]);
  const lines = readme && readme.split("\n");
  const preview = lines && lines.slice(0, 3).join("\n");

  if (loading) return <p>Загрузка...</p>;
  if (!readme) return <p>README не найден</p>;
  return (
    <section>
      <div className={styles.container}>
        <Navigation />
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.person}>
              <p className={styles.name}>{ownrepo?.full_name}</p>
              <img
                className={styles.img}
                src={ownrepo?.owner.avatar_url}
                alt="awatar"
              />
            </div>
            <p className={styles.title}>#README</p>
            <div className={styles.readme}>
              {expanded ? readme : preview}
              {lines && lines.length > 3 && (
                <button
                  className={styles.btn}
                  onClick={() => setExpanded(!expanded)}
                  style={{ marginTop: "10px" }}
                >
                  {expanded ? "Скрыть" : "Читать полностью"}
                </button>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.rightinfo}>Forks: {ownrepo?.forks}</p>
            <p className={styles.rightinfo}>Watchers: {ownrepo?.watchers}</p>
            <p className={styles.rightinfo}>Language: {ownrepo?.language}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepoPage;
