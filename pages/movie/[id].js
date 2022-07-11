import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function Movie(props) {
  const { movie = {
    title: '',
    status: '',
    vote_average: 0,
    vote_count: 0,
    runtime: 0,
    release_date: '',
    production_companies: [{ name: '' }],
    poster_path: '',
    overview: '',
    genres: [{ name: '' }]
  } } = props;
  const router = useRouter();
  const { id } = router.query;
  const img_url = 'https://image.tmdb.org/t/p/w500';
  const genre_names = movie.genres.map(a => {
    return a.name || a;
  }).join(', ');
  const movie_names = movie.production_companies.map(a => {
    return a.name || a;
  }).join(', ');

  // useEffect(() => {
  //   async function fetchMovie() {
  //     const fetch_movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US`);
  //     const movie_json = await fetch_movie.json();
  //     setMovie(movie_json);
  //   }

  //   fetchMovie();
  // }, [])

  console.log('fetched detail: ', movie)

  return (
    <>
      <Head>
        <title>{movie.title} | Movie Watchlist</title>
      </Head>

      <main className='container home py-3'>
        <img className='w-full md:w-1/4 inline-block' src={img_url + movie.poster_path} />
        <section className='w-full md:w-3/4 inline-block p-5'>
          <h1 className='text-3xl font-bold text-gray-900 text-center py-3 mb-2 border-y border-stone-400 my-3 p-3'>
            {movie.title}
          </h1>
          <span>
            ★ {movie.vote_average} ({movie.vote_count} votes) <br />
            Status: {movie.status} <br />
            Release Date: {movie.release_date} <br />
            Genres: {genre_names} <br />
            Runtime: {movie.runtime} minutes <br />
            Production Companies: {movie_names} <br />
            Overview: {movie.overview} <br />
          </span>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  // Fetch data from external API
  const fetch_movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=519a976872b6d6cc0f7179573ca7e334&language=en-US`);
  const movie_json = await fetch_movie.json();

  // Pass data to the page via props
  return { props: { movie: movie_json } }
}