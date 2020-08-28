import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isAlpha = (val) => /^[a-zA-Z]*$/i.test(val);

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(values)
    {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    render()
    {
        return(
        <>    
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <div className="container">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Label htmlFor="rating">Rating</Label>
                            </Row>
                            <Row className="form-group">                                
                                    <Control.select model=".rating" name="rating" 
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option> 
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option> 
                                    </Control.select>
                            </Row>
                            <Row>
                                <Label htmlFor="firstname">First Name</Label>
                            </Row>
                            <Row className="form-group">
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15),
                                            isAlpha
                                        }}/>
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters.',
                                            maxLength: 'Must be less than or 15 characters.',
                                            isAlpha: 'Name Should contain alphabets only.'
                                        }}
                                    />
                            </Row>
                            <Row>                                
                                <Label htmlFor="message">Your Feedback</Label>
                            </Row>
                            <Row className="form-group">
                                    <Control.textarea model=".message" id="message" name="message"
                                        row="6"
                                        className="form-control"/>                                
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Comments
            </Button>
        </>
        );
    }
}

function RenderDish({dish})
{
    return(
    <div className="col-12 col-md-5 m-1">
        <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>
    );
}

    function RenderComments({commentArray, postComment, dishId})
    {
        if(commentArray!=null)
        {   
            const commentSet = commentArray.map((currentComment) => {
                return(
                    <div>
                        <Fade in>
                            <li>
                                <p>{currentComment.comment}</p>
                            </li>
                            <li>
                                <p>--{currentComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(currentComment.date)))}
                                </p>
                                
                            </li>
                        </Fade>
                    </div>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {commentSet}
                        </Stagger>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </ul>
                </div>
            );
            
        }
        else
        {
            return(
            <div></div>
            );
        }
        
    }

    const DishDetail = (props) => {
        if (props.isloading)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess)
        {
            return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
            );
        }
        else if(props.dish!=null)
        {   
            return(
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to='/menu'>menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                                <RenderDish dish = {props.dish}/>
                                <RenderComments commentArray={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                        </div>    
                    </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
        
    }

export default DishDetail;