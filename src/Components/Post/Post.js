import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../Post/Post.css';
import downvote from "../Post/downvote.png";


class Post extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
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
              let post = res.data[0]
              console.log(post)
            this.setState({ 
                img: post.img,
                content: post.content,
                username: post.username,
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

      upVote = (id,upvotes) => {
        axios.put(`/api/upvote/${id}/${upvotes}`)
        .then((res)=> {
          console.log(res.data)
          this.setState ({
            posts: res.data
          })
        })
      };
    
      downVote = (id,upvotes) => {
        axios.put(`/api/downvote/${id}/${upvotes}`)
        .then((res)=> {
          console.log(res.data)
          this.setState ({
            posts: res.data
          })
        })
      };

    render() {
        let id = this.props.match.params.postid
        const {img, content, title, upvotes, username} = this.state;
        return (
           <div className='dashboardtwo'> 
              <div className='containertwo'>
                <div className='upvotestwo'>
                  
                  <img onClick={() => this.upVote(id,upvotes)} src={downvote} alt="" height="25" width="25" class="rotateimg180" />
                  
                    <br></br>
              
                  {upvotes}
                
                    <br></br>
              
                  <img onClick={() => this.downVote(id,upvotes)} src={downvote} alt="" height="25" width="25" class="downvote"  />
             
                    <br></br>
                </div>
                  
                <div className='postbodytwo'>
                    
                    <div className="communitytwo">
                        r/Community - Posted by {username}
                    </div>
                    
                    <div className='posttitle'>
                        {title}
                    </div>

                    <div className='postcontent'>
                        {content}
                    </div>
                  
                    <div className='postimage'>
                        <img src={img}  width="900" height="auto"/>
                    </div>
                       
                      
            

                    <div className='options'>
                          # of Comments
                          <button>Share</button>
                          <button>Bookmark</button>
                          <button onClick={()=>{
                      this.deleteById();}}>Delete</button>
                          <Link to={`/edit/${id}`}><button>Edit</button></Link>
                    </div>

                      <br></br>

                    <div className='commentheading'>
                      Comment as username
                    </div>

                    <div className='commentinput'>
                      <textarea className="commenttext" placeholder="What are your thoughts?" cols="50" rows="10"></textarea>
                    </div>
                    <div className='commentbutton'>
                      <button>Comment</button>
                    </div>

                </div>
              </div>

              <div className='communityinfo'>
                    Community Info
              </div>
          </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Post);