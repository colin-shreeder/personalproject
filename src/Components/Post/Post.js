import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Post extends Component {
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
                upvotes: post.upvotes
             });
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
        const {authorPicture, img, content, title, upvotes, username} = this.state;
        return (
            <div>
                <div className="topPost">
                    <br></br>
                    r/Community - Posted by {username}  <img src={authorPicture} alt="author"/>
                    <br></br>
                    <br></br>
                  Upvotes: {upvotes}
                  <br></br>
                  <button>Upvote</button>
                  <button>Downvote</button>
                  <br></br>
                    <h2>{title}</h2>
                    <br></br>
                    <img src={img}/>
                    <br></br>
                    <br></br>
                    {content}
                    
                </div>
                <br></br>
                <br></br>

                # of Comments
                <button>Share</button>
                <button>Bookmark</button>
                <button onClick={()=>{
            this.deleteById();}}>Delete</button>
                <Link to={`/edit/${id}`}><button>Edit</button></Link>
                <br></br>
                <br></br>
                Comment as username
                <br></br> 
                <input type='text' placeholder='What are your thoughts?'></input>
                <button>Comment</button>

            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Post);