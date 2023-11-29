const startDate = new Date('2023-01-01')
const endDate = new Date('2023-11-29')
const timeDiff = endDate.getTime() - startDate.getTime()

export function getRandomDate() {
  const randomTime = Math.random() * timeDiff
  const randomDate = new Date(startDate.getTime() + randomTime)
  return randomDate
}
