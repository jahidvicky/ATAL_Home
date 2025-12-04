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

// const paypalClientId = "AR8OuXZAEXMfWN7TbOkPki6I-FWWKp3NBNR3nyy75Qyzpa6msHKMg--clBZ6lnsVJD0ZhyCyAx8j-bbq";
// const initialOptions = {
//   "client-id": paypalClientId,
//   currency: "USD",
//   intent: "capture",
// };

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
            {/* <PayPalScriptProvider options={initialOptions}> */}
            <RecentlyViewedProvider user={user}>
              <Provider store={store}>
                <App />
              </Provider>
            </RecentlyViewedProvider>
            {/* </PayPalScriptProvider> */}
          </React.StrictMode>
        </AuthProvider>
      </LoaderWrapper>
    </LoaderProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RootApp />);
