import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from '../../img/defaultlaptop.png';
import ProductListItems from './ProductListItems';

const {TabPane} = Tabs

const SingleProduct = ({product}) => {
    const {title,images, description} = product;


    return(
        <>
            <div className="col-md-4 center-align offset-md-2">
                {images && images.length ? 
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((i) => 
                            <img style={{
                                objectFit: "contain"}} 
                                src={i.url} 
                                key={i.public_id}/>
                            )}
                    </Carousel> 
                        :
                    <Card
                        cover={
                            <img 
                                src={laptop}
                                className="mb-3 card-image"    
                            />
                        }>
                    </Card>
                }
                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>

                    <TabPane tab="More" key="2">
                        Call use on XXXx TO KNOWm ore
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-4">
            <h1 className="blue lighten-4 p-3" style={{borderRadius: '8px'}}>{title}</h1>
                <Card 
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success"/><br/> 
                            Add to Cart 
                        </>,
                        <Link to='/'><HeartOutlined className="text-info"/><br/>
                            Add to WishList
                        </Link>
                    ]}>
                    <ProductListItems product={product}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;