import React, { useEffect, useState} from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import {removeProduct} from '../../../functions/product';
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () =>{

    const [products,setProducts] = useState([]);
    const [loading, setLoading ]= useState(false);

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllProducts()
    }, []);

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
        .then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err) => {
        console.log(err);
        setLoading(false);
        })
    };

    const handleRemove = (slug) => {
        if (window.confirm('Delete?')){
            // console.log("send delete request", slug)
            removeProduct(slug, user.token)
            .then((res) => {
                loadAllProducts()
                toast.error(`${res.data.title} is deleted`);
            }).catch((err) => {
                if (err.response.status === 400) toast.error(err.response.data)
                console.log(err)
            })
        }
    }

    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col">
            <br/>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>All products</h4>
            )}
                <div className="row">
                    {products.map((product) => (
                        <div className="col-sm-2  pb-3">
                            <AdminProductCard product={product} key={product._id} handleRemove={handleRemove}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>

    )
}

export default AllProducts