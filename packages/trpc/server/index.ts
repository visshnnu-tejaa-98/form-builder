import { router } from "./trpc";

import { chaiCodeRouter, healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";

export const serverRouter = router({
  health: healthRouter,
  chaiCode: chaiCodeRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
