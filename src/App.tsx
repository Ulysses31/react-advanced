import { Outlet } from "react-router-dom";
import styles from './App.module.css';
import NavBar from "./template/NavBar";

function App() {
  return (
    <main className={styles.main}>
      <NavBar />
      <hr/>
      <Outlet />
    </main>
  );
}

export default App;
