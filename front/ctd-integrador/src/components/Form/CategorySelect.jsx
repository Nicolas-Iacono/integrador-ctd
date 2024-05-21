import { Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCategories, getCategories1 } from '../../api/instruments'

const CategorySelect = ({
  label,
  onChange,
  selectedCategoryId = undefined
}) => {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories] = getCategories()
  // Usar cuando el front no esté conectado a backend localhost
  // const [categories] = getCategories1()

  useEffect(() => {
    if (!categories) return

    setLoading(false)
  }, [categories])

  useEffect(() => {
    if (!selectedCategoryId || !categories) return

    const selectedCategory = categories.find(
      (category) => category.idCategory === selectedCategoryId
    )
    setSelectedCategory(selectedCategory)
  }, [selectedCategoryId, categories])

  useEffect(() => {
    if (loading) return
    if (typeof onChange === 'function')
      onChange({
        target: { name: 'idCategory', value: selectedCategory.idCategory }
      })
  }, [selectedCategory])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      label={label}
      color="secondary"
    >
      {categories?.map((category, index) => (
        <MenuItem key={`category-select-${index}`} value={category}>
          {category.categoryName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CategorySelect
