// UK Bank Holidays for 2024
const bankHolidays2024 = [
  '2024-01-01', // New Year's Day
  '2024-03-29', // Good Friday
  '2024-04-01', // Easter Monday
  '2024-05-06', // Early May Bank Holiday
  '2024-05-27', // Spring Bank Holiday
  '2024-08-26', // Summer Bank Holiday
  '2024-12-25', // Christmas Day
  '2024-12-26', // Boxing Day
]

export const isWorkshopOpen = (): boolean => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const day = now.getDay()
  const currentTime = hours + minutes / 60

  // Check if it's a bank holiday
  const today = now.toISOString().split('T')[0]
  if (bankHolidays2024.includes(today)) return false

  // Monday to Friday, 8:00 to 17:00 (8am to 5pm)
  if (day >= 1 && day <= 5) {
    return currentTime >= 8 && currentTime < 17
  }

  return false
}

export const getWorkshopStatus = (): {
  isOpen: boolean;
  message: string;
  nextOpenTime?: string;
} => {
  const now = new Date()
  const currentDay = now.getDay()
  const hours = now.getHours()

  const isOpen = isWorkshopOpen()

  if (isOpen) {
    const closeTime = '5:00pm'
    return {
      isOpen: true,
      message: `Open until ${closeTime} today`
    }
  }

  // Calculate next opening time
  if (currentDay === 5 && hours >= 17) {
    // After Friday 5pm
    return {
      isOpen: false,
      message: 'Opens Monday at 8:00am',
      nextOpenTime: '8:00am Monday'
    }
  } else if (currentDay === 6 || currentDay === 0) {
    // Weekend
    return {
      isOpen: false,
      message: 'Opens Monday at 8:00am',
      nextOpenTime: '8:00am Monday'
    }
  } else if (hours < 8) {
    // Before opening
    return {
      isOpen: false,
      message: 'Opens today at 8:00am',
      nextOpenTime: '8:00am today'
    }
  } else {
    // After closing
    return {
      isOpen: false,
      message: 'Opens tomorrow at 8:00am',
      nextOpenTime: '8:00am tomorrow'
    }
  }
} 