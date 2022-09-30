import { useState } from 'react'



export const useFieldValue = (parentValue) => {
  const [value, setValue] = useState(parentValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onSubmit = ()=>{
    setValue('')
  }

  return {
    value,
    onChange,
    onSubmit
  }
}
