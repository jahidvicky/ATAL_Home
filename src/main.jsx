import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './page/context/AuthContext';
import { RecentlyViewedProvider } from './page/collections/RecentlyViewedContext';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { LoaderProvider, useLoader } from './loader/LoaderContext.jsx';
import Loader from './loader/Loader.jsx';
import { registerLoader } from '../src/API/Api.jsx';

let user = null;
try {
  const stored = localStorage.getItem("user");
  if (stored) {
    if (stored.startsWith("{")) {
      user = JSON.parse(stored);
    } else {
      user = { _id: stored };
    }
  }
} catch (err) {
  console.error("Invalid user data in localStorage", err);
}

// Loader wrapper component
function LoaderWrapper({ children }) {
  const { loading, setLoading } = useLoader();

  React.useEffect(() => {
    registerLoader(setLoading); // connect API with loader
  }, []);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}

function RootApp() {
  return (
    <LoaderProvider>
      <LoaderWrapper>
        <AuthProvider>
          <React.StrictMode>
            <RecentlyViewedProvider user={user}>
              <Provider store={store}>
                <App />
              </Provider>
            </RecentlyViewedProvider>
          </React.StrictMode>
        </AuthProvider>
      </LoaderWrapper>
    </LoaderProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RootApp />);
