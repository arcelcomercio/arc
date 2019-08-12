
import React,{Component} from 'react';
import consumer from 'fusion:consumer';
import Wizard from 'react-step-wizard'
import * as S from './styled';
import Loading from '../_children/loading'
import FormData from './_children/formData'
import FormClose from './_children/formClose'

@consumer
class ContactForm extends Component{
  
  constructor(props){
    super(props);
    this.memo = {};
    this.state = {
      data: {},
      profile: '',
      loading: false
    }
  }
 
  onBeforeNextStepHandler = (response, { nextStep }) => {
    Object.assign(this.memo, response)
    nextStep()
  }

  render(){
    
    const {loading,data,profile} = this.state
    const {summary={}} = data

    return(
      <S.FormContactUs>
        <Loading fullscreen spinning={loading}/>
        <S.FormPicture>
          <S.FormImg src="./imagen/working.jpg" alt=""/>
        </S.FormPicture>
        <Wizard
          transitions={{
            enterRight: 'enterRight',
            exitLeft: 'exitLeft'
          }}
          isLazyMount
        >
            <FormData
              memo = {this.memo}
              profile = {profile}
              summary = {summary}
              onBeforeNextStep = {this.onBeforeNextStepHandler}
            />

            <FormClose
              memo = {this.memo}
              profile = {profile}
              summary = {summary}
              onBeforeNextStep = {this.onBeforeNextStepHandler}
            />
        </Wizard>
      </S.FormContactUs>
    )
  }

} 

ContactForm.label="PayWall- Formulario Contacto"


export default ContactForm