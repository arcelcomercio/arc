
//https://api.sandbox.elcomercio.arcpublishing.com/site/v3/navigation/elcomercio
//?hierarchy=navegacion-cabecera-tema-del-dia


const resolve = (query) => {
    const urlEndpoint = `/site/v3/navigation/`; //modificar para 

    //if(query.hasOwnProperty('website')){
    return `${urlEndpoint}${query.website}/?hierarchy=navegacion-cabecera-tema-del-dia`
    //}
    // else{
    //     throw new Error(`NO existe la pagina web que esta buscando!!!!`) 
    // }
}

// recibe la funcion resolve, le envias el squema de grapQL para filtrar
//y defines el tipo valor del parametro que recibe

export default {
    resolve,
    params: {
        website:'text'
    }
}