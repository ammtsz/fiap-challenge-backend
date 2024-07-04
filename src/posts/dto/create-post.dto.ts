import { z } from "zod"

export const CreatePostSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  user_id: z.coerce.number()
})

export type CreatePostDto = z.infer<typeof CreatePostSchema>
