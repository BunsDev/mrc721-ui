import React from 'react'
import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import Deposit from '../deposit'
import Transaction from '../transaction/Transaction'

const MRC721 = () => {
  return (
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
        <Deposit />
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
        <Transaction />
        <Claim />
      </Wrapper>
    </Container>
  )
}

export default MRC721
