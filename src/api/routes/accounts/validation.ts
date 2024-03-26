import { z } from "zod";

const UserCredentialsSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3)
    .max(32),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password too long"),
});

const CreateNewUserInputSchema = UserCredentialsSchema.extend({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email address"),
});

// extract the inferred type
export type CreateNewUserInput = z.infer<typeof CreateNewUserInputSchema>;
export type UserLoginCredentialsInput = z.infer<typeof UserCredentialsSchema>;

export const CreateNewUserInputRequestSchema = z.object({
  body: CreateNewUserInputSchema,
});

export const UserLoginCredentialsRequestSchema = z.object({
  body: UserCredentialsSchema,
});
