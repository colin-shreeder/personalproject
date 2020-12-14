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

      editById(title, content) {
        let id = this.props.match.params.postid;
        console.log(id, title, content)
        axios
          .put(`/api/edit/${id}`, { title, content})
          .then(res => {
            console.log(res.data);
            this.setState({ posts: res.data });
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

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(e){
      e.preventDefault()
    }

    render() {
        let id = this.props.match.params.postid
        const {authorPicture, img, content, title, upvotes, username} = this.state;
        return (
            <div>
                <Link to={`/post/${id}`}><h1>This is a test</h1></Link>

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
                  <br></br>
                  <h1>Edit Post</h1>
                  <br></br>
                  <br></br>
                  Title:
                  <br></br>
                    <input type="text" placeholder="Title" defaultValue={title} onChange={(e) => this.handleChange(e)} name="title"/>
                    <br></br>
                    <br></br>
                    <img src={img}/>
                    <br></br>
                    <br></br>
                    Text (optional):
                    <br></br>
                    <input type="text" placeholder="Text (optional)" defaultValue={content} onChange={(e) => this.handleChange(e)} name="content"/>
                    
                </div>
                <br></br>
                <br></br>

                # of Comments
                <button>Share</button>
                <button>Bookmark</button>
                <button onClick={()=>{
            this.deleteById();}}>Delete</button>
                <Link to={`/post/${id}`}><button>Cancel</button>
                </Link>
                
                <Link to={`/post/${id}`}>
                    <button onClick={() => this.editById(this.state.title, this.state.content)}>Save
                    </button>
                    </Link>

                <br></br>
                <br></br>
                Comment as username
                <br></br> 
                <input type='text' placeholder='What are your thoughts?'></input>
                <button>Comment</button>

            </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(PostEdit);