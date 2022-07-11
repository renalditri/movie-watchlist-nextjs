import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '../components/card'
import useAuth from '../utils/AuthProvider';
import { useRouter } from 'next/router';
import FetchData from '../utils/fetchData';

export default function Saved() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  console.log('auth', user)
  useEffect(() => {
    if (user == null || !user) {
      router.push('/');
      return;
    } else {
      FetchData.getSaved(user)
        .then(res => {
          console.log('Fetching saved movies', res);
          setData(res.movies);
        })
    }
  }, [refresh, user])

  return (
    <>
      <Head>
        <title>Saved Watchlist | Movie Watchlist</title>
      </Head>

      <main className='container home'>
        <h1 className='text-3xl font-bold text-gray-900 text-center py-3 mb-2 border-y border-stone-400 my-3 p-3'>
          Saved Watchlist
        </h1>

        <div className='flex flex-wrap -mx-2'>
          <CardDeck data={data} refresh={refresh} setRefresh={setRefresh} />
        </div>
      </main>
    </>
  )
}

function CardDeck(props) {
  const { data, refresh, setRefresh } = props;
  return data.map(d => {
    return (
      <Card
        key={'card-' + d.id}
        id={d.id}
        title={d.title}
        poster_path={d.poster_path}
        vote_average={d.vote_average}
        vote_count={d.vote_count}
        refresh={refresh}
        setRefresh={setRefresh}
        saved={{ watched: d.watched }}
      />
    )
  })
}