import { Outlet } from 'react-router-dom'
import { Page, NavigationContainer, AppName, User, LeftContainer, RightContainer } from './navigation.styles'

const SignInNavigation = () => {
    return (
        <Page>
            <NavigationContainer>
                <LeftContainer>
                    <AppName>PDF Master</AppName>
                </LeftContainer>
                <RightContainer>
                    <User src="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"></User>
                </RightContainer>
            </NavigationContainer>
            <Outlet></Outlet>
        </Page>
    )
}

export default SignInNavigation