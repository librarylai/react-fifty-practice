import React, { FunctionComponent, useState } from 'react'

import Panel from '@/Containers/expandingCards/component/Panel'
import styled from 'styled-components'

// import Panel from 'Containers/ExpandingCards/Component/Panel'



const ExpandingCardsPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const PANEL_LIST: {
  name: string
  url: string
}[] = [
  {
    name: 'First Card',
    url: 'https://picsum.photos/id/1/1000/1000',
  },
  {
    name: 'Second Card',
    url: 'https://picsum.photos/id/10/1000/1000',
  },
  {
    name: 'Third Card',
    url: 'https://picsum.photos/id/100/1000/1000',
  },
  {
    name: 'Four Card',
    url: 'https://picsum.photos/id/1000/1000/1000',
  },
  {
    name: 'Five Card',
    url: 'https://picsum.photos/id/1001/1000/1000',
  },
]
const ExpandingCards: FunctionComponent<{}> = () => {
  const [openIndex, setOpenIndex] = useState<number>(0)
  function handlePanelTiggle(index: number): void {
    setOpenIndex(index)
  }
  return (
    <ExpandingCardsPageContainer>
      <Panel openIndex={openIndex} data={PANEL_LIST} handlePanelClick={handlePanelTiggle} />
    </ExpandingCardsPageContainer>
  )
}

ExpandingCards.propTypes = {}

export default ExpandingCards
