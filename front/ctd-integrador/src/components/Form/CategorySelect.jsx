import { Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCategories, getCategories1 } from '../../api/instruments'

const CategorySelect = ({ onChange }) => {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories] = getCategories()
  // Usar cuando el front no esté conectado a backend localhost
  // const [categories] = getCategories1()

  useEffect(() => {
    setLoading(false)
  }, [categories])

  useEffect(() => {
    if (typeof onChange === 'function')
      onChange({
        target: { name: 'category', value: selectedCategory.idCategory }
      })
  }, [selectedCategory])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <Select value={selectedCategory} onChange={handleCategoryChange}>
      {categories?.map((category, index) => (
        <MenuItem key={`category-select-${index}`} value={category}>
          {category.categoryName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CategorySelect
