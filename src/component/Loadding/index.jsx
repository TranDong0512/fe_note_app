import styles from "./styles.module.css";
function Loading() {
  return (
    <div
      className={styles.loader}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    ></div>
  );
}

export default Loading;
