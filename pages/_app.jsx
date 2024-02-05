import React from 'react';
import '../src/globals.css';
import { wrapper } from '@/store/store';
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps}) {
    return (
        <div>
            <Component {...pageProps} />
            <Toaster />
        </div>
    );
}

export default wrapper.withRedux(MyApp);