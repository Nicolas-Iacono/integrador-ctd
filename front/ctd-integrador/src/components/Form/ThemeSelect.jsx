
import { Select,  MenuItem, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ThemeSelect = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch("https://loyal-art-production.up.railway.app/api/theme/all")
        if(!response.ok) {
          throw new Error("Something went wrong")
        }
        const data = await response.json();
        setThemes(data)
      }catch (e) {
        console.error('Error ' , e);
      }finally{
        setLoading(false)
      }
    };
    fetchThemes();
  }, [])
    if (loading) {
      return <p>Loading...</p>;
    }
console.log(themes)
  return (
    <Select>
      {themes.map(theme => (
        <Tooltip key={theme.idTheme} title={theme.description} placement="right">
          <MenuItem key={theme.idTheme} value={theme.idTheme}>
            {theme.themeName}
          </MenuItem>
        </Tooltip>
        
      ))}
    </Select>
  )
}

export default ThemeSelect