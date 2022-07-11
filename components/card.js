import styles from './card.module.css';
import useAuth from '../utils/AuthProvider';
import FetchData from '../utils/fetchData';
import Link from 'next/link';

export default function Card(props) {
  // Props
  const {
    id,
    title = 'Doctor Strange in the Multiverse of Madness (1994)',
    poster_path = '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    vote_average = 9.2,
    vote_count = 1800,
    saved = false,
    refresh,
    setRefresh
  } = props;
  // Useauth untuk mengecek user login atau tidak
  const { user } = useAuth();
  // url gambar
  const img_url = 'https://image.tmdb.org/t/p/w500';


  //------- Handler tombol ----------
  // handler tombol add
  const handleAdd = () => {
    if (!user) {
      alert('Mohon login terlebih dahulu');
      return;
    }
    FetchData.addMovie({
      id: id, title: title, poster_path: poster_path, watched: false, vote_average: vote_average, vote_count: vote_count
    }, user)
      .then(res => {
        console.log(res);
        alert('Film telah tersimpan');
      })
  };
  // handler tombol watched
  const handleWatched = () => {
    if (!user) {
      alert('Mohon login terlebih dahulu');
      return;
    }
    FetchData.watchedMovie(id, user)
      .then(res => {
        console.log(res);
        alert('Status film terubah');
        setRefresh(refresh + 1);
      })
  }
  // handler tombol delete
  const handleDelete = () => {
    FetchData.deleteMovie(id, user)
      .then(res => {
        console.log('id film', id);
        alert('Film terhapus');
        setRefresh(refresh + 1);
      })
  }
  //------- Handler tombol ----------


  // Komponen kondisional
  const button_conditional = (saved) ? (
    <>
      <button
        disabled={saved.watched}
        onClick={handleWatched}
        className={(saved.watched) ? styles.btn_watched : styles.btn_watch}
      >
        {(saved.watched) ? 'Watched' : 'Not Watched'}
      </button>
      <button onClick={handleDelete} className={styles.btn_dlt}>Delete</button>
    </>
  ) : (
    <button onClick={handleAdd} className={styles.btn_add}>Add to library</button>
  );

  return (
    <div className={styles.card}>
      <div className={styles.card_wrp}>
        <Link href={'/movie/' + id}>
          <a className={styles.card_img_wrp}>
            <img className={styles.card_img} src={img_url + poster_path} />
          </a>
        </Link>
        <div className={styles.card_body}>
          <div>
            <h2 className={styles.heading}>{title}</h2>
            <p className={styles.vote_count}>★ {vote_average} ({vote_count} votes)</p>
          </div>
          <div>
            {button_conditional}
          </div>
        </div>
      </div>
    </div>
  )
}