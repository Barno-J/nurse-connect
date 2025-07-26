import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/userContext';
import { ToastProvider } from './contexts/ToastContext';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ToastProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ToastProvider>
      </UserProvider>
    </Provider>
  </StrictMode>
);
