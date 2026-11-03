import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationContextProvider>
            <Router>
              <App />
            </Router>
          </NotificationContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
