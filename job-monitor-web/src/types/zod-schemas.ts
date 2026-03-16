import z from "zod";

const colonSeparatedEmails = z
  .string()
  .transform((val) =>
    val
      .split(";")
      .map((email) => email.trim())
      .filter(Boolean)
  )
  .refine(
    (emails) => emails.every((email) => z.string().email().safeParse(email).success),
    {
      message: "One or more email addresses are invalid",
    }
  )
  .transform((emails) => emails.join("; "));

export const settingsSchema = z.object({
  mailTo: colonSeparatedEmails,
  mailCc: colonSeparatedEmails.optional().or(z.literal("")),
  emailAlerts: z.boolean(),
  allowedJobStartDelay: z
    .number()
    .min(0, "Must be 0 or greater")
    .max(1440, "Max 1440 minutes"),
  errorKeywords: z.string().optional(),
});