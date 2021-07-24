import { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props)
    }

    renderDish(dish) {
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

    renderComments(dish) {
        if (dish == null) {
            return (
                <div></div>
            )
        } else {
            const element = dish.comments.map(function (el) {
                return (
                    <ListGroupItem key={el.id} as="li" className="list-unstyled">
                        <CardText>{el.comment}</CardText>
                        <CardText>-- {el.author}, {el.date}</CardText>
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

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        )
    }
}

export default DishDetail;