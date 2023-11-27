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
