import React from 'react';
import {Card} from 'antd';
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import image from '../../img/defaultlaptop.png';

const { Meta } = Card;


const ProductCard = ({product}) => {

    const {images, title, description, slug} = product;
    return(
        <Card 
            cover={
                <img 
                    src={images && images.length ? images[0].url : image}
                    style={{height:"150px", objectFit: "contain"}}
                    className="m-2"    
                />
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-primary"/><br/> Ver Producto
                </Link>,
                <>
                <ShoppingCartOutlined className="text-success"/><br/> Añadir al Carrito
                </>
            ]}
        >
        <Meta title={title} description={`${description && description.substring(0, 40)}...`}/>
        </Card >
    )
}

export default ProductCard;