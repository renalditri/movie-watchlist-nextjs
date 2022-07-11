import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '../components/card'
import { useRouter } from 'next/router';

export default function Search() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { s } = router.query;
  console.log('router', router.query);
  useEffect(() => {
    async function fetchSearch() {
      const fetch_search = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US&page=1&include_adult=true&query=${s}`);
      const search_json = await fetch_search.json();
      console.log(search_json)
      setData(search_json.results)
    }

    fetchSearch();
  }, [s])

  return (
    <>
      <Head>
        <title>Search Movie | Movie Watchlist</title>
      </Head>

      <main className='container home'>
        <h1 className='text-3xl font-bold text-gray-900 text-center py-3 mb-2 border-y border-stone-400 my-3 p-3'>
          Search Movie {s}
        </h1>

        <div className='flex flex-wrap -mx-2'>
          <CardDeck data={data} />
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
      />
    )
  })
}