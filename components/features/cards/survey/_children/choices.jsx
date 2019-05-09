import React, { Fragment, PureComponent } from 'react'

class CardSurveyChildSurveyOptions extends PureComponent {
  sendAnswer = answer => {
    console.log(answer)
  }

  _handleChange = evt => {
    console.log(evt)
  }

  render() {
    const { choices } = this.props
    return (
      <Fragment>
        {choices.map((choice, index) => {
          const idChoice = `radio${index}`
          return (
            <div className="card-survey__question__choices__item">
              <label
                htmlFor={idChoice}
                className="card-survey__question__radio flex-center-vertical">
                <input
                  id={idChoice}
                  className="card-survey__question__input hide"
                  type="radio"
                  name="survey"
                  value={choice.option}
                  onChange={evt => {
                    this._handleChange(evt)
                  }}
                />
                <span className="card-survey__question__check" />
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
