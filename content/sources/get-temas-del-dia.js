
const resolve = (query) => {
    const urlEndpoint = `/site/v3/navigation/`; //modificar para 

    // si la propiedad website existe entonces agregasela
    if(query.hasOwnProperty('website')){
        return `${urlEndpoint}${query.website}?hierarchy=navegacion-cabecera-tema-del-dia`
    } // en caso contrario manda un mensaje de error!!!
    else{
        throw new Error(`NO existe la pagina web que esta buscando!!!!`) 
    }
}

// recibe la funcion resolve, le envias el squema de grapQL para filtrar
//y defines el tipo valor del parametro que recibe

export default {
    resolve,
    params: {
        website:'text'
    }
}