import { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish(dish) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <h4>{dish.name}</h4>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function RenderComments(comments) {
    if (comments == null) {
        return (
            <div></div>
        )
    } else {
        const element = comments.map(function (el) {
            return (
                <ListGroupItem key={el.id} as="li" className="list-unstyled">
                    <CardText>{el.comment}</CardText>
                    <CardText>-- {el.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(el.date)))}</CardText>
                </ListGroupItem>
            )
        })

        return (
            <div>
                <h3>Comments</h3>
                <ListGroup as="ul">
                    {element}
                </ListGroup>
            </div>
        )
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-5 m-1">
                    {RenderDish(props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {RenderComments(props.comments)}
                </div>
            </div>
        </div>
    )
}

export default DishDetail;