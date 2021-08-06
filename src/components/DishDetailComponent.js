import { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {
    Breadcrumb, BreadcrumbItem,
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Col, 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
                <ListGroup as="ul" className="mb-3">
                    {element}
                </ListGroup>
                <CommentForm />
            </div>
        )
    }
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group mb-2">
                                <Label htmlFor="telnum" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" className="form-control form-select" id="rating" name="rating" defaultValue="1">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>
                            <Row className="form-group mb-2">
                                <Label htmlFor="lastname" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group mb-2">
                                <Label htmlFor="lastname" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea rows="6" model=".comment" id="comment" name="comment"
                                        placeholder="Your comment . . . "
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit Comment</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
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