import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItems = ({product}) => {
    const {
            price, 
            category, 
            subs, 
            shipping, 
            color, 
            brand, 
            quantity, 
            sold
    } = product;

    return(
        <ul className="list-group">
            <li className="list-group-item p-3">
                Price{""}<span className="right">$ {price}</span>
            </li>

            {category && (
                <li className="list-group-item p-3">
                    Category{""}<Link 
                                    to={`/category/${category.slug}`}
                                    className="right">
                                        {category.name}
                                    </Link>
                </li>
            )}

            {subs && (
                <li className="list-group-item p-3">
                    Sub Categories
                    {subs.map ((s) => (
                        <Link to={`/sub/${s.slug}`} 
                        className="blue-text right col">
                            {s.name}
                        </Link>
                        )
                    )}
                </li>
            )}

            <li className="list-group-item p-3">
                Shipping{""}<span className="right">{shipping}</span>
            </li>

            <li className="list-group-item p-3">
                Color{""}<span className="right">{color}</span>
            </li>

            <li className="list-group-item p-3">
                Brand{""}<span className="right">{brand}</span>
            </li>

            <li className="list-group-item p-3">
                Available{""}<span className="right">{quantity}</span>
            </li>

            <li className="list-group-item p-3">
                Sold{""}<span className="right">{sold}</span>
            </li>
        </ul>
    )
}

export default ProductListItems;