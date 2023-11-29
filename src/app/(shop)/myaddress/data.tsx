import api from '@/lib/data'
import Form from './form'
import { User } from 'lucia'

export default async function Data({ user, callbackUrl }: { user: User; callbackUrl: string }) {
  const address = await api.getUserAddress(user.userId)

  return <Form address={address} user={user} callbackUrl={callbackUrl} />
}
