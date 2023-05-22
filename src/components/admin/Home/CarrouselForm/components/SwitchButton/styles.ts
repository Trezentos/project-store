import styled from 'styled-components'
import { useState } from 'react'

// Styled Switch Container
export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
`

// Styled Switch Input
export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

// Styled Slider
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  background-color: black;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`

// Styled switch input checked
export const SwitchInputChecked = styled(SwitchInput)`
  &:checked + ${Slider} {
    background-color: #2196f3;
  }

  &:checked + ${Slider}:before {
    transform: translateX(13px);
  }
`
