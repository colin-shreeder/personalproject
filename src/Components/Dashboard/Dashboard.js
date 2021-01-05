import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Dashboard/Dashboard.css';
import downvote from "../Dashboard/downvote.png";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      view: '',
      search: "",
      community: '',
      communities: []
    };
  }

  resetSearch() {
    this.setState({
      search: "",
      userposts: true,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // componentDidMount() {
  //   this.getViewPosts();
  //   this.getAllCommunities();
  // }

  componentDidMount() {
    if (this.state.community === ''){
      this.getAllCommunities();
      this.getViewPosts();
    } else {
      // this.getCommunityPosts(this.state.community);
    }
  }

  getAllCommunities = () => {
    axios.get(`/api/getcommunities`).then((res) => {
      this.setState({
        communities: res.data,
      });
    });
  };

  getCommunityPosts = (e) => {
    e.preventDefault();
    axios.get(`/api/posts/${e.target.value}`).then((res) => {
      this.setState({
        posts: res.data
      });
    });
  };

  getViewPosts = async () => {
    const {view}=this.state;
    let posts = [];
    if (view === "LP"){
      await axios.get(`/api/bottomposts`).then((res) => {
        posts = res.data
      })
    } else if (view === "MP"){
      await axios.get(`/api/topposts`).then((res) => {
        posts = res.data
      })
    } else {
      await axios.get(`/api/posts`).then((res) => {
        posts = res.data
      })
    }
    this.setState ({
      posts: posts
    })
  }

  upVote = (id,upvotes) => {
    axios.put(`/api/upvote/${id}/${upvotes}`)
    .then((res)=> {
      console.log(res.data)
      this.getViewPosts();
    })
  };

  downVote = (id,upvotes) => {
    axios.put(`/api/downvote/${id}/${upvotes}`)
    .then((res)=> {
      console.log(res.data)
      this.getViewPosts();
    })
  };

  handleSubmit(e) {
    e.preventDefault();
  }

  getTopPosts = () => {
    this.setState ({
      view: 'MP'
    }, () => {
      this.getViewPosts()
    })
  };

  getBottomPosts = () => {
    this.setState ({
      view: 'LP'
    }, () => {
      this.getViewPosts()
    })
  };

  render() {
    const { community, posts } = this.state;
    let communityOptions = this.state.communities.map((e) => {
      return (
        <option value={e.id}> {e.name} </option>
      )
    })
    const displayPosts = posts.map((e) => {
      return (
        <div className='unknowntwo' key={e.id}>

          
          <div className='container'>
          
            <div className='upvotes'>
              
             
              <img onClick={() => this.upVote(e.id,e.upvotes)} src={downvote} alt="" height="25" width="25" className="rotateimg180" />
                
                <br></br>
              
              {e.upvotes}
                
                <br></br>
              
              <img onClick={() => this.downVote(e.id,e.upvotes)} src={downvote} alt="" height="25" width="25" className="downvote"  />
             
              
                <br></br>
            </div>



            <div className='postbody'>
              <div className='community'>
              r/{e.name} - Posted by {e.username}
              </div>
                
              <div className='title'>
                <Link to={`/post/${e.id}`}>
                  {e.title}
                </Link>
              </div>

                <div className='image'>
                <Link to={`/post/${e.id}`}>
                  <img src={e.img} width="750" height="auto" />
                </Link>
                </div>
                <br></br>
                <br></br>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="dashboard">
        
        <br></br>

        <Link to="/submit">
          {" "}
          <input
            placeholder="Create Post"
            type="text"
            onChange={(e) => this.handleChange(e)}
            name="search"
          />{" "}
        </Link>
        <Link to="/submit"><button>Upload Image</button></Link>
        <Link to="/submit"><button>Add Link</button></Link>

        <br></br>
        <br></br>

        <div className='communities'>
                
                SELECT COMMUNITY:  
                
                <select onChange={(e) => this.getCommunityPosts(e)}>
                
                <option selected value="home">
                  All
                </option>

                {communityOptions}
                
                </select>
              </div>

        
        <button type="button" onClick={() => this.getTopPosts()}> Most Popular </button>
        <button type="button" onClick={() => this.getBottomPosts()}> Least Popular </button>

        <br></br>
        <br></br>
        <br></br>

        {displayPosts}

      </div>
    );
  }
}

const mapStatetoProps = (state) => state;

export default connect(mapStatetoProps)(Dashboard);
