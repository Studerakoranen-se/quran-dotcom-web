import * as React from 'react'
// import { UseControllerProps } from 'react-hook-form'

// interface RadioOption {
//   label: string
//   value: string
// }

// interface Props extends UseControllerProps<any> {
//   label: string
//   options: RadioOption[]
// }

const RadioAssessment = () => {
  const [value, setValue] = React.useState<boolean[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const updatedValue = [...value]
    updatedValue[i] = e.target.checked
    setValue(updatedValue)
  }

  const unCheck = (i) => {
    const updatedValue = [...value]
    updatedValue[i] = !updatedValue[i]
    setValue(updatedValue)
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((item, i) => (
        <div key={i}>
          <input type="checkbox" checked={value[i]} onChange={(e) => onChange(e, i)} />
          <button type="button" onClick={() => unCheck(i)}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  )
}

export default RadioAssessment
