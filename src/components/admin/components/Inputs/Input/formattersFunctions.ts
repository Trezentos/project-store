import React from 'react'

export default function formatToCurrency(value: string | number) {
  let newValue = String(value)
  newValue = newValue.replace(/\D/g, '')
  newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2')
  newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.')

  return newValue
}

export function realToNumber(realValue: string) {
  let sanitizedValue = realValue.replaceAll('.', '')
  sanitizedValue = sanitizedValue.replaceAll(',', '.')
  return Number(sanitizedValue)
}
