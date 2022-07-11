import Link from 'next/link';
import styles from './nav.module.css';
import useAuth from '../utils/AuthProvider';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navigation() {
  const [search, setSearch] = useState('');
  const [mobileNavShow, setMobileMenu] = useState(false);
  const { user, logoutHandler } = useAuth();
  const router = useRouter();
  const loginButton = (user) ?
    <>
      <span className={styles.user}>Hi, {user}</span>
      <button className={styles.btn_logout} onClick={logoutHandler}>Log out</button>
    </>
    :
    <>
      <Link href='/login'>
        <a className={styles.btn_login}>Login </a>
      </Link>
    </>
    ;
  const handleChange = (value) => {
    setSearch(value);
  };
  const handleClick = () => {
    if (search == '') {
      alert('Masukkan judul film yang ingin anda cari')
    } else {
      router.push({
        pathname: '/search',
        query: { s: search },
      })
    }
  };
  const showMenu = () => {
    setMobileMenu(!mobileNavShow);
  };
  console.log('user', user)
  return (
    <nav className={styles.nav}>
      <div className={styles.title_container}>
        <Link href='/'>
          <a className='text-xl font-bold my-2 lg:py-1'>Movie Watchlist </a>
        </Link>
        {(user) &&
          <Link href='/saved'>
            <a className={styles.btn_link}>Saved </a>
          </Link>
        }
      </div>

      <div className={styles.search_container}>
        <input
          onChange={(e) => handleChange(e.target.value)}
          type={'text'}
          placeholder="Search a movie title"
          value={search}
          className={styles.input}
        />
        <button onClick={handleClick} className={styles.btn_search}>Search</button>
      </div>

      <div className={styles.login_container}>
        <span className='mr-3 h-full text-center inline-block'>{user}</span>
        <button onClick={showMenu} className={styles.mobile_nav_toggle}>☰</button>
        {loginButton}
      </div>

      <div className={`${styles.mobile_nav} ${(mobileNavShow) ? styles.mobile_nav_show : ''}`}>
        <div className={styles.mobile_nav_search_container}>
          <input
            onChange={(e) => handleChange(e.target.value)}
            type={'text'}
            placeholder="Search a movie title"
            value={search}
            className={styles.mobile_nav_input}
          />
          <button onClick={() => { handleClick(); showMenu(); }} className={styles.mobile_nav_btn_search}>Search</button>
        </div>
        {(user) &&
          <Link href='/saved'>
            <a className={styles.mobile_nav_saved} onClick={showMenu}>Saved</a>
          </Link>
        }
        {
          (user) ?
            <button className={styles.mobile_nav_btn_logout} onClick={() => { logoutHandler(); showMenu(); }}>
              Logout
            </button>
            :
            <Link href='/login'>
              <a className={styles.mobile_nav_btn_login} onClick={showMenu}>
                Login
              </a>
            </Link>
        }
      </div>
    </nav>
  )
}