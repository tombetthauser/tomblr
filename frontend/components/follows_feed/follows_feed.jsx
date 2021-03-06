import PostSearchCard from '../post_search_card/post_search_card_container';
import LogoutButton from '../logout_button/logout_button_container';
import BlogFormContainer from '../blogs_form/blog_form_container';
import SearchField from '../search_field/search_field_container';
import DemoButton from '../demo_user_button/demo_user_container';
import * as tomLibrary from '../../util/tom_library'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react';

const STOP_WORDS = tomLibrary.STOP_WORDS; 
const shuffle = tomLibrary.shuffle;

class FollowsFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      followedBlogIds: null,
      isLoaded: false,
      posts: null,
      searchTerm: "",
    }
    this.openModal = this.openModal.bind(this);
    this.followBlog = this.followBlog.bind(this);
    this.unFollowBlog = this.unFollowBlog.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchBlogs();
    this.state.isLoaded = true;
  }

  renderLogoutDemoButton() {
    // return this.props.currentUser ? <LogoutButton/> : <DemoButton/>;
    if (this.props.currentUser) {
      return (<LogoutButton />)
    } else {
      return (<DemoButton />)
    }
  }
  
  openModal() {
    document.querySelector(".new-blog-outer-div").style.display = "flex";
  }

  followBlog(blogId) {
    this.props.createFollow({
      follower_id: this.props.currentUser ? this.props.currentUser.id : null,
      followed_blog_id: blogId,
    })
  }
  
  unFollowBlog(blogId) {
    if (this.state.followedBlogIds) {
      this.state.followedBlogIds[blogId].forEach(followId => {
        this.props.deleteFollow(followId).then(
        );
      })
    }
  }

  setBlogIdHash() {
    if (this.props.currentUser) {
      if (this.state.followedBlogIds === null) {
        this.state.followedBlogIds = {};
        let tempFollows = this.props.currentUser.follows.filter(follow => (
          follow.follower_id === this.props.currentUser.id
        ))
        tempFollows.forEach(follow => {
          if (this.state.followedBlogIds[follow.followed_blog_id] === undefined) {
            this.state.followedBlogIds[follow.followed_blog_id] = [];
          }
          this.state.followedBlogIds[follow.followed_blog_id].push(follow.id);
        });
      }
    }
  }

  render() {
    if (!this.props.currentUser) {
      this.props.history.push('/search')
    }
    
    this.setBlogIdHash();

    let searchTerm = this.props.searchTerm ? this.props.searchTerm : "";
    
    let FILTERED_POSTS = this.props.posts.filter(post => (
      this.props.currentUser && this.props.currentUser.follows.map(follow => follow.followed_blog_id).includes(post.blog_id) && post.author.id !== this.props.currentUser.id
    ));

    this.state.posts = (
      FILTERED_POSTS.map(post => {
        if (this.props.currentUser.follows.map(follow => follow.followed_blog_id).includes(post.blog_id) && post.author.id !== this.props.currentUser.id) {
          return (
            <PostSearchCard
              post={post}
              blog={this.props.blogs[post.blog_id]}
              followBlog={this.followBlog}
              unFollowBlog={this.unFollowBlog}
            />
          )
        }
      })
    )

    FILTERED_POSTS = this.state.posts;

    const isSingleColumn = FILTERED_POSTS.length < 5;
    let newPostForm = null;

    const ALL_USERS = shuffle(this.props.posts).map(post => {
      return `${post.author.username.toUpperCase()}`;
    });

    const RELATED_WORDS = [];
    const SHUFFLED_POSTS = shuffle(this.props.posts);

    for (let i = 0; i < SHUFFLED_POSTS.length; i++) {
      let words = SHUFFLED_POSTS[i].text.split(" ");
      for (let j = 0; j < words.length; j++) {
        let word = words[j].toLowerCase();
        if (
            !STOP_WORDS.includes(word) && 
            !RELATED_WORDS.includes(word) &&
            word !== searchTerm.toLowerCase() &&
            word.length <= 8 &&
            word.length >= 3 &&
            !word.includes(",") &&
            !word.includes(".") &&
            !word.includes("!") &&
            !word.includes("_") &&
            !word.includes("0") &&
            !word.includes("1") &&
            !word.includes("2") &&
            !word.includes("3") &&
            !word.includes("4") &&
            !word.includes("5") &&
            !word.includes("6") &&
            !word.includes("7") &&
            !word.includes("8") &&
            !word.includes("9") &&
            !word.includes("#") &&
            !word.includes("@") &&
            !word.includes("?")
          ) {
          RELATED_WORDS.push(word)
          if (RELATED_WORDS.length >= 3) { break; }
        }
      }
      if (RELATED_WORDS.length >= 3) { break; }
    }

    const SELECT_USERS = [];

    ALL_USERS.forEach(user => {
      if (!SELECT_USERS.includes(user)) {
        SELECT_USERS.push(user)
      }
    })

    const columnUlWidth = isSingleColumn ? 300 : 1260;
    const columnUlCount = isSingleColumn ? 1 : 4;

    const thatsAllMessage = () => {
      if (FILTERED_POSTS.length < 1) {
        return `Sorry! No posts for "${searchTerm}" yet ;(`
      } else {
        return [
          "That's all for now! :3",
          "That's all we got! :)",
          "That's it for now! :p",
          "That's all folks! :0",
        ][Math.floor(Math.random() * 4)]
      }
    }

    const rickRoll = () => {
      if (FILTERED_POSTS.length < 1) {
        return (<div className="rick-roll-div"></div>)
      }
    }

    let newBlogButton;

    if (this.props.currentUser) {
      newBlogButton = <BlogFormContainer />;
    }
    
    let defaultHeaderText = "YOUR FEED";

    return (
      <div>
          {newBlogButton}
          {newPostForm}
          {this.renderLogoutDemoButton()}
          <SearchField />
          
          <div className="search-header-div"></div>

          <div className="search-header-links-div">
            <ul className="search-header-links-ul">
              <li>Search Users:</li>
              { SELECT_USERS.slice(0, 5).map( user => {
                return(<li><Link className="post-search-header-li-links" to={`/search/${user}`}>{user.toLowerCase()}</Link></li>)
              })}
            </ul>
            <ul className="search-header-links-ul-right">
              <ul className="your-blogs-ul">
                { this.props.currentUser && Object.values(this.props.blogs).filter(blog => blog.user.id === this.props.currentUser.id).length > 0 ? (<li>Your Blogs:</li>) : null}
                { this.props.currentUser ? Object.values(this.props.blogs).filter(blog => blog.user.id === this.props.currentUser.id).map(blog => {
                  let nameArr = blog.title.toLowerCase().split(" ").filter(word =>
                    !STOP_WORDS.includes(word)
                    && !word.toLowerCase().includes(this.props.currentUser.username.toLowerCase())
                    && !word.toLowerCase().includes("blog")
                  );

                  let name = nameArr.length > 0 ? nameArr.slice(-1)[0] : `No.${blog.id}`;

                  return (<li><Link className="post-search-header-li-links" to={`/blogs/${blog.id}`}>{name}</Link></li>)
                }) : null}
              </ul>
            {this.props.currentUser ? (<li><a className="create-new-blog-button" onClick={() => this.props.history.push('/')}>Recent Posts</a></li>) : null}
              { this.props.currentUser ? (<li><a className="create-new-blog-button" onClick={this.openModal} >Create a New Blog</a></li>) : null }
              { this.props.currentUser ? null : (<li><Link to="/login">Login</Link></li>) }
              { this.props.currentUser ? null : (<li><Link to="/signup">Sign Up</Link></li>) }
            </ul>
          </div>

          <div className="search-header-searchterms-div">
          <h3 className="search-header-searchterms-title">{ searchTerm === "" ? defaultHeaderText : searchTerm.toUpperCase() }</h3>
          <span className="feed-sub-header-text">Recent Posts from your Followed Blogs</span>
          </div>

          <div className="search-ul-constrictor">
            <ul className={`search-post-ul ${ isSingleColumn ? null : "search-post-ul-fourcolumns"}`} style={{ width: columnUlWidth, columnCount: columnUlCount }}>
              { this.state.posts }
              { this.state.isLoaded ? rickRoll() : null }
            </ul>
          </div>

        <span className="posts-search-thatsall-text">{`${ this.state.isLoaded ? thatsAllMessage() : null }`}</span>
      </div>
    )
  }
}

export default withRouter(FollowsFeed);