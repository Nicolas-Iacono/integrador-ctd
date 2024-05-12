import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Container } from '@mui/material'
import { HeaderWrapper } from '../Layout/HeaderWrapper'
import { MainWrapper } from './MainWrapper'
import useMediaQuery from '@mui/material/useMediaQuery'

import '../styles/instrumentGaller.styles.css'

const srcset = (image, size, rows = 1, cols = 1) => {
  const urlHasParams = /\?/.test(image)
  const paramsJoin = urlHasParams ? '&' : '?'
  return {
    src: `${image}${paramsJoin}w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}${paramsJoin}w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

export const InstrumentGallery = ({ itemData }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <Container>
      <HeaderWrapper />
      <MainWrapper>
        <ImageList
          sx={{ width: { sx: '100%', md: '70%' }, height: 500 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {itemData?.map((item, index) => (
            <ImageListItem
              key={`gallery-image-${index}`}
              cols={matches ? (index === 0 ? 2 : 1) : 4}
              rows={matches ? (index === 0 ? 4 : 2) : 4}
            >
              <img
                className="instrument-gallery-image"
                {...srcset(item.imageUrl, 121, item.rows, item.cols)}
                alt=""
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </MainWrapper>
    </Container>
  )
}
