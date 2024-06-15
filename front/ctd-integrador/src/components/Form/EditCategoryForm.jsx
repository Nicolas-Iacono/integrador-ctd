import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { CategoryForm } from './CategoryForm'
import { getCategoryById, updateCategory } from '../../api/categories'
import { MessageDialog } from '../common/MessageDialog'

export const EditCategoryForm = ({ id, onSaved }) => {
  const [category, setCategory] = useState()
  const [initialFormData, setInitialFormData] = useState()
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState()

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = () => {
    setLoading(true)
    getCategoryById(id)
      .then(([category, _]) => {
        setCategory(category)
      })
      .catch(([_, code]) => {
        setCategory({})
      })
  }

  useEffect(() => {
    if (!(category && category.data?.idCategory)) return

    const data = {
      idCategory: category.data.idCategory,
      categoryName: category.data.categoryName,
      description: category.data.description
    }
    setInitialFormData(data)
    setLoading(false)
  }, [category])

  const onClose = () => {
    setShowMessage(false)
    if (typeof onSaved === 'function') onSaved()
  }

  const onSubmit = (formData) => {
    if (!formData) return

    updateCategory(formData)
      .then(() => {
        setMessage('Categoría guardada exitosamente')
      })
      .catch(() => {
        setMessage('No se pudo guardar categoría')
      })
      .finally(() => {
        setShowMessage(true)
      })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {!loading && (
        <CategoryForm initialFormData={initialFormData} onSubmit={onSubmit} />
      )}
      <MessageDialog
        title="Editar Categoría"
        message={message}
        isOpen={showMessage}
        buttonText="Ok"
        onClose={onClose}
        onButtonPressed={onClose}
      />
    </Box>
  )
}
