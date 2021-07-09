import React, { useState, useEffect} from 'react';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, getCategories, removeCategory} from '../../../functions/category';
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";



const CategoryCreate = () =>{
    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then((c) => {
        setCategories(c.data)
    })
       

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createCategory({name}, user.token)
        .then((res)=> {
            setName('')
            loadCategories();
            setLoading(false)
            toast.success(`"${res.data.name}" is created`);
        })
        .catch(err => {
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }   

    const handleRemove = async (slug) => {
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCategory(slug, user.token)
            .then((res)=> {
                setLoading(false);
                toast.error(`${res.data.deleted.name} was deleted`)
                loadCategories();
            })
            .catch((err) => {
                console.log(err)
                if (err.response === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            })
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                                ):(
                            <h4> Create category</h4>)}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>

                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-primary" key={c._id}>
                            {c.name}
                            <span className="btn valign-wrapper right" onClick={()=> handleRemove(c.slug)}>
                                <DeleteOutlined className="text-danger"/>
                            </span> 
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn valign-wrapper  right">
                                    <EditOutlined className="text-warning"/>
                                </span>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default CategoryCreate