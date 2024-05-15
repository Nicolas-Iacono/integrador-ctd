import { Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getThemes, getThemes1 } from '../../api/instruments'

const ThemeSelect = ({ onChange }) => {
  const [loading, setLoading] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [themes] = getThemes()
  // Usar cuando el front no esté conectado a backend localhost
  // const [themes] = getThemes1()

  useEffect(() => {
    setLoading(false)
  }, [themes])

  useEffect(() => {
    if (typeof onChange === 'function')
      onChange({
        target: { name: 'theme', value: selectedTheme.idTheme }
      })
  }, [selectedTheme])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value)
  }

  return (
    <Select value={selectedTheme} onChange={handleThemeChange}>
      {themes?.map((theme, index) => (
        <MenuItem key={`theme-select-${index}`} value={theme}>
          {theme.themeName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default ThemeSelect
