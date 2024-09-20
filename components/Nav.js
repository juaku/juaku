import React from 'react';
import { useUpload } from '../context/Context';
import styles from '../styles/Nav.module.css';

const Nav = () => {
    const { triggerUpload } = useUpload();

    const handleScrollOrReload = () => {
        if (window.scrollY === 0) {
            window.location.reload();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className={ styles.nav }>
            <button className={`${styles.upIcon} ${styles.icon}`}   onClick={handleScrollOrReload} >Ir arriba</button>
            <input type="text" placeholder="Buscar" className={styles.search} />
            <button onClick={triggerUpload} className={`${styles.addIcon} ${styles.icon}`}>Subir</button>
            {/* <div className={ styles.profile }></div> */}
        </nav>
    );
};

export default Nav;