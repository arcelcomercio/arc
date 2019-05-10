import React, { Fragment, PureComponent } from 'react'

const classes = {
  surveyChoicesItem: 'survey-choices__item',
  surveyRadio: 'survey-question__radio overflow-hidden flex-center-vertical',
  surveyInput: 'survey-question__input hide',
  surveyCheck: 'survey-question__check position-relative',
}
class CardSurveyChildSurveyOptions extends PureComponent {
  render() {
    const { choices, onChange } = this.props
    return (
      <Fragment>
        {choices.map((choice, index) => {
          const idChoice = `radio${index}`
          return (
            <div className={classes.surveyChoicesItem}>
              <label htmlFor={idChoice} className={classes.surveyRadio}>
                <input
                  id={idChoice}
                  className={classes.surveyInput}
                  type="radio"
                  name="survey"
                  value={choice.option}
                  onChange={onChange}
                />
                <span className={classes.surveyCheck} />
                <span>{choice.option}</span>
              </label>
            </div>
          )
        })}
      </Fragment>
    )
  }
}

export default CardSurveyChildSurveyOptions
