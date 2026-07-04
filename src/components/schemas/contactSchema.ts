// schemas/contactSchema.ts
import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup
    .string()
    .transform((v) => (v.trim() === '' ? undefined : v))
    .required('Name is required!')
    .min(3, 'Name must be at least 3 characters'),

  email: yup
    .string()
    .transform((v) => (v.trim() === '' ? undefined : v))
    .required('Email is required!')
    .email('Please enter a valid email address'),

  message: yup
    .string()
    .transform((v) => (v.trim() === '' ? undefined : v))
    .required('Message is required!')
    .min(5, 'Message must be at least 5 characters'),
});
