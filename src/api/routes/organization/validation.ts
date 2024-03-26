import { z } from "zod";

const CreateOrganizationInputSchema = z.object({
  name: z
    .string({ required_error: "Organization name is required" })
    .trim()
    .min(3)
    .max(32),
});

export type CreateOrganizationRequestType = z.infer<
  typeof CreateOrganizationInputSchema
>;
export const CreateOrganizationRequestSchema = z.object({
  body: CreateOrganizationInputSchema,
});

const AcceptInviteInputSchema = z.object({
  invitationId: z
    .string({ required_error: "invitationId is required" })
    .uuid("InvitationId must be a valid uuid"),
});

export const AcceptInviteRequestSchema = z.object({
  params: AcceptInviteInputSchema,
});

const OrganizationAccessInputSchema = z.object({
  organizationId: z
    .string({ required_error: "organizationId is required" })
    .uuid("organizationId must be a valid uuid"),
});

export const OrganizationAccessRequestSchema = z.object({
  params: OrganizationAccessInputSchema,
});
