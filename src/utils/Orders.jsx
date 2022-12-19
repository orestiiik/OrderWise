import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase-config";

const Orders = () => {
    const [tables, setTables] = useState([]);
    const q = query(collection(db, 'orders'))

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            setTables(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        })
    }, []);
    return tables;
}
export default Orders;