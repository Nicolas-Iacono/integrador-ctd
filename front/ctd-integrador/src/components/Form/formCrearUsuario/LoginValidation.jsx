import * as Yup from "yup"

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email incorrencto').required('Email Valido'),
  password: Yup.string().min(6, 'El Password debe tener almenos 6 caracteres').required('Password es requerido'),
});

export default loginValidationSchema