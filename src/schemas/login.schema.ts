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

const customPassword = z.object({
  password: z
    .string()
    .min(6, 'mdp trop court')
    .max(20, 'trop long')
    .regex(/[A-Z]/, 'doit contenir une majuscule')
    .regex(/[0-9]/, 'doit contenir un chiffre')
    .regex(/[a-z]/, 'doit contenir une minuscule')
    .regex(/[^A-Za-z0-9]/, 'doit contenir un caractère spécial'),
});

export const loginSchema = registerSchema
  .omit({ firstName: true, lastName: true })
  .merge(customPassword);

export type LoginFormData = z.infer<typeof loginSchema>;
