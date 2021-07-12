import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
const Home = () =>{

    return(
        <>
        <div className="card-panel grey lighten-4 display-3 font-weight-bold text-center text-danger" style={{padding: "5.4rem"}} >
            <Jumbotron text={['Recien Lanzados', 'Ultimos Añadidos', 'Mas Vendidos']}/>
        </div>

        <h4 className="text-center p-3 mt-5 mb-5 display-5 card-panel grey lighten-4">
            Ultimos Añadidos
        </h4>
        <NewArrivals/>

        <h4 className="text-center p-3 mt-5 mb-5 display-5 card-panel grey lighten-4">
            Mas Vendidos
        </h4>
        <BestSellers/>
        <br/><br/>
        </>
    )
}

export default Home;