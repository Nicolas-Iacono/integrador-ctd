import { useGetFetch, postFetch, putFetch } from '../helpers/useFetch'

const instruments = [
    {
        "idInstrument": 1,
        "name": "Flauta Larga Marca Faluta",
        "description": "Flauta larga de marca Faluta, ideal para interpretaciones profesionales.",
        "rentalPrice": 1200.34,
        "category": {
            "idCategory": 1,
            "categoryName": "VIENTO",
            "description": " percusión incluye una amplia variedad de instrumentos musicales que se tocan golpeándolos, frotándolos o agitándolos para producir sonidos"
        },
        "imageUrls": [
            {
                "idImage": 1,
                "imageUrl": "https://media.istockphoto.com/id/527682468/es/foto/acanaladura.jpg?s=2048x2048&w=is&k=20&c=Zhid1ccF0m8BU0J2yEYHPyQHgNxCCfDJrR-ZZ0EXy0I=",
                "idInstrument": 1
            },
            {
                "idImage": 2,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            },
            {
                "idImage": 3,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            },
            {
                "idImage": 4,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            }
        ]
    },
    {
        "idInstrument": 1,
        "name": "Flauta Larga Marca Faluta",
        "description": "Flauta larga de marca Faluta, ideal para interpretaciones profesionales.",
        "rentalPrice": 1200.34,
        "category": {
            "idCategory": 1,
            "categoryName": "VIENTO",
            "description": " percusión incluye una amplia variedad de instrumentos musicales que se tocan golpeándolos, frotándolos o agitándolos para producir sonidos"
        },
        "imageUrls": [
            {
                "idImage": 1,
                "imageUrl": "https://media.istockphoto.com/id/527682468/es/foto/acanaladura.jpg?s=2048x2048&w=is&k=20&c=Zhid1ccF0m8BU0J2yEYHPyQHgNxCCfDJrR-ZZ0EXy0I=",
                "idInstrument": 1
            },
            {
                "idImage": 2,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            },
            {
                "idImage": 3,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            },
            {
                "idImage": 4,
                "imageUrl": "https://media.istockphoto.com/id/172142833/es/foto/acanaladura-de-plata-con-ruta.jpg?s=2048x2048&w=is&k=20&c=orlTmP4Gv9Uh6ArcX_Wq3j4nQ8jCOWok7bljRtVC8r8=",
                "idInstrument": 1
            }
        ]
    }
]

/**
 * Acceso a DB en localhost
 */
export const getInstruments = () => {
  return useGetFetch('http://localhost:8080/api/instrument/all', [])
}

export const getInstrumentById = (id) => {
  return useGetFetch(`http://localhost:8080/api/instrument/search/${id}`)
}

export const getCategories = () => {
    return useGetFetch('http://localhost:8080/api/category/all')
}

export const getThemes = () => {
    return useGetFetch('http://localhost:8080/api/theme/all')
}

export const createInstrument = (payload) => {
    return postFetch('http://localhost:8080/api/instrument/create', payload)
}

export const updateInstrument = (payload) => {
    return putFetch('http://localhost:8080/api/instrument/update', payload)
}

/**
 * Acceso a DB en internet
 */

export const getInstruments1 = () => {
    return [instruments]
}

export const getInstrumentById1 = (id) => {
    return [instruments[0]]
}

export const getCategories1 = () => {
    return useGetFetch('https://music-house.up.railway.app/api/category/all')
}

export const getThemes1 = () => {
    return useGetFetch('https://music-house.up.railway.app/api/theme/all')
}

export const crearUsuario = (payload) => {
    return postFetch("https://music-house.up.railway.app/api/auth/create/user",payload)
}