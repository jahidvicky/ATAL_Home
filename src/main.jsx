import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './page/context/AuthContext';
import { RecentlyViewedProvider } from './page/collections/RecentlyViewedContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

let user = null;
try {
  const stored = localStorage.getItem("user");
  if (stored) {
    if (stored.startsWith("{")) {
      user = JSON.parse(stored);   // JSON object
    } else {
      user = { _id: stored };      // plain string → wrap into object
    }
  }
} catch (err) {
  console.error("Invalid user data in localStorage", err);
}


const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";
const initialOptions = {
  "client-id": paypalClientId,
  currency: "USD",
  intent: "capture",
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
     <PayPalScriptProvider options={initialOptions}>
      <RecentlyViewedProvider user={user}>
       <Provider store={store}>
        <App />
      </Provider>
    </RecentlyViewedProvider>
     </PayPalScriptProvider>
    </React.StrictMode>
  </AuthProvider>
);
