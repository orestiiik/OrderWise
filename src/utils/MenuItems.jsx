import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase-config";

const MenuItems = () => {
    const [menu, setMenu] = useState([]);
    const q = query(collection(db, 'menu'))

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            setMenu(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        })
    }, []);
    return menu;
}
export default MenuItems;