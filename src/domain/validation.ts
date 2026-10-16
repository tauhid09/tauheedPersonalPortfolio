import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name cannot exceed 80 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(100, 'Email is too long'),
  company: z.string().trim().max(100, 'Company name too long').optional().default(''),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message cannot exceed 3000 characters'),
  // Anti-spam security fields
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
  submitTimeDelta: z.number().min(1500, 'Form submitted too rapidly (bot protection)').optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const ChatMessageSchema = z.object({
  query: z.string().trim().min(1, 'Please enter a message').max(400, 'Query cannot exceed 400 characters'),
});

export type ChatMessageData = z.infer<typeof ChatMessageSchema>;

export const ProjectFilterSchema = z.object({
  tag: z.string().trim().max(50).optional().default('all'),
  search: z.string().trim().max(100).optional().default(''),
});

export type ProjectFilterData = z.infer<typeof ProjectFilterSchema>;
