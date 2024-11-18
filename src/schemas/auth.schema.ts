import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'mdp trop court').max(20, 'trop long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.merge(
  z.object({
    name: z.string().min(2, 'prenom trop court').max(20, 'trop long'),
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;

/*

import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@gmail.com$/, 'email non valide'),
  password: z.string().min(6, 'mdp trop court').max(20, 'trop long'),
  firstName: z.string().min(2, 'prenom trop court').max(20, 'trop long'),
  lastName: z.string().min(2, 'nom trop court').max(20, 'trop long'),
});



export const loginSchema = registerSchema
  .omit({ firstName: true, lastName: true })
  .merge(customPassword);

export type LoginFormData = z.infer<typeof loginSchema>;
*/
