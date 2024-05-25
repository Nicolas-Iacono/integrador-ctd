import { Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getThemes } from '../../api/instruments'

const ThemeSelect = ({ label, onChange, selectedThemeId = undefined }) => {
  const [loading, setLoading] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [themes] = getThemes()

  useEffect(() => {
    if (!themes) return

    setLoading(false)
  }, [themes])

  useEffect(() => {
    if (!selectedThemeId || !themes) return

    const selectedTheme = themes.find(
      (theme) => theme.idTheme === selectedThemeId
    )
    setSelectedTheme(selectedTheme)
  }, [selectedThemeId, themes])

  useEffect(() => {
    if (loading) return
    if (typeof onChange === 'function')
      onChange({
        target: { name: 'idTheme', value: selectedTheme.idTheme }
      })
  }, [selectedTheme])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value)
  }

  return (
    <Select
      value={selectedTheme}
      onChange={handleThemeChange}
      label={label}
      color="secondary"
    >
      {themes?.map((theme, index) => (
        <MenuItem key={`theme-select-${index}`} value={theme}>
          {theme.themeName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default ThemeSelect
