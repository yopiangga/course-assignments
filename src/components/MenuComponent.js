
import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <h5>{dish.name}</h5>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        })

        return (
            <div className="container">
                <div className="row flex justify-content-center">
                    {menu}
                </div>
            </div>
        )
    }
}

export default Menu;