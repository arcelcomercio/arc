
import React, {PureComponent} from 'react'
import Consumer from 'fusion:consumer'


const classes = {
    errorContainer:'error-container',
    errorIconCaretDown: 'error-iconcaretdown',
    errorTitle:'error-title',
    errorContent:'error-content',
    errorBackToHome:'error-backtohome',
    errorBackToHomeLink:'error-backtohomelink'
}
@Consumer
class Error404 extends PureComponent{
    render(){
        return(
            <div className="errorContainer">
                <i className="errorIconCaretDown"/>
                <h3 className="errorTitle">¡Oops!... Página no encontrada</h3>
                <p className="errorContent">La página que buscas no existe, probablemente el enlace que usaste es erróneo, intenta ubicarlo en la página principal o usa el buscador para encontrar la noticia que buscas:</p>
                <form>Form aqui</form>
                <p className="errorBackToHome">
                    <a href="#"className="errorBackToHomeLink">
                        Volver a la página principal
                    </a>
                </p>
            </div>
        )
    }
}

export default Error404