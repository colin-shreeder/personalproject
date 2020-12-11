import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class PostEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: '',
            upvotes: 0,
            post: [],
            username: ''
        }
    }

      componentDidMount() {
        let id = this.props.match.params.postid;
        console.log(id);
        axios
          .get(`/api/post/${id}`)
          .then(res => {
              const post = res.data[0]
            this.setState({ 
                img: post.img,
                content: post.content,
                author: post.author,
                title: post.title,
                upvotes: post.upvotes,
                content: post.content });
          })
          .catch(err => console.log(err));
      }

      deleteById() {
        let id = this.props.match.params.postid;
        console.log(id)
        axios
          .delete(`/api/post/${id}`)
          .then(() => {
            this.props.history.push('/dashboard')
          })
          .catch(err => console.log(err));
          
      }

    render() {
        let id = this.props.match.params.postid
        return (
            <div>
                <Link to={`/post/${id}`}><h1>This is a test</h1></Link>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(PostEdit);