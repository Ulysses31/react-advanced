import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div>
      <ul className={styles.menulist}>
        <li className={styles.menulistItem}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={styles.menulistItem}>
          <Link to="/categories">Categories</Link>
        </li>
        <li className={styles.menulistItem}>
          <Link to="/records">Records</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
