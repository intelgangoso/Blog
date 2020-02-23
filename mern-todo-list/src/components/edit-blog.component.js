import React, { Component } from 'react';
import axios from 'axios';

export default class EditBlog extends Component {
    constructor(props) {
        super(props)

        this.onChangeBlogTitle = this.onChangeBlogTitle.bind(this);
        this.onChangeBlogAuthor = this.onChangeBlogAuthor.bind(this);
        this.onChangeBlogDescription = this.onChangeBlogDescription.bind(this);
        this.onChangeBlogUrl = this.onChangeBlogUrl.bind(this);
        this.onChangeBlogImage = this.onChangeBlogImage.bind(this);
        this.onEditBlog = this.onEditBlog.bind(this);
        this.onDeleteBlog = this.onDeleteBlog.bind(this);
        this.onSubmitBlog = this.onSubmitBlog.bind(this);

        this.state = {
            blog_title: '',
            blog_author: '',
            blog_description: '',
            blog_url: '',
            blog_image: '',
            blog_disabled: true,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/blogs/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    blog_title: response.data.blog_title,
                    blog_author: response.data.blog_author,
                    blog_description: response.data.blog_description,
                    blog_url: response.data.blog_url,
                    blog_image: response.data.blog_image,
                    blog_publish: response.data.blog_publish
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onEditBlog);
    }

    onChangeBlogTitle(e) {
        this.setState({
            blog_title: e.target.value
        });
    }

    onChangeBlogAuthor(e) {
        this.setState({
            blog_author: e.target.value
        });
    }

    onChangeBlogDescription(e) {
        this.setState({
            blog_description: e.target.value
        });
    }

    onChangeBlogUrl(e) {
        this.setState({
            blog_url: e.target.value
        });
    }

    onChangeBlogImage(e) {
        this.setState({
            blog_image: e.target.value
        });
    }

    onEditBlog(e) {
        e.preventDefault();
        this.setState({
            blog_disabled: !this.state.blog_disabled
        });
    }

    onDeleteBlog(e){
        e.preventDefault();

        axios.delete(`http://localhost:4000/blogs/delete/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    blogs: res.data
                });
                this.props.history.push('/');
            });
    }

    onSubmitBlog() {
        const obj = {
            blog_id: this.props.match.params.id,
            blog_title: this.state.blog_title,
            blog_author: this.state.blog_author,
            blog_description: this.state.blog_description,
            blog_url: this.state.blog_url,
            blog_image: this.state.blog_image
        };

        axios.put('http://localhost:4000/blogs/update', obj)
            .then(res => {
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div className='form-container'>
                <h3>Update Blog</h3>
                <div className='form-group'>
                    <label>Title: </label>
                    <input type='text' className='form-control' value={this.state.blog_title} onChange={this.onChangeBlogTitle} disabled={this.state.blog_disabled} />
                </div>
                <div className='form-group'>
                    <label>Author: </label>
                    <input type='text' className='form-control' value={this.state.blog_author} onChange={this.onChangeBlogAuthor} disabled={this.state.blog_disabled} />
                </div>
                <div className='form-group'>
                    <label>Description: </label>
                    <input type='text' className='form-control' value={this.state.blog_description} onChange={this.onChangeBlogDescription} disabled={this.state.blog_disabled} />
                </div>
                <div className='form-group'>
                    <label>Url: </label>
                    <input type='text' className='form-control' value={this.state.blog_url} onChange={this.onChangeBlogUrl} disabled={this.state.blog_disabled} />
                </div>
                <div className='form-group'>
                    <label>Image: </label>
                    <input type='text' className='form-control' value={this.state.blog_image} onChange={this.onChangeBlogImage} disabled={this.state.blog_disabled} />
                </div>
                <br />
                <div className='form-group'>
                    <input type='button' value='Edit Blog' className={this.state.blog_disabled ? "btn btn-primary mr-2 d-inline" : "d-none"} onClick={this.onEditBlog} />
                    <input type='button' value='Delete Blog' className={this.state.blog_disabled ? "btn btn-danger mr-2 d-inline" : "d-none"} onClick={this.onDeleteBlog} />
                    <input type='submit' value='Save Blog' className={this.state.blog_disabled ? "d-none" : "btn btn-success mr-2 d-inline"} onClick={this.onSubmitBlog} />
                </div>
            </div>
        )
    }
}
