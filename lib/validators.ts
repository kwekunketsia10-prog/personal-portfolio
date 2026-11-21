import { z } from "zod";

const email = z
  .string()
  .trim()
  .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: "Enter a valid email address.",
  });

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email,
  businessName: z.string().trim().max(120).optional().default(""),
  websiteType: z.string().trim().min(1, "Choose the type of website you need."),
  budget: z.string().trim().max(80).optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more about the project, at least a sentence or two.")
    .max(4000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
