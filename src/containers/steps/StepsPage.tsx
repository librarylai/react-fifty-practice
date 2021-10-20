import React, { FunctionComponent, useState } from 'react'

import PropTypes from 'prop-types'
import { Steps } from '@/Containers/steps/component/Steps'
import cssVariables from '@/scss/_Variables.module.scss'
import styled from 'styled-components'

const StepPageContainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7fb;
`
const Button = styled.button`
  background-color: ${cssVariables.stepLineBorderFill};
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px 30px;
  margin: 5px;
  font-size: 1rem;
  transition: 0.3s;
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    background-color: ${cssVariables.stepLineBorderEmpty};
    cursor: not-allowed;
  }
`

const STEPS_DATA = [
  {
    name: '1',
  },
  {
    name: '2',
  },
  {
    name: '3',
  },
  {
    name: '4',
  },
]
const StepPage: FunctionComponent<{}> = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  function handlePrevStep(): void {
    if (stepIndex === 0) return
    setStepIndex(stepIndex - 1)
  }
  function handleNextStep(): void {
    if (stepIndex >= STEPS_DATA.length -1) return
    setStepIndex(stepIndex + 1)
  }
  return (
    <StepPageContainers>
      <Steps data={STEPS_DATA} currentIndex={stepIndex} />
      <div>
        <Button onClick={handlePrevStep}>prev</Button>
        <Button onClick={handleNextStep}>next</Button>
      </div>
    </StepPageContainers>
  )
}
StepPage.propTypes = {}

export default StepPage
