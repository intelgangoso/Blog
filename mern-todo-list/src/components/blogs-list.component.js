import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = props => (
    <div className="jumbotron p-4 p-md-5 text-white rounded bg-secondary col-md-9 mx-auto">
        <h3 className='col-md-11 display-4 font-italic'>{props.blog.blog_title}</h3>
        <button type="button" className="col-md-1 btn btn-light">
            <Link to={'/edit/' + props.blog._id}>Edit</Link>
        </button>
        <p className='blog-content'>
            <div>
                <p>Author: {props.blog.blog_author}</p>
                <p>Published: {props.blog.blog_publish}</p>
            </div>
            <div className='col-md-3'>
                <a href={props.blog.blog_url}>
                    <img src={props.blog.blog_image} style={{width: 300, height: 300}} />
                </a>
            </div>
            <div className='col-md-9'>{props.blog.blog_description}</div>
        </p>
    </div>
)

export default class BlogsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blogs: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/blogs/')
            .then(response => {
                this.setState({
                    blogs: response.data
                })
            })
            .catch(error => console.log(error));
    }

    blogsList() {
        return this.state.blogs.map((currentBlog, i) => { return <Blog blog={currentBlog} key={i}></Blog> })
    }

    render() {
        return (
            <div>
                {this.blogsList()}
            </div>
        )
    }
}
