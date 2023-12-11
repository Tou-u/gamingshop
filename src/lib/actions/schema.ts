import { z } from 'zod'

export const AuthSchema = z.object({
  username: z.string().min(1, { message: 'A username is required' }).trim().toLowerCase(),
  password: z.string().min(1, { message: 'A password is required' }).trim()
})

export const AddressSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, { message: 'A first name is required' }).trim(),
  last_name: z.string().min(1, { message: 'A last name is required' }).trim(),
  address: z.string().min(1, { message: 'An address is required' }).trim(),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.coerce
    .number({ invalid_type_error: 'Enter a valid phone' })
    .gte(10000000, { message: 'Enter a valid phone' })
    .lte(99999999, { message: 'Enter a valid phone' }),
  info: z.string().trim().optional(),
  user_id: z.string()
})

export const ProductSchema = z.object({
  slug: z
    .string()
    .min(1, { message: 'A slug is required' })
    .regex(new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g), { message: 'Enter a valid slug' })
    .trim(),
  name: z.string().min(1, { message: 'A name is required' }).trim(),
  description: z.string().min(1, { message: 'A description is required' }).trim(),
  price: z.coerce
    .number({ invalid_type_error: 'Enter a valid price' })
    .min(0, { message: 'Enter a valid price' }),
  stock: z.coerce
    .number({ invalid_type_error: 'Enter a valid stock' })
    .min(0, { message: 'Enter a valid stock' }),
  category_id: z.string().min(2, { message: 'A category is required' }),
  brand_id: z.string().min(2, { message: 'A brand is required' }),
  active: z.enum(['true', 'false']).transform((value) => value === 'true'),
  id: z.string().optional()
})
