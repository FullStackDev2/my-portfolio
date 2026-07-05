// schemas/contactSchema.ts
import * as yup from 'yup';

const trimTransform = (v: string) => v.trim();

export const contactSchema = yup.object({
  name: yup
    .string()
    .transform(trimTransform)
    .required('Name is required!')
    .min(3, 'Name must be at least 3 characters'),

  email: yup
    .string()
    .transform(trimTransform)
    .required('Email is required!')
    .email('Please enter a valid email address'),

  message: yup
    .string()
    .transform(trimTransform)
    .required('Message is required!')
    .min(5, 'Message must be at least 5 characters'),
});
