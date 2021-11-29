import * as React from 'react'


const classes = {
  text: 'subscribe__text bold',
  text2: 'subscribe__text2 bold',
  button: 'subscribe__button rounded-sm pt-15 pb-15 bold',
  imagebutton:'subscribe__imagebutton',
}

const container:any = {
  default:"",
  diariocorreo:"mt-25 ml-20 mr-20 text-center",
  trome:"mt-25 ml-10 mr-10 text-center",
} 

const titles:any = {
  default:"",
  diariocorreo:"¿Aún no tienes un cuenta?",
  trome:"¿AÚN NO ERES PARTE DEL CLUB?",
}  

const subtitles:any = {
  default:"",
  trome:"!NO ESPERES MÁS!",

}

const buttons:any={
  default:"",
  trome:"",
  diariocorreo:"/signwall/?outputType=subscriptions&banner=1",
}
const images:any={
  default:"",
  trome:"https://cdn.shopify.com/s/files/1/0449/4229/5199/files/registrate_2.png?v=1638160491",
  diariocorreo:"",
}

const textButtons:any={
  default:"",
  trome:"",
  diariocorreo:"Regístrate",
}
interface CardSubscribeAnonymusProps {
  mainColorLink: string,
  arcSite : string
}

const backgroundButton:any={
  default:"",
  trome:"",
  diariocorreo: "#c00000",
}


const CardSubscribeAnonymus: React.FunctionComponent<CardSubscribeAnonymusProps> = ({
  arcSite='default'
}) => (
  <div
    id="anonymus-suscribe"
    className={`${container[arcSite]} hidden` }
    style={{
      minWidth: '200px',
      maxWidth: '250px',
    }}>
    <p className={classes.text}>{titles[arcSite]}</p>
    <p className={classes.text2}>{subtitles[arcSite]}</p>
    <a
      href={buttons[arcSite]}
      className={classes.button}
      style={{
        background: backgroundButton[arcSite],
      }}>
        <img className={classes.imagebutton} src={images[arcSite]} alt="" />
        {textButtons[arcSite]}
    </a>
  </div>
)

export default CardSubscribeAnonymus
