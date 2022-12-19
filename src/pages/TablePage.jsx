import {
    Box,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Hidden,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import {useParams} from "react-router-dom";
import Tables from "../utils/Tables";
import MenuItems from "../utils/MenuItems";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase-config";

const MenuList = ({menuItem, order, setOrder, volume}) => {
    const theme = useContext(ThemeContext)
    return (
        <Grid item xs={12} py={0.5} md={6} display={'flex'} alignItems={'center'} sx={{
            borderLeft: '2px solid black'
        }}>
            <Grid item xs={6} md={4} display={'flex'} flexDirection={'column'}>
                <Typography fontSize={26} color={theme.primaryColor} fontWeight={600}
                            fontFamily={"'Carrois Gothic', sans-serif"}>
                    {menuItem.data.name}
                </Typography>
                <Typography fontFamily={"'Inter', sans-serif"}>
                    {menuItem.data.allergens.map((alergen, index) =>
                        menuItem.data.allergens.length !== index + 1 ? alergen + ',' : alergen
                    )}
                </Typography>
                <Hidden mdUp>
                    {menuItem.data.weight}{volume ? 'l' : 'g'}
                </Hidden>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={2} fontWeight={200}>
                    {menuItem.data.weight}{volume ? 'l' : 'g'}
                </Grid>
            </Hidden>
            <Grid item xs={2.5} px={1}>
                <TextField
                    label="Qty"
                    id="quantity"
                    fullWidth
                    type={'number'}
                    defaultValue={0}
                    value={order[menuItem.id]?.quantity}
                    onChange={(e) => {
                        if (e.target.value >= 0) {
                            setOrder(
                                {
                                    ...order,
                                    [menuItem.id]: {
                                        quantity: e.target.value,
                                        price: menuItem.data.price
                                    }
                                }
                            )
                        }
                    }}
                    sx={{
                        "& label.Mui-focused": {
                            color: theme.secondaryColor,
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: theme.secondaryColor
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: <Hidden mdDown>
                            <InputAdornment
                                position="start">ks</InputAdornment>
                        </Hidden>,
                    }}
                />
            </Grid>
            <Grid item xs={1.75} px={1} fontSize={{xs: 12, md: 15}}>
                {menuItem.data.price}kr
            </Grid>
            <Grid item xs={1.75}>
                <Typography fontSize={18} color={theme.secondaryColor} fontWeight={900}
                            fontFamily={"'Inter', sans-serif"}>
                    {Math.round(menuItem.data.price * (order[menuItem.id]?.quantity ?? 0) * 100) / 100}kr
                </Typography>
            </Grid>
        </Grid>
    )
}

const TablePage = () => {
    const params = useParams();
    const id = params.id;
    const theme = useContext(ThemeContext)

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    async function handleSubmit(e) {
        setLoading((current) => !current);
        e.preventDefault();
        console.log(Object.keys(order).map(item => {
            return {
                quantity: order[item].quantity,
                menuId: `menu/${order[item].id}`
            }
        }))
        addDoc(collection(db, "orders"), {
            order:
                Object.keys(order).map(item => {
                    return {
                        quantity: order[item].quantity,
                        menuId: `${item}`
                    }
                })
            ,
            table: table.data.number
        }).then(() => {
            setTimeout(() => {
                setLoading((current) => !current);
            }, 600);
            setDone((current) => !current);
        })
    }

    const table = Tables().find(table => table.id === id)
    const menu = MenuItems()

    const calculateSum = () => {
        let sum = 0
        Object.keys(order).forEach(item => sum = sum + order[item].quantity * order[item].price)
        return Math.round(sum * 100) / 100
    }
    return (
        <Container maxWidth={'xl'}>
            <Grid container>
                {loading ?
                    <Box width={'100%'} pt={5} textAlign={'center'}>
                        <Box sx={{
                            mx: 'auto',
                            my: 'auto',
                            p: 6,
                            width: 'fit-content',
                            background: 'white',
                            border: '3px black solid'
                        }}>
                            <CircularProgress color={'warning'}/>
                        </Box>
                    </Box> :
                    done ?
                        <Box width={'100%'} pt={5} textAlign={'center'}>
                            <Box sx={{
                                mx: 'auto',
                                my: 'auto',
                                width: 'fit-content',
                                background: '#66ff66',
                                border: '3px black solid'
                            }}>
                                <Typography fontSize={32} px={12} py={1.4} fontWeight={600}>
                                    Thanks for order!
                                </Typography>
                            </Box>
                        </Box>
                        :
                        table &&
                        <>
                            <Box display={'flex'} alignItems={'center'}>
                                <Box sx={{
                                    mt: 3,
                                    borderRadius: '15px',
                                    background: theme.backgroundColor,
                                    border: '5px solid #c5934e',
                                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
                                }}>
                                    <Typography px={2} fontSize={40} color={'white'} fontFamily={"'Inter', sans-serif"}>
                                        {table.data.number}
                                    </Typography>
                                </Box>
                                <Typography px={2} fontSize={40} color={theme.backgroundColor}
                                            fontFamily={"'Inter', sans-serif"} fontWeight={600}>
                                    Table
                                </Typography>
                            </Box>
                            <Grid container mt={2} mb={4} spacing={3} px={{xs: 2, md: 0}}>
                                <Grid item xs={12}>
                                    <Typography fontSize={40} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Menu
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} pt={2}>
                                    <Typography fontSize={32} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Meals
                                    </Typography>
                                </Grid>
                                {menu.filter(item => item.data.category === 'meal').map((menuItem, index) =>
                                    <MenuList menuItem={menuItem}  volume={false} order={order}
                                              setOrder={setOrder}/>
                                )
                                }
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                                <Grid item xs={12} pt={2}>
                                    <Typography fontSize={32} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Kids
                                    </Typography>
                                </Grid>
                                {menu.filter(item => item.data.category === 'kids').map((menuItem, index) =>
                                    <MenuList menuItem={menuItem}  volume={false} order={order}
                                              setOrder={setOrder}/>
                                )
                                }
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                                <Grid item xs={12} pt={2}>
                                    <Typography fontSize={32} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Drinks
                                    </Typography>
                                </Grid>
                                {menu.filter(item => item.data.category === 'drinks').map((menuItem, index) =>
                                    <MenuList menuItem={menuItem}  volume={true} order={order}
                                              setOrder={setOrder}/>
                                )
                                }
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontSize={40} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Sides
                                    </Typography>
                                </Grid>
                                {menu.filter(item => item.data.category === 'sides').map((menuItem, index) =>
                                    <MenuList menuItem={menuItem}  volume={false} order={order}
                                              setOrder={setOrder}/>
                                )
                                }
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontSize={40} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        Alcohol
                                    </Typography>
                                </Grid>
                                {menu.filter(item => item.data.category === 'alcohol').map((menuItem, index) =>
                                    <MenuList menuItem={menuItem}  volume={true} order={order}
                                              setOrder={setOrder}/>
                                )
                                }
                                <Grid item xs={12}>
                                    <Divider variant={'fullWidth'}/>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                    <Typography
                                        fontSize={23}
                                        color={theme.backgroundColor}
                                        fontFamily={"'Carrois Gothic', sans-serif"}
                                        fontWeight={600}
                                        pr={2}
                                        sx={{textDecoration: 'underline'}}
                                    >
                                        TOTAL
                                    </Typography>
                                    <Typography fontSize={40} color={theme.backgroundColor}
                                                fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={600}>
                                        {calculateSum()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                    <Box boxShadow={10} sx={{
                                        cursor: 'pointer',
                                        border: `3px ${theme.backgroundColor} solid`,
                                        background: theme.primaryColor,
                                    }}
                                         onClick={(e) => handleSubmit(e)}
                                    >
                                        <Typography fontSize={36} px={3} py={0.7} color={theme.backgroundColor}
                                                    fontFamily={"'Carrois Gothic', sans-serif"} fontWeight={900}>
                                            ORDER
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                }
            </Grid>
        </Container>
    )
}

export default TablePage