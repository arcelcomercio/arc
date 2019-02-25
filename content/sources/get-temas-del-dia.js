

const resolve = (query) => {
    const urlEndpoint = `/site/v3/navigation/`; //modificar para 

    if(query.hasOwnProperty('website')){
    return `${urlEndpoint}${query.website}/?hierarchy=navegacion-cabecera-tema-del-dia`
    }
    else{
        throw new Error(`NO existe la pagina web que esta buscando!!!!`) 
    }
}


export default {
    resolve,
    params: {
        website:'text'
    }
}