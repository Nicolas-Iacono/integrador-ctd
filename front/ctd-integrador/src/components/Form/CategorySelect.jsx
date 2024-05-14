
import { Select,  MenuItem, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'

const CategorySelect = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://loyal-art-production.up.railway.app/api/category/all")
        if(!response.ok) {
          throw new Error("Something went wrong")
        }
        const data = await response.json();
        setCategories(data)
      }catch (e) {
        console.error('Error ' , e);
      }finally{
        setLoading(false)
      }
    };
    fetchCategories();
  }, [])
    if (loading) {
      return <p>Loading...</p>;
    }
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
 

  return (
    <Select value={selectedCategory} onChange={handleCategoryChange}>
      {categories.map(category => (
        <Tooltip key={category.id} title={category.description} placement="right">
          <MenuItem key={category.id} value={category.id}>
            {category.categoryName}
          </MenuItem>
        </Tooltip>
        
      ))}
    </Select>
  )
}

export default CategorySelect