import {Box, CircularProgress, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase-config";
import TextInput from "../components/TextInput";
import {Link} from "react-router-dom";
import {IconListDetails, IconPencil} from "@tabler/icons";

const CreateMenuItem = () => {
    const theme = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    async function handleSubmit(e) {
        setLoading((current) => !current);
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", document.querySelector('input[name="name"]').value);
        formData.append("weight", document.querySelector('input[name="weight"]').value);
        formData.append("price", document.querySelector('input[name="price"]').value);
        formData.append("category", document.querySelector('input[name="category"]').value);
        let allergens = document.querySelector('input[name="allergens"]').value.split(',')
        addDoc(collection(db, "menu"),
            {
                name: formData.get('name'),
                weight: formData.get('weight'),
                price: formData.get('price'),
                category: formData.get('category'),
                allergens: allergens
            }
        ).then(() => {
            setTimeout(() => {
                setLoading((current) => !current);
            }, 600);
            setDone((current) => !current);
            setTimeout(() => {
                setDone((current) => !current);
            }, 3000);
        })
    }

    return (
        <Container maxWidth={'xl'}>
            <Box display={'flex'} gap={3} pt={3} pb={3}>
                <Link to={'/admin'} style={{width: 'fit-content', textDecoration: 'none', color: 'inherit'}}>
                    <Box boxShadow={10} sx={{
                        cursor: 'pointer',
                        border: `3px ${theme.backgroundColor} solid`,
                        background: theme.primaryColor,
                        width: 'fit-content',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                         px={2} py={0.7}
                    >
                        <IconListDetails/>
                        <Typography fontSize={20} pl={1} color={theme.backgroundColor}
                                    fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={900}>
                            DASHBOARD
                        </Typography>
                    </Box>
                </Link>
            </Box>
            <Box display={'flex'} gap={3} pt={3}>
                <Link to={'/menuItems'} style={{width: 'fit-content', textDecoration: 'none', color: 'inherit'}}>
                    <Box boxShadow={10} sx={{
                        cursor: 'pointer',
                        border: `3px ${theme.backgroundColor} solid`,
                        background: theme.primaryColor,
                        width: 'fit-content',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                         px={2} py={0.7}
                    >
                        <IconPencil/>
                        <Typography fontSize={20} pl={1} color={theme.backgroundColor}
                                    fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={900}>
                            MENU
                        </Typography>
                    </Box>
                </Link>
                <Link to={'/tables'} style={{width: 'fit-content', textDecoration: 'none', color: 'inherit'}}>
                    <Box boxShadow={10} sx={{
                        cursor: 'pointer',
                        border: `3px ${theme.backgroundColor} solid`,
                        background: theme.primaryColor,
                        width: 'fit-content',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                         px={2} py={0.7}
                    >
                        <IconPencil/>
                        <Typography fontSize={20} pl={1} color={theme.backgroundColor}
                                    fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={900}>
                            TABLES
                        </Typography>
                    </Box>
                </Link>
            </Box>
            <Grid container>
                <>
                    <Box m={{xs: 0, md: 3}} my={{xs: 3, md: 0}} boxShadow={3} sx={{
                        p: 3,
                        borderRadius: 1,
                        background: 'rgba(255, 255, 255, 0.60)',
                        backdropFilter: 'blur(8.9px)',
                        minWidth: '75%'
                    }}>
                        <Typography pt={2} variant={'h4'} color={theme.secondaryColor}
                                    fontFamily={theme.secondaryFont}>
                            Create new menu item
                        </Typography>
                        <form onSubmit={handleSubmit} method="POST">
                            <Grid container spacing={3} pb={2}>
                                <Grid item xs={12} md={8}>
                                    <TextInput name={'Name'} id={'name'}/>
                                </Grid>
                                <Grid item xs={8} md={4}>
                                    <TextInput name={'Weight/Volume'} id={'weight'}/>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <TextInput name={'Price'} id={'price'}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextInput name={'Allergens'} id={'allergens'}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextInput name={'Category'} id={'category'}/>
                                    <Typography variant={'caption'} pt={.5}>
                                        ('meal', 'drink', 'sides', 'alcohol', 'kids')
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                            </Grid>
                            {loading ?
                                <CircularProgress sx={{color: theme.secondaryColor}}/>
                                : done ?
                                    <Box sx={{
                                        width: 'fit-content',
                                        backgroundColor: theme.primaryColor,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        px: 3,
                                        borderWidth: 2,
                                        borderColor: theme.secondaryColor,
                                        borderStyle: 'solid',
                                        borderRadius: 1,
                                        py: 1,
                                        color: theme.textColor,
                                        textTransform: 'uppercase'
                                    }}
                                    >
                                        DONE
                                    </Box>
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
                                            fontWeight: 900,
                                            fontSize: 16,
                                            px: 3,
                                            borderRadius: 1,
                                            py: 1,
                                            color: 'white',
                                            textTransform: 'uppercase'
                                        }}
                                        >
                                            Create
                                        </Box>
                                    </button>
                            }
                        </form>
                    </Box>
                </>
            </Grid>
        </Container>
    )
}

export default CreateMenuItem