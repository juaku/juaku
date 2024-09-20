import React from 'react';
import { useUpload } from '../context/Context';
import styles from '../styles/Nav.module.css';

const Nav = () => {
    const { triggerUpload } = useUpload();

    return (
        <nav className={ styles.nav }>
            <button className={`${styles.upIcon} ${styles.icon}`}>Ir arriba</button>
            <input type="text" placeholder="Buscar" />
            <button onClick={triggerUpload} className={`${styles.addIcon} ${styles.icon}`}>Subir</button>
            <div className={ styles.profile }></div>
        </nav>
    );
};

export default Nav;