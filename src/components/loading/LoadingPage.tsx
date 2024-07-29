import styles from "./loader.module.css";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
}