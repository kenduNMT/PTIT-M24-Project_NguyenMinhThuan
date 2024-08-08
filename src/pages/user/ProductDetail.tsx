import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { instance } from '../../service';

export default function ProductDetails() {
    const [proInfor, setProInfo] = useState({});
    // lấy ra products id
    const productId = useParams().productId;
    useEffect(() => {
        instance.get(`product/${productId}`)
            .then(res => {
                setProInfo(res.data)
            })
            .catch(err => console.log(err));

    }, [])
    return (
        <div>
            <h1>{productId}</h1>
        </div>
    )
}