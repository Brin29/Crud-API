// No se uso un Hook personalizado porque los hooks internamente utilizan hooks de Reat
export const helpHttp = () => {
  // Internamente sera privado
  const customFetch = (endpoint, options) => {

    // cabezeras por defecto
    const defaultHeader = {
      accept: "application/json",
    }; 

    //AbortController sirve para cuando la peticion no vea un respuesta aborta la peticion
    const controller = new AbortController();
    // Manejador de errores
    options.signal = controller.signal;

    // si trae un metodo o si no trae metodos
    options.method = options.method || "GET";
    // cuando el usuario especifique cabezeras cuando no
    options.headers = options.headers
      ? {...defaultHeader, ...options.headers} 
      : defaultHeader;

    // operador ternario cuando es get no parsea a JavaScript
    options.body = JSON.stringify(options.body) || false;

    // en la linea 22 si body no existe lo hace falso y si es falso lo elimina
    // en fetch no se pueden mandar bodys vacios
    if (!options.body) delete options.body;


    // si 3 segundos no hay respuesta lo aborta
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
    .then(res => res.ok
      ? res.json() 
      : Promise.reject({
        err: true,
        status: res.status || "00",
        statusText: res.statusText || "Ocurrió un error",
      })
    )
    .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options)

  const post = (url, options = {}) => {
    options.method = "POST"
    return customFetch(url, options)
  }

  const put = (url, options = {}) => {
    options.method = "PUT"
    return customFetch(url, options)
  }

  const del = (url, options = {}) => {
    options.method = "DELETE"
    return customFetch(url, options)
  }

  return {
    get, 
    post, 
    put, 
    del
  };
};