export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      name: 'admin',
      permissions: ['view dashboard', 'view reports', 'manage users']
    },
    {
      id: 2,
      name: 'manager',
      permissions: ['view dashboard', 'view reports', 'manage users']
    },
    {
      id: 3,
      name: 'user',
      permissions: ['view dashboard']
    }
  ]
})
