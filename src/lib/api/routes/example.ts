import { protectedProcedure, publicProcedure, router } from "@/lib/api/init"

export default router({
  public: publicProcedure.query(() => {
    return "Hello from server!"
  }),
  private: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user?.name}`
  }),
})
