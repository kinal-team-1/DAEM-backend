// @ts-check

/**
 * @typedef { import('../i18n-types.js').Translation } Translation
 */

const es = {
  HI: "¡Hola Mundo!",
  GENERAL: {
    ROUTE: {
      OPTIONAL_PAGE_QUERY:
        "Si se proporciona, la consulta de página debe ser un entero mayor que 0",
      OPTIONAL_LIMIT_QUERY:
        "Si se proporciona, la consulta de límite debe ser un entero mayor que 0",
      ENDPOINT_NOT_FOUND: "Punto final no encontrado",
      INVALID_REQUEST: "Solicitud inválida",
    },
  },
  LOCATION: {
    ROUTE: {
      OPTIONAL_LATITUDE:
        "Si se proporciona, la latitud debe ser un flotante entre -90 y 90",
      OPTIONAL_LONGITUDE:
        "Si se proporciona, la longitud debe ser un flotante entre -180 y 180",
      OPTIONAL_RADIUS:
        "Si se proporciona, el radio debe ser un entero mayor que 0 que represente la distancia en kilómetros desde las coordenadas de latitud y longitud proporcionadas",
      LATITUDE_REQUIRED:
        "Se requiere latitud y debe ser un flotante entre -90 y 90",
      LONGITUDE_REQUIRED:
        "Se requiere longitud y debe ser un flotante entre -180 y 180",
      ADDRESS_REQUIRED:
        "Se requiere dirección y debe ser una cadena con una longitud mínima de 3 caracteres",
      CITY_REQUIRED:
        "Se requiere ciudad y debe ser una cadena con una longitud mínima de 3 caracteres",
      COUNTRY_REQUIRED:
        "Se requiere país y debe ser una cadena con una longitud mínima de 3 caracteres",
      INCOMPLETE_COORDINATES:
        "Si se proporciona latitud o longitud, ambas deben ser proporcionadas",
    },
    ERROR: {},
  },
  PUBLIC_CASE: {
    CONTROLLER: {
      GET_FEED_SUCCESS: "Casos públicos obtenidos con éxito",
      CREATED: "Caso público creado con éxito",
      DELETED: "Caso público eliminado con éxito",
      GET_BY_ID: "Caso público obtenido por id con éxito",
    },
    ROUTE: {
      TITLE_REQUIRED:
        "Se requiere título y debe ser una cadena de entre 5 y 100 caracteres",
      DESCRIPTION_REQUIRED:
        "Se requiere descripción y debe ser una cadena con una longitud mínima de 20 caracteres",
      SUBMITTER_REQUIRED:
        "Se requiere remitente y debe ser un ObjectId de MongoDB válido",
      PUBLIC_CASE_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del caso público.",
      OPTIONAL_ATTACHMENT:
        "Si se proporciona, el archivo adjunto debe ser un array de archivos de ruta no vacíos subidos",
    },
    ERROR: {
      NOT_FOUND: "Caso público no encontrado",
      FAILED_UPLOAD_IMAGES:
        "Error al subir imágenes y vincular imágenes al caso, por favor intente nuevamente",
    },
  },
  CONTRIBUTION_CASE: {
    CONTROLLER: {
      GET_CONTRIBUTION_SUCCESS: "Contribución recuperada con éxito",
      DELETED: "Caso de contribución eliminado con éxito",
      CREATED: "Caso de contribución creado con éxito",
    },
    ROUTE: {
      CONTRIBUTION_CASE_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id de la contribución.",
      USER_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del usuario.",
      PUBLIC_CASE_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del caso público.",
    },
    ERROR: {
      NOT_FOUND: "Caso de contribución no encontrado",
      FAILED_UPLOAD_IMAGES:
        "Error al subir imágenes y vincular imágenes al caso, por favor intente nuevamente",
    },
  },
  USER: {
    CONTROLLER: {
      GET_ALL_USERS_SUCCESS: "Todos los usuarios recuperados con éxito",
      GET_USER_SUCCESS: "Usuario recuperado con éxito",
      DELETE_USER_SUCCESS: "Usuario eliminado con éxito",
      UPDATE_USER_SUCCESS: "Usuario actualizado con éxito",
    },
    ROUTE: {
      USER_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del usuario.",
      PASSWORD_REQUIRED: "Se requiere contraseña y debe ser una cadena",
      PHONE_NUMBER_REQUIRED:
        "Se requiere número de teléfono y debe ser una cadena",
    },
    ERROR: {
      NOT_FOUND: "Usuario no encontrado",
      USERNAME_ALREADY_EXISTS:
        "El nombre de usuario ya existe, el nombre de usuario debe ser único",
      EMAIL_ALREADY_EXISTS:
        "El correo electrónico ya existe, el correo electrónico debe ser único",
    },
  },
  AUTH: {
    CONTROLLER: {
      LOGIN_SUCCESS: "Usuario inició sesión con éxito",
      LOGOUT_SUCCESS: "Usuario cerró sesión con éxito",
      REGISTER_SUCCESS: "Usuario registrado con éxito",
      DELETE_USER_SUCCESS: "Usuario eliminado con éxito",
      SUCCESS_TOKEN_VALIDATION: "El token es válido",
    },
    ROUTE: {
      USERNAME_REQUIRED:
        "Se requiere nombre de usuario y debe ser una cadena con una longitud mínima de 3 caracteres",
      EMAIL_REQUIRED:
        "Se requiere correo electrónico y debe ser una dirección de correo electrónico válida",
      USERNAME_OPTIONAL:
        "Si se proporciona, el nombre de usuario debe ser una cadena con una longitud mínima de 3 caracteres",
      EMAIL_OPTIONAL:
        "Si se proporciona, el correo electrónico debe ser una dirección de correo electrónico válida",
      PASSWORD_REQUIRED:
        "Se requiere contraseña y debe ser una cadena con una longitud mínima de 8 caracteres," +
        " debe tener 1 letra minúscula, 1 letra mayúscula y 1 número",
      USER_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del usuario.",
      EITHER_USERNAME_OR_EMAIL_REQUIRED:
        "Se requiere nombre de usuario o correo electrónico, el correo electrónico debe ser una dirección de correo electrónico válida y el nombre de usuario debe ser una cadena de al menos 3 caracteres",
      NAME_REQUIRED:
        "Se requiere nombre y debe ser una cadena con al menos 2 caracteres",
      LASTNAME_REQUIRED:
        "Se requiere apellido y debe ser una cadena con al menos 2 caracteres",
      DPI_REQUIRED: "Se requiere DPI y debe ser una cadena con 13 caracteres",
      PHONE_NUMBER_REQUIRED:
        "Se requiere número de teléfono y debe ser una cadena con al menos 8 caracteres",
    },
    ERROR: {
      NOT_FOUND: "Usuario no encontrado",
      INVALID_CREDENTIALS: "Credenciales inválidas",
    },
  },
  ANONYMOUS_CASE: {
    CONTROLLER: {
      GET_ALL_SUCCESS: "Casos anónimos obtenidos con éxito",
      CREATED: "Caso anónimo creado con éxito",
      DELETED: "Caso anónimo eliminado con éxito",
    },
    ROUTE: {
      DESCRIPTION_REQUIRED:
        "Se requiere descripción y debe ser una cadena con una longitud mínima de 20 caracteres",
      ANONYMOUS_CASE_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del caso anónimo.",
      OPTIONAL_KEY:
        "Si se proporciona, la clave debe ser una cadena con una longitud mínima de 21",
      TITLE_REQUIRED:
        "Se requiere título y debe ser una cadena con una longitud mínima de 3 caracteres",
    },
    ERROR: {
      NOT_FOUND: "Caso anónimo no encontrado",
      FAILED_UPLOAD_IMAGES:
        "Error al subir imágenes y vincular imágenes al caso, por favor intente nuevamente",
    },
  },
  ATTACHMENT: {
    CONTROLLER: {
      SIGNED_URL_CREATED: "URL firmada creada con éxito",
    },
    ROUTE: {
      FILE_REQUIRED: "Se requiere archivo",
      ATTACHMENT_ID_REQUIRED:
        "La URL debe incluir un ObjectId de MongoDB válido que represente el id del archivo adjunto.",
    },
    ERROR: {
      CREATE_UPLOAD_SIGNED_URL: "Error al crear URL firmada de carga",
      CREATE_GET_SIGNED_URL: "Error al crear URL firmada de obtención",
      NOT_FOUND: "Archivo adjunto no encontrado",
      FILEPATH_ALREADY_EXISTS:
        "Un archivo adjunto nombrado {filepath} ya existe, intente renombrar el archivo",
    },
  },
  STALE_CONTENT: {
    CONTROLLER: {
      TEMPORARY_FILE_DELETED: "Archivo temporal eliminado con éxito",
    },
    ROUTE: {
      FILE_PATHS_REQUIRED:
        "Se requieren rutas de archivos y deben ser un array de cadenas no vacías",
      NOT_FOUND:
        "Algunas de las rutas de archivos proporcionadas no se encontraron, por favor verifique {paths:string}",
    },
    ERROR: {
      FAILED_DELETE_ALL_FILES: "Error al eliminar todos los archivos",
      FILEPATH_ALREADY_EXISTS:
        "Contenido obsoleto con esa ruta de archivo ya existe, intente renombrar el archivo, o intente de nuevo en unos minutos",
    },
  },
};

export default es;
