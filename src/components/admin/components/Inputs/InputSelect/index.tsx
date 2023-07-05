import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import React, { useContext, useState } from 'react'
import { StyledSelect } from './styles'

interface InputSelectProps {
  onChange: (item: { value: string; label: string }) => void
  options: {
    value: string
    label: string
  }[]
  defaultValue?: {
    value: string
    label: string
  }
}

export default function InputSelect({
  options,
  defaultValue,
  onChange,
}: InputSelectProps) {
  const [value, setValue] = useState(defaultValue)
  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(false)

  return (
    <StyledSelect
      className=""
      classNamePrefix="select"
      value={value}
      isDisabled={isDisabled}
      isLoading={isLoading}
      // isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      options={options}
      onChange={(item: any) => {
        setValue(item)
        onChange(item)
      }}
    />
  )
}
