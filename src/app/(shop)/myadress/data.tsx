import api from '@/lib/data'
import Form from './form'
import { User } from 'lucia'

export default async function Data({ user, callbackUrl }: { user: User; callbackUrl: string }) {
  const adress = await api.getUserAdress(user.userId)

  return <Form adress={adress} user={user} callbackUrl={callbackUrl} />
}
