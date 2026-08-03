import { StrictMode, Suspense } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { worker } from "@repo/shared/mocks/browsers";
import { router } from "./router";

import "./index.css";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.DEV) {
    try {
      await worker.start({ onUnhandledRequest: "error" });
    } catch (error) {
      console.error("Failed to start MSW:", error);
    }
  } else {
    // In production, let unhandled requests go through
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </StrictMode>,
  );
});
