export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@saas.com',
      roles: ['admin'],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Manager User',
      email: 'manager@saas.com',
      roles: ['manager'],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'User 3',
      email: 'user@saas.com',
      roles: ['user'],
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Manager User',
      email: 'manager@saas.com',
      roles: ['manager'],
      created_at: new Date().toISOString()
    },
  ]
})
