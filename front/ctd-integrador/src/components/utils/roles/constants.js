export const roles = {
  USER: 1,
  ADMIN: 2
}

export const roleList = () => {
  const list = []

  for (const key in roles) {
    list.push({
      idRol: roles[key],
      rol: key
    })
  }

  return list
}

export const isAdmin = (roles) => {
  if (!roles && !roles.length) return false

  return roles.some((role) => role.rol === 'ADMIN')
}

export const roleById = (idRol) => {
  return Object.keys(roles).find((key) => roles[key] === idRol)
}
