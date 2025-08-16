import { z } from "zod";

export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please enter your full name (at least 2 characters)" })
    .max(80, { message: "Full name must be less than 80 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),

  services: z
    .array(z.string())
    .min(1, { message: "Select at least one service" }),

  budgetUsd: z
    .union([
      z
        .number({ invalid_type_error: "Budget must be a number" })
        .positive({ message: "Budget must be greater than 0" }),
      z.nan().transform(() => undefined), // allow empty field
    ])
    .optional(),

  projectStartDate: z
    .string()
    .min(1, { message: "Please select a project start date" }),

  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export type FormData = z.infer<typeof formSchema>;
