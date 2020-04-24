import React, {Component} from 'react';
import PostCard from './PostCard';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Button, CustomInput, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import {GET_POST, CREATE_COMMENT} from '../../constants';
import axios from 'axios';

class PostModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: {},
            comments: [],
            commentContent: '',
            isAnonymous: false
        };
    }

    static propTypes = {
        postId: PropTypes.number,
        category: PropTypes.object
    }
    componentDidMount(){
        /**
         * @todo: Make rest call here and get the comments for the post
         * 
         */
       if(this.props.postId){
           axios.get(`${GET_POST}${this.props.postId}`)
                .then(res => {
                    this.setState({
                      post: res.data.posts,
                      comments: res.data.comments
                    });
                })
       }
    }
    handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked: event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    handleCommentSubmit = (event) => {
        event.preventDefault();
        const comment = {
            userId: 3,
            postsId: this.state.post.id,
            isAnonymous: this.state.isAnonymous,
            commentsContent: this.state.commentContent
        }
        axios.post(CREATE_COMMENT, comment)
             .then(res => {
                 let comments = [...this.state.comments];
                 comments.unshift(res.data);
                 this.setState({
                     comments
                 });
             })
             .catch(err => {
                 console.log(err);
             })
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} centered={true}>
                <ModalHeader toggle={this.props.toggle}>{this.state.post.title}</ModalHeader>
                <ModalBody>
                    {this.state.post ?  <PostCard post={this.state.post} category={this.state.post.category} disable={true}/> : null}
                    <Form onSubmit={this.handleCommentSubmit}> 
                        <FormGroup>
                            <Label for="postComment" hidden>Leave your comment here...</Label>
                            <Input  type="textarea" className="mb-3" name="commentContent" onChange={this.handleInputChange}
                                    id="postComment" placeholder="Leave your comment here..." value={this.state.commentContent}/>
                        </FormGroup>
                        <FormGroup className="col-sm-12" >
                            <Button color="danger" className="float-right" onClick={this.handleCommentSubmit}
                                    disabled={!this.state.commentContent} >Comment</Button>
                            <CustomInput type="checkbox" id="postAnonymously" label="Post Anonymously" onChange={this.handleInputChange}/>
                        </FormGroup>
                    </Form>
                    {/* { <div className="container border border-secondary rounded">
                            <div className="text-secondary">COMMENTS</div>
                            {this.state.comments ? this.state.comments.map(comment => {
                                return <PostCard key={comment.id} post={comment} disable={true}></PostCard>
                            }) : null}
                    </div> } */}
                </ModalBody>
            </Modal>
        )
    }
}

export default PostModal;