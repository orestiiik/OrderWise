import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../utils/firebase-config";
import {Link} from "react-router-dom";
import {deleteDoc, doc} from "firebase/firestore";
import menuItems from "../utils/MenuItems";
import {IconListDetails, IconPencil, IconPlus, IconTrash} from "@tabler/icons";

const MenuItemsPage = () => {
    const theme = useContext(ThemeContext)
    const [user, loading, error] = useAuthState(auth);

    const isAdmin = user?.email === 'admin@admin.com'

    const menu = menuItems()

    return (
        <Container maxWidth={'xl'} sx={{pt: 5}}>
            <Typography fontWeight={600} variant={'h4'} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            width: 'fit-content'
                        }}
            >
                Menu items
            </Typography>
            {isAdmin &&
                <Box display={'flex'} gap={3}>
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
            }
            <Divider sx={{pt: 3}}/>
            <Typography fontWeight={600} variant={'h6'} pt={3} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            width: 'fit-content'
                        }}
            >
                YOUR MENU ITEMS
            </Typography>
            <Link to={'/newMenuItem'} style={{width: 'fit-content', textDecoration: 'none', color: 'inherit'}}>
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
                    <IconPlus/>
                    <Typography fontSize={20} pl={1} color={theme.backgroundColor}
                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={900}>
                        CREATE MENU ITEM
                    </Typography>
                </Box>
            </Link>
            <Grid container pb={3}>
                {menu.map(item =>
                    <Grid item xs={12} md={4} p={2}>
                        <Grid key={item.id} container item boxShadow={5} height={'100%'} xs={12} borderRadius={1} p={3}>
                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                <Typography fontSize={18} color={theme.secondaryColor}>
                                    {item.data.name}
                                </Typography>
                                <IconTrash
                                    color={'red'}
                                    style={{cursor: 'pointer'}}
                                    onClick={async () => await deleteDoc(doc(db, "menu", item.id))}
                                />
                            </Grid>
                            <Grid item xs={12} py={1.5}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={6}>
                                Price
                            </Grid>
                            <Grid item xs={6} fontWeight={600}>
                                {item.data.price} kr
                            </Grid>
                            <Grid item xs={6}>
                                Weight/Volume
                            </Grid>
                            <Grid item xs={6} fontWeight={600}>
                                {item.data.weight}{(item.data.category === 'drinks' || item.data.category === 'alcohol') ? 'l' : 'g' }
                            </Grid>
                            <Grid item xs={6}>
                                Allergens
                            </Grid>
                            <Grid item xs={6} fontWeight={600}>
                                {item.data.allergens.map((alergen, index) =>
                                    item.data.allergens.length !== index + 1 ? alergen + ',' : alergen
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                Category
                            </Grid>
                            <Grid item xs={6} fontWeight={600}>
                                {item.data.category}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default MenuItemsPage