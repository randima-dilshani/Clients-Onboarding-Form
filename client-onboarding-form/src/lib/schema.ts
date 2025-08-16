import { z } from "zod";

const nameRegex = /^[A-Za-z\s'\-]{2,80}$/;

export const formSchema = z.object({
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters")
    .regex(nameRegex, "Only letters, spaces, ' and - allowed"),
  email: z.string().email("Invalid email"),
  companyName: z.string().min(2).max(100),
  services: z.array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "Select at least one service"),
  budgetUsd: z.number().int().min(100).max(1_000_000).optional(),
  projectStartDate: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().toDateString()),
    "Start date must be today or later"
  ),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms" }),
  }),
});

export type FormData = z.infer<typeof formSchema>;
