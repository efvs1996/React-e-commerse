import React, { useState, useEffect} from 'react';
import CategoryForm from '../../../components/forms/CategoryForm';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getCategories } from '../../../functions/category';
import {getSub, updateSub} from '../../../functions/subCategory';


const SubUpdate = ({match, history}) =>{
    const {user} = useSelector((state) => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");


    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () => {
        getSub(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
            console.log(parent)
        })};


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        updateSub(match.params.slug, {name, parent}, user.token)
        .then((res) => {
            setName('')
            setLoading(false)
            toast.success(`"${res.data.name}" is created`);
            history.push("/admin/sub");
        })
        .catch((err) => {
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
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
                                ):(
                            <h4> Update subCategory</h4>
                    )}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select 
                            name="category" 
                            className="form-control" 
                            onChange={(e) => setParent(e)} 
                            placeholder={categories.map((c) => {if(c._id === parent)return c.name})}>
                           
                            <option>Please select</option>
                            {categories.length > 0 && 
                                categories.map((c) => (
                                    <option  value={c._id} key={c._id}>
                                        {c.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <br/>
                    <hr/>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                </div>
            </div>
        </div>
    )
}

export default SubUpdate;