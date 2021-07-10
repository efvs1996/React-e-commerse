import React, { useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/category';
import {  getProduct, updateProduct } from '../../../functions/product';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const initialState = {
    title: '',
    description: '',
    price: '',
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

const ProductUpdate = ({match, history}) => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([] );
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}));

    let slug = match.params.slug

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        values.subs = arrayOfSubIds
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
        .then((res) => {
            setLoading(false)
            toast.success(`${res.data.title} is updated`);
            history.push("/admin/products");
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    } 

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, subs: []});

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data);
        })

        if (values.category._id === e.target.value){
            loadProduct();
        } 

        setArrayOfSubIds([])
    }

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            setValues({...values, ...p.data})
            getCategorySubs(p.data.category._id)
                .then((res) => {
                    setSubOptions(res.data);
                })
            let arr = []
            p.data.subs.map((s) => {
                arr.push(s._id)
            })
            setArrayOfSubIds((prev) => arr)
        });
    };

    const loadCategories = () => 
        getCategories()
            .then((c) =>
                setCategories(c.data))
    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    <br/>
                    {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Product Update</h4> }

                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues} 
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        subOptions={subOptions}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;