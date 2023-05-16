import { useEffect, useState } from 'react';
import {db} from '../firebase.config';
import {collection, onSnapshot} from 'firebase/firestore';


const useGetData = (collectionName) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName)
    useEffect(() =>{
        const getData = async() =>{
            await onSnapshot(collectionRef, snapshot =>{
                setData(data.docs.map(doc =>({ ...doc.data(), id: doc.id})))
                setLoading(false)
            });

        }
        getData();
    },[]);
  return {data}
}

export default useGetData;