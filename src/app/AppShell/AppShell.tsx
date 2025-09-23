import { Outlet } from "react-router-dom";
import styles from "./AppShell.module.css";

export const AppShell = () => {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <h1>Rick & Morty Explorer</h1>
      </header>

      <main className={styles.main}>
        {/*  Child routes (like CharactersPage) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};
