import { useRouter } from 'next/router';
import Card from '../../components/card';
import styles from './list.module.css';
import Head from 'next/head';

export default function Movie({ movieList }) {
  const router = useRouter();
  const { list } = router.query;
  const heading = {
    popular: 'Popular Movies',
    playing: 'Now Playing',
    upcoming: 'Upcoming',
  }
  return (
    <>
      <Head>
        <title>{heading[list]} | Movie Watchlist</title>
      </Head>

      <main className='container home'>
        <section className={styles.section}>
          <h1 className={styles.heading}>{heading[list]}</h1>
          <div className='flex flex-wrap -mx-2'>
            <CardDeck data={movieList.results} />
          </div>
        </section>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        list: 'popular'
      }
    },
    {
      params: {
        list: 'playing'
      }
    },
    {
      params: {
        list: 'upcoming'
      }
    },
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fetch_link = {
    popular: 'https://api.themoviedb.org/3/movie/popular?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US&page=1',
    playing: 'https://api.themoviedb.org/3/movie/now_playing?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US&page=1',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US&page=1',
  }
  const movieFetch = await fetch(fetch_link[params.list]);
  const movieList = await movieFetch.json();
  return {
    props: {
      movieList,
    },
    revalidate: 10,
  };
}

function CardDeck({ data }) {
  return data.map(d => {
    return (
      <Card key={'card-' + d.id} id={d.id} title={d.title} poster_path={d.poster_path} vote_average={d.vote_average} vote_count={d.vote_count} />
    )
  })
}