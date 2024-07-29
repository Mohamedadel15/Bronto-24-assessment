import styles from "@/style/loader.module.css";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center" >
            <div className={styles.loader}></div>
        </div >
    );
}