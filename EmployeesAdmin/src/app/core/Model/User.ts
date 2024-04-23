// Interfaz de los usuarios o empleados
export interface User{
  name?: string
  lastName?: string
  role?: string
  birthDate?: Date
  user: string
  pass: string
  active?: boolean
}

// Lista inicial de usuarios por defecto
export const UsersList : User[] = [
  {
    name: 'Andres',
    lastName: 'Lozano',
    role: 'sw admin',
    birthDate: new Date(1998,4,28),
    user: 'alozano',
    pass: '1234',
    active: true
  },
  {
    name: 'Karen',
    lastName: 'Lozano',
    role: 'help desk',
    birthDate: new Date(2004,10,1),
    user: 'klozano',
    pass: '1234',
    active: true
  }
]
