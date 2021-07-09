import React, { useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/category';
import {  getProduct } from '../../../functions/product';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: 'Yes',
    quantity: '0',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ['Apple', 'Samsung', 'Oneplus', 'Razer', 'Msi', 'Lenovo', 'Microsoft'],
    color: '',
    brand: ''
}

const ProductUpdate = ({match}) => {
    const [values, setValues] = useState(initialState)
    const {user} = useSelector((state) => ({...state}));

    let slug = match.params.slug

    useEffect(() => {
        loadProduct();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    } 

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            setValues({...values, ...p.data})
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    <br/>
                    <h4>Product Update</h4>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;