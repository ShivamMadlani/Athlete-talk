import { AuthContextProvider } from '../authCtx'
import './globals.css'

export default function App({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}
