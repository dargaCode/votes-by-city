import React from "react";
import { NavLink } from "react-router-dom";
import "../../config/_general.scss";
import styles from "./NavigationBar.module.scss";

export default function NavigationBar(): JSX.Element {
  return (
    <nav className={styles.bar}>
      <div className="nocontent">
        {/* ignored by google */}
        <h2 className={styles.invisibleButOutlineReadable}>Navigation</h2>
      </div>
      <div className={styles.container}>
        <ul>
          <li className={styles.button}>
            <NavLink to="/hello" activeClassName="activeNavSection">
              Hello
            </NavLink>
          </li>

          <li className={styles.button}>
            <NavLink to="/world" activeClassName="activeNavSection">
              World
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
