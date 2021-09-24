import * as React from 'react'
import styled from 'styled-components'
import cssVariables from '@/scss/_Variables.module.scss'
// -- styled component props types ----------------------------------------------------------------- //
export interface StyledStepProps {
  isActive?: boolean
}
export interface StyledProgressProps {
  percentage?: number
}
const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
  max-width: 100%;
  width: 350px;
  &::before {
    content: '';
    position: absolute;
    background-color: ${cssVariables.stepLineBorderEmpty};
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: 0;
  }
`
const StepsProgress = styled.div<StyledProgressProps>`
  background-color: ${cssVariables.stepLineBorderFill};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  width: ${({ percentage }) => `${percentage}%`};
  z-index: 0;
  transition: 0.4s ease;
`
const Step = styled.div<StyledStepProps>`
  background-color: #fff;
  color: #999;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${({ isActive }) => (isActive ? cssVariables.stepLineBorderFill : cssVariables.stepLineBorderEmpty)};
  transition: 0.4s ease;
  z-index: 1;
`
export interface IStepsProps {
  data: {
    name: string
  }[]
  currentIndex: number
}

export function Steps({ data, currentIndex }: IStepsProps) {
  function getProgressWidthPercentage(): number {
    let dataLength = data.length
    return (Number(currentIndex) / (dataLength - 1)) * 100
  }
  function renderStep() {
    return data.map((dataItem, index) => {
      return <Step isActive={index <= currentIndex}>{dataItem.name}</Step>
    })
  }
  return (
    <StepsContainer>
      <StepsProgress percentage={getProgressWidthPercentage()} />
      {renderStep()}
    </StepsContainer>
  )
}
