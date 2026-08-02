import { setupServer } from "msw/node";
import handlers from "./handler";

// Create server with all handlers pre-configured (for Node.js/tests)
export const server = setupServer(...handlers);
