import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBlog extends Component {
    constructor(props) {
        super(props)

        this.onChangeBlogTitle = this.onChangeBlogTitle.bind(this);
        this.onChangeBlogAuthor = this.onChangeBlogAuthor.bind(this);
        this.onChangeBlogDescription = this.onChangeBlogDescription.bind(this);
        this.onChangeBlogUrl = this.onChangeBlogUrl.bind(this);
        this.onChangeBlogImage = this.onChangeBlogImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            blog_title: '',
            blog_author: '',
            blog_description: '',
            blog_url: '',
            blog_image: ''
        }
    }

    onChangeBlogTitle(e) {
        this.setState({
            blog_title: e.target.value
        })
    }

    onChangeBlogAuthor(e) {
        this.setState({
            blog_author: e.target.value
        })
    }

    onChangeBlogDescription(e) {
        this.setState({
            blog_description: e.target.value
        })
    }

    onChangeBlogUrl(e) {
        this.setState({
            blog_url: e.target.value
        })
    }

    onChangeBlogImage(e) {
        this.setState({
            blog_image: e.target.value
        })
    }

    onChangeBlogUrl(e) {
        this.setState({
            blog_url: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newBlog = {
            blog_title: this.state.blog_title,
            blog_author: this.state.blog_author,
            blog_description: this.state.blog_description,
            blog_url: this.state.blog_url,
            blog_image: this.state.blog_image
        }

        axios.post('http://localhost:4000/blogs/add', newBlog)
            .then(res => console.log(res.data));

        this.setState({
            blog_title: '',
            blog_author: '',
            blog_description: '',
            blog_url: '',
            blog_image: ''
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className='form-container'>
                <h3>Create New Blog</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Title: </label>
                        <input type='text' className='form-control' value={this.state.blog_title} onChange={this.onChangeBlogTitle} />
                    </div>
                    <div className='form-group'>
                        <label>Author: </label>
                        <input type='text' className='form-control' value={this.state.blog_author} onChange={this.onChangeBlogAuthor} />
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text' className='form-control' value={this.state.blog_description} onChange={this.onChangeBlogDescription} />
                    </div>
                    <div className='form-group'>
                        <label>Url: </label>
                        <input type='text' className='form-control' value={this.state.blog_url} onChange={this.onChangeBlogUrl} />
                    </div>
                    <div className='form-group'>
                        <label>Image: </label>
                        <input type='text' className='form-control' value={this.state.blog_image} onChange={this.onChangeBlogImage} />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create Blog' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}
