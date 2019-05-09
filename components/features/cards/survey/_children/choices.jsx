import React, { Fragment, PureComponent } from 'react'

class CardSurveyChildSurveyOptions extends PureComponent {
  sendAnswer = answer => {
    console.log(answer)
  }

  _handleChange = evt => {
    console.log(evt)
  }

  render() {
    const { listChoices } = this.props
    return (
      <Fragment>
        {listChoices.map((choice, index) => {
          const idChoice = `radio${index}`
          return (
            <div className="card-survey__question-choices-item">
              <label
                htmlFor={idChoice}
                className="card-survey__question-radio flex-center-vertical">
                <input
                  id={idChoice}
                  className="card-survey__question-input hide"
                  type="radio"
                  name="survey"
                  value={choice.option}
                  onChange={evt => {
                    this._handleChange(evt)
                  }}
                />
                <span className="card-survey__question-check" />
                <span className="card-survey__question-text-option">
                  {choice.option}
                </span>
              </label>
            </div>
          )
        })}
      </Fragment>
    )
  }
}

export default CardSurveyChildSurveyOptions
