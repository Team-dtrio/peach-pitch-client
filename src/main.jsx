import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./styles/GlobalStyle";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
