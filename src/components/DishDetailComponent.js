import { Component } from "react";
import { Card, CardImg, CardText, CardBody, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Label, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

function RenderDish(dish) {
    if (dish != null) {
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <h4>{dish.name}</h4>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function RenderComments(comments, postComment, dishId) {
    if (comments == null) {
        return (
            <div></div>
        )
    } else {
        const element = comments.map(function (el) {
            return (
                <Fade in>
                    <ListGroupItem key={el.id} as="li" className="list-unstyled">
                        <CardText>{el.comment}</CardText>
                        <CardText>-- {el.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(el.date)))}</CardText>
                    </ListGroupItem>
                </Fade>
            )
        })

        return (
            <div>
                <h3>Comments</h3>
                <ListGroup as="ul" className="mb-3">
                <Stagger in>
                    {element}
                </Stagger>
                </ListGroup>
                <CommentForm dishId={dishId} postComment={postComment} />
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null)
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
                        {RenderComments(props.comments, props.postComment, props.dish.id)}
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div></div>
        )
}

export default DishDetail;