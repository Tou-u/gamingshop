import { toast as rtoast } from 'react-hot-toast'

export const toast = {
  success: (message: string) => {
    rtoast.success(message, {
      style: {
        background: '#0070F0',
        color: '#FFF',
        borderRadius: '40px'
      },
      iconTheme: {
        primary: '#FFF',
        secondary: '#0070F0'
      }
    })
  },
  error: (message: string) => {
    rtoast.error(message, {
      style: {
        background: '#F31261',
        color: '#FFF',
        borderRadius: '40px'
      },
      iconTheme: {
        primary: '#FFF',
        secondary: '#F31261'
      }
    })
  }
}

export const LongDate = (date: number | Date | undefined) => {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Santiago'
  }).format(date)
}

export const ShortDate = (date: number | Date | undefined) => {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'short',
    timeZone: 'America/Santiago'
  }).format(date)
}

export const CurrencyToUSD = (price: number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
