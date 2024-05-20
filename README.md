# integrador-ctd
app de reserva de instrumentos musicales
# DTOs de Entrada

## UserDtoEntrance

Esta clase representa los datos de entrada para un usuario.

### Atributos:

- **name**: String
  - Requerido: Sí
  - Longitud: entre 2 y 50 caracteres
  - Restricciones: solo letras, acentos y espacios

- **lastName**: String
  - Requerido: Sí
  - Longitud: entre 2 y 50 caracteres
  - Restricciones: solo letras, acentos y espacios

- **email**: String
  - Requerido: Sí
  - Formato: email válido

- **password**: String
  - Requerido: Sí
  - Longitud mínima: 6 caracteres

- **addresses**: List<AddressDtoEntrance>
  - Requerido: Sí
  - Descripción: lista de direcciones asociadas al usuario

- **phones**: List<PhoneDtoEntrance>
  - Requerido: Sí
  - Descripción: lista de números de teléfono asociados al usuario

## UserAdminDtoEntrance

Esta clase representa los datos de entrada para un usuario administrador.

### Atributos:

- **name**: String
  - Requerido: Sí
  - Longitud: entre 2 y 50 caracteres

- **lastName**: String
  - Requerido: Sí
  - Longitud: entre 2 y 50 caracteres

- **email**: String
  - Requerido: Sí
  - Formato: email válido

- **password**: String
  - Requerido: Sí
  - Longitud mínima: 6 caracteres

## AddressDtoEntrance

Esta clase representa los datos de entrada para una dirección.

### Atributos:

- **street**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **number**: Long
  - Requerido: Sí
  - Restricciones: número positivo o cero

- **city**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **state**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **country**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

## AddressAddDtoEntrance

Esta clase representa los datos de entrada para agregar una dirección a un usuario.

### Atributos:

- **idUser**: Long
  - Requerido: Sí
  - Descripción: ID del usuario al que se agregará la dirección

- **street**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **number**: Long
  - Requerido: Sí
  - Restricciones: número positivo o cero

- **city**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **state**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

- **country**: String
  - Requerido: Sí
  - Longitud: entre 2 y 100 caracteres
  - Restricciones: solo letras, acentos y espacios

## PhoneDtoEntrance

Esta clase representa los datos de entrada para un número de teléfono.

### Atributos:

- **phoneNumber**: String
  - Requerido: Sí
  - Formato: número de teléfono válido

## PhoneAddDtoEntrance

Esta clase representa los datos de entrada para agregar un número de teléfono a un usuario.

### Atributos:

- **idUser**: Long
  - Requerido: Sí
  - Descripción: ID del usuario al que se agregará el número de teléfono

- **phoneNumber**: String
  - Requerido: Sí
  - Formato: número de teléfono válido
