import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../utils/firebase-config";
import {Link} from "react-router-dom";
import Orders from "../utils/Orders";
import {deleteDoc, doc} from "firebase/firestore";
import menuItems from "../utils/MenuItems";
import {IconCheck, IconPencil, IconTrash} from "@tabler/icons";

const AdminPage = () => {
    const theme = useContext(ThemeContext)
    const [user, loading, error] = useAuthState(auth);

    const isAdmin = user?.email === 'admin@admin.com'

    const orders = Orders()

    const menu = menuItems()

    const getMenuItemById = ({menuRef}) => {
        return menu.filter(item => item.id === menuRef)[0]?.data
    }

    return (
        <Container maxWidth={'xl'} sx={{pt: 5}}>
            <Typography fontWeight={600} variant={'h4'} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            width: 'fit-content'
                        }}
            >
                DASHBOARD
            </Typography>
            {isAdmin &&
                <Box display={'flex'} gap={3}>
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
            }
            <Divider sx={{pt: 3}}/>
            <Typography fontWeight={600} variant={'h6'} pt={3} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            width: 'fit-content'
                        }}
            >
                YOUR ORDERS
            </Typography>
            <Grid container pb={3}>
                {orders.sort((a, b) => a.data.created - b.data.created).map(order =>
                    <Grid item xs={12} md={4} p={2}>
                        <Grid key={order.id} item boxShadow={5} height={'100%'} xs={12} borderRadius={1} p={3}>
                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                <Box sx={{
                                    mt: 1,
                                    borderRadius: '15px',
                                    background: theme.backgroundColor,
                                    border: '5px solid #c5934e',
                                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
                                    width: 45,
                                    height: 45,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Typography px={2} fontSize={28} color={'white'} fontFamily={"'Inter', sans-serif"}>
                                        {order.data.table}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} gap={2}>
                                    <IconTrash
                                        color={'red'}
                                        style={{cursor: 'pointer'}}
                                        onClick={async () => await deleteDoc(doc(db, "orders", order.id))}
                                    />
                                    <IconCheck
                                        color={'green'}
                                        style={{cursor: 'pointer'}}
                                        onClick={async () => await deleteDoc(doc(db, "orders", order.id))}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} py={1.5}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                {order.data.order.map(item => {
                                    const menuItem = getMenuItemById({menuRef: item.menuId})
                                    return (
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Typography fontSize={23}>
                                                {menuItem.name}
                                            </Typography>
                                            <Typography fontSize={18}>
                                                {item.quantity} ks
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default AdminPage