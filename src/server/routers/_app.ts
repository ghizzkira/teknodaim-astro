import { router } from "../init";
import example from "./example";

export const appRouter = router({
  example,
});

export type IAppRouter = typeof appRouter;
