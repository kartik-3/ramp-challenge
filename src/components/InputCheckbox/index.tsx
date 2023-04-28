import classNames from "classnames"
import { useRef } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  // console.log(checked, disabled)
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)
  // console.log(current)
  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        // onClick={() => {
        //   console.log(checked)
        // }}
        onChange={() => { 
          // console.log(checked)
          // checked = !checked
          return onChange(checked)}}
      />
    </div>
  )
}
