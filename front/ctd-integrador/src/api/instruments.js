import { useFetch } from '../helpers/useFetch'
const instruments = [
    {
        "idInstrument": 1,
        "name": "Flauta Larga Marca Faluta",
        "description": "Flauta larga de marca Faluta, ideal para interpretaciones profesionales.",
        "rentalPrice": 1200.34,
        "category": {
            "idCategory": 1,
            "name": "VIENTO",
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
            "name": "VIENTO",
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

export const getInstruments = () => {
    return [instruments]
}

export const getInstrumentById = (id) => {
    return [instruments[0]]
}
    
export const getInstruments1 = () => {
  return useFetch('http://localhost:8080/api/instruments/all', [])
}

export const getInstrumentById1 = (id) => {
  return useFetch(`http://localhost:8080/api/instruments/${id}`, {})
}
