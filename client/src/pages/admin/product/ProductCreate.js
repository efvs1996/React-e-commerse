import React, { useState, useEffect} from 'react';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { createProduct, getProduct } from '../../../functions/product';
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";



const initialState = {
    title: '',
    description: 'One of the best products for april',
    price: '2199',
    categories: [],
    category: '',
    subs: [],
    shipping: 'Yes',
    quantity: '41',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: 'White',
    brand: 'Apple'
}


const ProductCreate = () => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions ] = useState([]);
    const [showSub, setShowSub] = useState(false);

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories= () => getCategories().then((c) => setValues({...values, categories: c.data}))

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
        .then((res) => { 
            console.log(res)
            window.alert(`"${res.data.title}" is created`);
            window.location.reload();
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.err)
        })
    } 

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        // console.log(e.target.name, " -----", e.target.value);
    } 

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, category : e.target.value});
        console.log(e.target.value)
        getCategorySubs(e.target.value).then(res => {
            console.log("subs", res)
            setSubOptions(res.data);
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>

                <div className="col-md-10">
                    <h4>Product Create</h4>
                    <hr/>
                    <ProductCreateForm 
                        values={values} 
                        setValues={setValues}
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;