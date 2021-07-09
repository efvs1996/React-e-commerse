import React, { useState, useEffect} from 'react';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { createProduct, getProduct } from '../../../functions/product';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';


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


const ProductCreate = () => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions ] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState();

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
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.value)
    } 

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, subs: [], category : e.target.value});
        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data);
        })
        setShowSub(true);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>

                <div className="col-md-10">
                    <br/>
                    {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Product Create</h4> }
                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues} 
                            setLoading={setLoading}
                        />
                    </div>
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