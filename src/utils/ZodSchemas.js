const z = require("zod");

const UserSchema = z.object({
  password: z
    .string({ message: "Password must contain alphanumeric characher(s)" })
    .min(8, { message: "password must contain at least 6 character(s)" })
    .optional(),
  firstName: z
    .string({ message: "First name is required" })
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "First name can only contain letters and spaces",
    })
    .optional(),
  lastName: z
    .string({ message: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Last name can only contain letters and spaces",
    })
    .optional(),
});

const signUpSchema = z.object({
  username: z
    .string({ message: "Username must be valid" })
    .min(6, { message: "Username must contain at least 6 character(s)" }),
  password: z
    .string({ message: "Password must contain alphanumeric characher(s)" })
    .min(8, { message: "password must contain at least 6 character(s)" }),
  firstName: z
    .string({ message: "First name is required" })
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "First name can only contain letters and spaces",
    }),
  lastName: z
    .string({ message: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Last name can only contain letters and spaces",
    }),
});

const signInSchema = z.object({
  username: z
    .string({ message: "Username must be valid" })
    .min(6, { message: "Username must contain at least 6 character(s)" }),
  password: z
    .string({ message: "Password must contain alphanumeric characher(s)" })
    .min(8, { message: "password must contain at least 6 character(s)" }),
});

module.exports = { signUpSchema, signInSchema, UserSchema };
