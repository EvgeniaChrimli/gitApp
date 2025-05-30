import React from "react";
import styles from "./Search.module.css";

interface Props {
  onSearch: (text: string) => void;
}

const Search = ({ onSearch }: Props) => {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(timeout);
  }, [text, onSearch]);
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className={styles.input}
      placeholder="search..."
    />
  );
};

export default Search;
