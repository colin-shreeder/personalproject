import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      search: "",
      userposts: true,
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

  componentDidMount() {
    this.getAllPosts();
  }

  getPosts = (id, search, userposts, upvotes) => {
    if (this.userposts === true) {
      this.getUserPosts(id, search, userposts, upvotes);
    } else {
      this.getAllPosts();
    }
  };

  getAllPosts = () => {
    axios.get(`/api/posts`).then((res) => {
      this.setState({
        posts: res.data,
      });
    });
  };

  getUserPosts(id, search, userposts) {
    axios
      .post(`/api/posts/${id}`, {
        search: search,
        userposts: userposts,
      })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.log(err));
  }

  toggleCheck = (e) => {
    this.setState({
      userposts: e.target.checked,
    });
  };

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

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    const displayPosts = posts.map((e) => {
      return (
        <div key={e.id}>
          <div>
            {console.log(e)}
            r/Community - Posted by {e.username}
            <br></br>
            Upvotes: {e.upvotes}
            <br></br>
            <button onClick={() => this.upVote(e.id,e.upvotes)}>Upvote</button>
            <button onClick={() => this.downVote(e.id,e.upvotes)}>Downvote</button>
            <br></br>
            <Link to={`/post/${e.id}`}>
              {e.title}
              <br></br>
              <img src={e.img} />
            </Link>
            <br></br>
            <br></br>
          </div>
        </div>
      );
    });

    return (
      <div className="Dashboard">
        
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

        <input
          onClick={(e) => {
            this.toggleCheck(e);
            this.getPosts();
          }}
          type="checkbox"
          id="userposts"
          name="userposts"
          defaultChecked
        ></input>
        <label for="userposts"> My Posts</label>

        <br></br>
        <br></br>

        <button type="button"> New </button>
        <button type="button"> Old </button>
        <button type="button"> Top </button>
        <button type="button"> Bottom </button>

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
