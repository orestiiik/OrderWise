import {Box, Container, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";


const HomePage = () => {
    const theme = useContext(ThemeContext)

    return (
        <>
            <Container maxWidth={'xl'}>
                <Grid container py={6}>
                    <Grid xs={12} md={6} maxHeight={{xs: 260, md: 460}} sx={{
                        borderRadius: 1,
                        overflow: 'hidden',
                        '&:hover': {
                            '& img': {
                                transform: 'scale(1.03)',
                                transition: 'transform .6s'
                            }
                        }
                    }} boxShadow={6}>
                        <img src={'/images/bg.jpg'} style={{
                            transition: 'transform 1s',
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}/>
                    </Grid>
                    <Grid xs={12} md={6} pl={{xs: 0, md: 4}} height={'100%'}>
                        <Typography fontSize={{xs: 32, md: 68}} pt={2} fontWeight={500}
                                    fontFamily={theme.secondaryFont}>
                            Ordering to your table made &nbsp;
                            <span className={'secondaryFont'}
                                  style={{color: theme.primaryColor}}>
                             <u>easy</u>
                        </span>
                            <br/>for you
                        </Typography>
                    </Grid>
                </Grid>
                <Box width={'fit-content'} mx={'auto'} pt={4} pb={6}>
                    <Typography pt={2} fontSize={{xs: 28, md: 33}}
                                sx={{borderBottom: `3px ${theme.primaryColor} solid`}}
                                color={theme.backgroundColor}
                                textAlign={'left'} fontFamily={theme.secondaryFont}>
                        Scan the QR code on your table and order
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default HomePage