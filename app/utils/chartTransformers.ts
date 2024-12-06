export const transformServiceData = (data: Record<string, number> = {}) => {
  return Object.entries(data).map(([name, value]) => ({
    name: name.replace(/([A-Z])/g, ' $1').trim(), // Convert camelCase to spaces
    value
  }))
}

export const transformPreferenceData = (data: { mobile: number; workshop: number } = { mobile: 0, workshop: 0 }) => {
  return [
    { name: 'Mobile Service', value: data.mobile },
    { name: 'Workshop Service', value: data.workshop }
  ]
}

export const transformCustomerData = (data: { totalCustomers: number; returningCustomers: number } = { totalCustomers: 0, returningCustomers: 0 }) => {
  const newCustomers = data.totalCustomers - data.returningCustomers
  return [
    { name: 'New Customers', value: newCustomers },
    { name: 'Returning Customers', value: data.returningCustomers }
  ]
} 