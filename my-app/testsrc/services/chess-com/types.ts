import { z } from "zod";
import * as Schemas from "./schemas";

export type RawProfileResponse = z.infer<typeof Schemas.RawProfileSchema>;
export type RawArchivesResponse = z.infer<typeof Schemas.RawArchivesSchema>;
export type RawMonthlyGamesResponse = z.infer<typeof Schemas.RawMonthlyGamesSchema>;