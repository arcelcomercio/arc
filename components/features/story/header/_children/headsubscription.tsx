import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'story-header-headsubscription',
  text: 'story-header-headsubscription__text',
  icon: 'story-header-headsubscription__icon',
}
const StoryHeaderChildHeadsubscription: FC = ({
  text = 'Exclusivo para suscriptores',
}) => (
  <div className={classes.container}>
    <div className={classes.text}>{text}</div>
    <div className={classes.icon}>
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1502_2)">
          <path
            d="M0.49707 4.56738H4.92529L6.60205 0.5L8.51611 4.56738H13.167L9.11426 7.33594L10.7651 12.5L6.60205 9.15527L2.70215 12.5L4.43018 7.33594L0.49707 4.56738Z"
            fill="#A89242"
            stroke="#A89242"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1502_2">
            <rect width="13.67" height="12.999" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
)

export default StoryHeaderChildHeadsubscription
