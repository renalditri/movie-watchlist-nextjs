import '../styles/globals.css';
import Nav from '../components/nav';
import { AuthProvider } from '../utils/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Nav></Nav>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
// json-server --watch db.json --port 3004