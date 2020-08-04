import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderDish({dish})
{
    return(
    <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    </div>
    );
}

    function RenderComments({commentArray})
    {
        if(commentArray!=null)
        {   
            const commentSet = commentArray.map((currentComment) => {
                return(
                    <div>
                        <li>
                            <p>{currentComment.comment}</p>
                        </li>
                        <li>
                            <p>--{currentComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(currentComment.date)))}
                            </p>
                            
                        </li>
                    </div>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentSet}
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
        if(props.dish!=null)
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
                                <RenderComments commentArray={props.comments}/>
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