import React from "react"

const Button = props => (
  <button class="btn-submit" onClick={props.handleClick}>{props.text}</button>
)

export default Button
