import useAuth from '../utils/AuthProvider';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import Head from 'next/head';

export default function Home() {
  const
    router = useRouter(),
    { user, loginHandler } = useAuth(),
    [loginInfo, setLoginInfo] = useState({ username: '', password: '' }),
    handleChangeLogin = (value, type) => {
      setLoginInfo({
        username: (type == 'username') ? value : loginInfo.username,
        password: (type == 'password') ? value : loginInfo.password
      })
    },
    handleLogin = () => {
      if (loginInfo.username != '' || loginInfo.password != '') {
        loginHandler(loginInfo.username, loginInfo.password)
          .then(res => {
            console.log('Hasil', res);
            if (res) {
              router.push('/');
            }
          })
      } else {
        alert('Mohon isi data anda')
      }
    };

  if (user) { router.push('/') }
  return (
    <>
      <Head>
        <title>Login | Movie Watchlist</title>
      </Head>

      <main className={styles.container_login}>
        <section className={styles.section}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => handleChangeLogin(e.target.value, 'username')}
            type={'text'}
            placeholder="username"
            value={loginInfo.username}
            className={styles.input}
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => handleChangeLogin(e.target.value, 'password')}
            type={'text'}
            placeholder="password"
            value={loginInfo.password}
            className={styles.input}
          />
          <button className={styles.button} onClick={handleLogin}>Login</button>
        </section>
      </main>
    </>
  )
}
