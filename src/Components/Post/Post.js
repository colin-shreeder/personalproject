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
            username: '',
            comments: [],
            body: ''
        }
    }

      componentDidMount() {
        this.getPost();
        this.getComments();
      }

      getPost(){
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

      getComments() {
        let id = this.props.match.params.postid;
        console.log(id);
        axios.get(`/api/getcomments/${id}`).then((res) => {
        this.setState({
          comments: res.data,
        });
      });
    };

      deleteById() {
        let id = this.props.match.params.postid;
        console.log(id)
        axios
          .delete(`/api/post/${id}`)
          .then(() => {
            this.props.history.push('/dashboard')
          })
          .catch(err => console.log(err));
      };

      createComment(body) {
        console.log(this.state)
        console.log(body);
        let post_id = this.props.match.params.postid;
         axios
           .post(`/api/comment/`, {body, post_id})
           .then(res => {
             // console.log(res);
             this.setState({comments: res.data});
           })
           .then(() => {
             this.setState({
               redirect: true
             });
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
        this.componentDidMount();
      };
    
      downVote = (id,upvotes) => {
        axios.put(`/api/downvote/${id}/${upvotes}`)
        .then((res)=> {
          console.log(res.data)
          this.setState ({
            posts: res.data
          })
        })
        this.componentDidMount();
      };

      handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
      e.preventDefault()
    }

    render() {
        let id = this.props.match.params.postid;
        const {img, content, title, upvotes, username, body} = this.state;
        console.log(this.state.body)

        const displayComments = this.state.comments.map((e) => {
          return (
            <div className='unknowntwo' key={e.id}>

    
              
              <div className='containerthree'>

              <div className='upvotesthree'>
                <img src={downvote} alt="" height="25" width="25" class="rotateimg180" />

                <br></br>
              
                 0
                
                <br></br>
              
                  <img src={downvote} alt="" height="25" width="25" class="downvote"  />

              </div>
    
    
                <div className='postbodythree'>
                  <div className='communitytwo'>
                  Posted by author
                  </div>
                    
                  <div className='comment'>
                      {e.body}
                  </div>
    
                    <br></br>
                    <br></br>
                </div>
              </div>
            </div>
          );
        });

        
        return (
           <div className='dashboardtwo'> 
              <div className='containertwo'>
                <div className='upvotestwo'>
                  
                  <img onClick={() => this.upVote(id, upvotes)} src={downvote} alt="" height="25" width="25" class="rotateimg180" />
                  
                    <br></br>
              
                  {upvotes}
                
                    <br></br>
              
                  <img onClick={() => this.downVote(id, upvotes)} src={downvote} alt="" height="25" width="25" class="downvote"  />
             
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
                      <textarea name='body' className="commenttext" placeholder="What are your thoughts?" cols="50" rows="10" onChange={(e) => this.handleChange(e)}></textarea>
                    </div>

                    <div className='commentbutton'>
                      <button type="submit" onClick={(e)=>{
                        this.createComment(body);
                        this.handleSubmit(e)
                        this.componentDidMount();}}>Comment</button>
                    </div>
                    <br></br>
                    Comments
                    <br></br>
                    {displayComments}

                </div>
              </div>
          </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Post);