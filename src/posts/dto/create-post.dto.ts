import { z } from "zod"

export const createPostDto = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(), 
  user_id: z.coerce.number()
})

export type CreatePostDto = z.infer<typeof createPostDto>
