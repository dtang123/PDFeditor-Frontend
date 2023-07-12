import styled from 'styled-components'

export const Page = styled.div `
  position: relative;
  min-height: 100vh;
`

export const NavigationContainer = styled.div `
  height: 100px;
  width: 100%;
  diplay: flex;
  background-color: #white;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
  border-radius: 5px;
  position: sticky;
  top: 0;
  z-index: 3;
  &:hover {
    height: scale(2);
  }
`
export const LeftContainer = styled.div `
  float: left;
  padding: 15px;
`
export const RightContainer = styled.div `
  float: right;
  margin: 0 25px;
  padding: 10px;
  justify-content: flex-end;
`

export const AppName = styled.h1`
  padding: 0 25px;
`
export const User = styled.img`
  border-radius: 50%;
  max-width: 70px;
  height: auto;
  padding: 15px;
`