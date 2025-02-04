import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import React, { useContext, useState } from 'react'
import { StyledSelect } from './styles'
import { Control, Controller } from 'react-hook-form'
import InputSelect from '../InputSelect'

interface InputSelectControlledProps {
  name: string
  control: any
  isMulti?: boolean
  defaultValue?: {
    label: string
    value: string
  }
  options: {
    value: string
    label: string
  }[]
}

export default function InputSelectControlled({
  name,
  control,
  defaultValue,
  options,
  isMulti = false,
}: InputSelectControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <InputSelect
          options={options}
          defaultValue={[defaultValue ?? { label: '', value: '' }]}
          onChange={(item) => field.onChange(item)}
          isMulti={isMulti}
        />
      )}
    />
  )
}
