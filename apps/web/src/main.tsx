import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { worker } from "@repo/shared/mocks/browsers";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.DEV) {
    try {
      await worker.start({ onUnhandledRequest: "bypass" });
    } catch (error) {
      console.error("Failed to start MSW:", error);
    }
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
});
