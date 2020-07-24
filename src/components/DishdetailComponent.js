import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component
{
    constructor(props)
    {
        super(props);
    }

    renderDish(dish)
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

    renderComments(commentArray)
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

    render(){
        const dish = this.props.dish;
        if(dish!=null)
        {   
            return(
                    <div className="container">
                        <div className="row">
                            {this.renderDish(dish)}
                            {this.renderComments(dish.comments)}
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



}
export default DishDetail;