import * as React from 'react'

const classes = {
  text: 'subscribe__text bold',
  text2: 'subscribe__text2 bold',
  button: 'subscribe__button rounded-sm pt-15 pb-15 bold',
  imagebutton: 'subscribe__button pb-20 top-0 right-0 botcribe__imagebutton',
}

const container: any = {
  default: '',
  diariocorreo: 'mt-25 ml-20 mr-20 text-center',
  trome: 'mt-25 ml-10 mr-10 text-center',
}

const titles: any = {
  default: '',
  diariocorreo: '¿Aún no tienes un cuenta?',
  trome: '¿AÚN NO ERES PARTE DEL CLUB?',
}

const subtitles: any = {
  default: '',
  trome: '!NO ESPERES MÁS!',
}

const buttons: any = {
  default: '',
  trome: '/signwall/?outputType=subscriptions&banner=1',
  diariocorreo: '/signwall/?outputType=subscriptions&banner=1',
}

const textButtons: any = {
  default: '',
  trome: 'REGÍSTRATE',
  diariocorreo: 'Regístrate',
}

const backgroundButton: any = {
  default: '',
  trome: '',
  diariocorreo: '#c00000',
}

interface CardSubscribeAnonymusProps {
  id: string
  mainColorLink: string
  arcSite: string
}

const CardSubscribeAnonymus: React.FunctionComponent<CardSubscribeAnonymusProps> = ({
  id,
  arcSite = 'default',
}) => (
  <div
    id={id}
    className={`${container[arcSite]} block`}
    style={{
      minWidth: '200px',
      maxWidth: '250px',
    }}>
    <p className={classes.text}>{titles[arcSite]}</p>
    <p className={classes.text2}>{subtitles[arcSite]}</p>
    <button
      type="button"
      className="subscribe__btn">
      {textButtons[arcSite]}
    </button>
  </div>
)

export default CardSubscribeAnonymus
