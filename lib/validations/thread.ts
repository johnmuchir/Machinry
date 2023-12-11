import * as z from "zod";

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters'}).max(500, { message: 'Maximum 500 characters' }),
    images:  z.array(z.string()).refine(images => images.length <= 3, {
        message: "You can upload up to 3 images.",}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters'}),
    
})





