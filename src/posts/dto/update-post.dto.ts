import { z } from "zod"

export const updatePostDto = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  user_id: z.coerce.number().optional()
})

export type UpdatePostDto = z.infer<typeof updatePostDto>
