import styled from 'styled-components'
import { NavigationContainer } from '../navbar/signInNav/navigation.styles'


export const ToolBar = styled(NavigationContainer) `
    min-width: 100%;
    min-height: 25%;
    background-color: #c3d9de;
    display: flex;
    margin-bottom: 0;
`

export const EditorContainer = styled.div `
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: #f4f8f9;
    padding: 2% 0;
`

export const PageContainer = styled.div `
    padding: 2% 0;
`

export const PageNumber = styled.div `
    justify-content: center;
    display: flex;
    align-items: center;
    padding-top: 1%;
`

export const DocName = styled.input `
    background: #dbe8eb;
    border-radius: 2px;
    border: 2px dotted;
`