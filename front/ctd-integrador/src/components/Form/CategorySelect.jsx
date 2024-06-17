import { Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCategories } from '../../api/categories'
import { Loader } from '../common/loader/Loader'

const CategorySelect = ({
  label,
  onChange,
  selectedCategoryId = undefined
}) => {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState()

  useEffect(() => {
    getAllGategories()
  }, [])

  const getAllGategories = () => {
    setLoading(true)
    getCategories()
      .then(([categories, _]) => {
        setCategories(categories)
      })
      .catch(([_, code]) => {
        setCategories([])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!selectedCategoryId || !categories) return

    const selectedCategory = categories.data.find(
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
    return <Loader fullSize={false} />
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
      {!loading &&
        categories?.data?.map((category, index) => (
          <MenuItem key={`category-select-${index}`} value={category}>
            {category.categoryName}
          </MenuItem>
        ))}
    </Select>
  )
}

export default CategorySelect
