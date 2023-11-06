import { Select as SelectUI, SelectItem } from '@nextui-org/select'
import { Dispatch, SetStateAction } from 'react'

type Option = 'default' | 'lower' | 'higher'

export default function Select({ setOrderBy }: { setOrderBy: Dispatch<SetStateAction<Option>> }) {
  function handleChange(value: Option) {
    if (value === 'lower') {
      setOrderBy('lower')
    } else if (value === 'higher') {
      setOrderBy('higher')
    } else {
      setOrderBy('default')
    }
  }

  return (
    <SelectUI
      color="primary"
      className="w-[150px]"
      label="Order by"
      size="sm"
      labelPlacement="inside"
      onChange={(e) => handleChange(e.target.value as Option)}>
      <SelectItem key="lower" value="lower">
        Lower Price
      </SelectItem>
      <SelectItem key="higher" value="higher">
        Higher Price
      </SelectItem>
    </SelectUI>
  )
}
