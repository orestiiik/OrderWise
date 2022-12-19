import {Box, Container, Divider, Typography} from "@mui/material";
import ThemeContext from "../context/ThemeContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../utils/firebase-config";

const MainLayout = ({children}) => {
    const [checkbox, setCheckbox] = useState(false)
    const [user, loading, error] = useAuthState(auth);

    const theme = useContext(ThemeContext)

    return (
        <>
            <Box sx={{borderBottom: `3px ${theme.primaryColor} solid`, background: theme.backgroundColor}} boxShadow={3}>
                <Container maxWidth={'xl'}>
                    <Box className={'burgerMenu'}>
                        <input type="checkbox" id="main-navigation-toggle" checked={checkbox}
                               onClick={() => setCheckbox(!checkbox)} className="btn btn--close"
                               title="Toggle main navigation"/>
                        <label htmlFor="main-navigation-toggle">
                            <span></span>
                        </label>
                        <nav id="main-navigation" className="nav-main" onClick={() => setCheckbox(false)}>
                            <ul className="menu">
                                <li className="menu__item">
                                    <a className="menu__link" href="">
                                        <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
                                            Home
                                        </Link>
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" href="">
                                        <Link to={'/studios'} style={{textDecoration: 'none', color: 'inherit'}}>
                                            Studios
                                        </Link>
                                    </a>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" href="">
                                        <Link to={'/contact'} style={{textDecoration: 'none', color: 'inherit'}}>
                                            Contact
                                        </Link>
                                    </a>

                                </li>
                                <Divider color={theme.primaryColor} sx={{my: 4}}/>
                                <li className="menu__item">
                                    <a className="menu__link" href="">
                                        <Link to={'/admin'} style={{textDecoration: 'none', color: 'inherit'}}>
                                            Admin
                                        </Link>
                                    </a>

                                </li>
                                {user &&
                                    <li className="menu__item" onClick={() => logout()}>
                                        <a className="menu__link" href="">
                                            Logout
                                        </a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </Box>
                    <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Box display={'flex'} alignItems={'flex-start'}>
                            <Box height={65} width={65} py={1}>
                                <img alt={'Logo'} src={'/images/logo.png'} height={'100%'} width={'100%'}
                                     style={{objectFit: 'contain'}}/>
                            </Box>
                            <Typography fontWeight={600} fontSize={26} ml={2} mt={1}
                                        color={'white'}
                                        fontFamily={"'Inter', sans-serif"}
                                        sx={{
                                            width: 'fit-content'
                                        }}
                            >
                                Order<span style={{color: theme.primaryColor}}>W</span>ise
                            </Typography>
                        </Box>
                    </Link>

                </Container>
            </Box>
            <Box sx={{
                minHeight: '80vh',
                background: 'radial-gradient(circle, rgba(135,5,5,0.0970982142857143) 0%, rgba(220,220,220,0.7805716036414566) 100%)'
            }}>
                {children}
            </Box>
            <Box sx={{borderTop: `4px ${theme.secondaryColor} solid`, background: theme.backgroundColor}} boxShadow={3}>
                <Container maxWidth={'xl'}>
                    <Box display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
                         justifyContent={'space-between'}>
                        <Box py={6} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Box height={85} width={85} py={1}>
                                <img alt={'Logo'} src={'/images/logo.png'} height={'100%'} width={'100%'}
                                     style={{objectFit: 'contain'}}/>
                            </Box>
                            <Typography color={'white'}>
                                Order <span style={{color: theme.primaryColor}}>w</span>ith ease
                            </Typography>
                        </Box>
                        <Typography my={'auto'} color={'white'}>
                            &#169; All rights reserved <a href={'https://tavernapodhradom.sk/'} style={{color: 'white'}}>Taverna pod hradom</a>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>

    )
}

export default MainLayout