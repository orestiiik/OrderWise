import {Box, CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import {auth, logInWithEmailAndPassword} from "../utils/firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import AdminPage from "./AdminPage";
import TextInput from "../components/TextInput";

const LoginPage = () => {
    const theme = useContext(ThemeContext)
    const [user, loading, error] = useAuthState(auth);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", document.querySelector('input[name="name"]').value);
        formData.append("password", document.querySelector('input[name="password"]').value);
        await logInWithEmailAndPassword((formData.get('name') + '@admin.com'), formData.get('password'))
    }

    return (
        <>
            {!user ?
                <Container maxWidth={'xl'}>
                    <Grid container>
                        <Box m={3} boxShadow={3} sx={{
                            p: 3,
                            borderRadius: 1,
                            background: 'rgba(255, 255, 255, 0.60)',
                            backdropFilter: 'blur(8.9px)',
                        }}>
                            <Typography pt={2} variant={'h4'} color={theme.secondaryColor}>
                                Login
                            </Typography>
                            <form onSubmit={handleSubmit} method="POST">
                                <Grid container spacing={3} pb={2}>
                                    <Grid item xs={12}>
                                        <Typography variant={'subtitle1'}>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput name={'Name'} id={'name'}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput name={'Password'} id={'password'}/>
                                    </Grid>
                                </Grid>
                                {loading ?
                                    <CircularProgress sx={{color: theme.secondaryColor}}/>
                                    :
                                    <button
                                        type="submit"
                                        style={{
                                            padding: 0,
                                            background: 'none',
                                            borderColor: 'transparent'
                                        }}
                                    >

                                        <Box sx={{
                                            backgroundColor: theme.secondaryColor,
                                            fontWeight: 500,
                                            fontSize: 16,
                                            px: 3,
                                            borderRadius: 1,
                                            py: 1,
                                            color: 'white',
                                            textTransform: 'uppercase'
                                        }}
                                        >
                                            Login
                                        </Box>
                                    </button>
                                }
                            </form>
                        </Box>
                    </Grid>
                </Container>
                :
                <AdminPage/>
            }
        </>
    )
}

export default LoginPage