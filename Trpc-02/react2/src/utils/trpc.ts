import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../Trpc-02/week-14/server";
export const trpc = createTRPCReact<AppRouter>();
