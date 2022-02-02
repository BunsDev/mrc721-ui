import { Flex } from 'rebass'
import styled from 'styled-components'

export const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ background }) => background};
  margin: 0 3px 0 5px;
`
export const WrapperInfo = styled(Flex)`
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '22px !important')};
`
export const WrapTokenAddress = styled.div`
  width: ${({ width }) => width};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CopyBtn = styled.div`
  height: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #d0d0d3;
  border-radius: 4px;
  width: 45px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  font-style: normal;
  font-weight: 500;
  font-size: 7.5px;
  cursor: pointer;
  text-transform: uppercase;
  color: #373749;
  &:hover {
    filter: brightness(0.9);
  }
`
