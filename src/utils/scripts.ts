export const currencyToUSD = (price: number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
