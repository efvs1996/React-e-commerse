import React, {useEffect, useState} from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import {Pagination} from 'antd';


const NewArrivals = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading]= useState(true);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);


    useEffect(() => {
        loadAllProducts()
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => {
            setProductsCount(res.data.length)
        })
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts('createdAt', 'desc', page)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
    }

    return(
        <>
        <div className="container">
        { loading ? 
            (<LoadingCard count={4}/>) 
                :  
            (<div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-3" > 
                        <ProductCard product={product}/>
                        <br/>
                    </div>
                )
            )}
            </div>
        )}
        </div>
        <div className="row">
            <div className="col-md-4 p-3 offset-md-4 text-center">
                <Pagination 
                    current={page} 
                    total={(productsCount / 4) * 10} 
                    onChange={((value) => setPage(value))}
                />
            </div>
        </div>
        </>
    )
}

export default NewArrivals;