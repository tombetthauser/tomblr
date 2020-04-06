import * as tomLibrary from '../../util/tom_library'
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// import SearchField from '../search_field/search_field_container';
// import DemoButton from '../demo_user_button/demo_user_container';
// import LogoutButton from '../logout_button/logout_button_container';
// import BlogFormContainer from '../blogs_form/blog_form_container';
// import PostSearchCard from '../post_search_card';


// const shuffle = tomLibrary.shuffle;
// const STOP_WORDS = tomLibrary.STOP_WORDS;
const AVATARS = tomLibrary.AVATARS; 

class PostSearchCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFollowed: null,
      followText: null,
  //     isLoaded: false,
  //     followedBlogIds: [],
    }
  //   this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    // this.props.fetchPosts();
    // this.props.fetchBlogs();
    // this.state.isLoaded = true;
    this.state.isFollowed = false;
    this.state.followText = "Follow";
  }

  // renderLogoutDemoButton() {
  //   if (this.props.currentUser) {
  //     return (<LogoutButton/>)
  //   } else {
  //     return (<DemoButton/>)
  //   }
  // }
  
  // openModal() {
  //   document.querySelector(".new-blog-outer-div").style.display = "flex";
  // }

  followClick(blogId) {
    if (this.state.isFollowed) {
      this.props.unFollowBlog(this.props.blog.id);
      this.state.isFollowed = false;
      this.setState({ followText: "Follow" })
    } else {
      this.props.followBlog(this.props.blog.id);
      this.state.isFollowed = true;
      this.setState({ followText: "Unfollow" })
      // });    
    }
  }

  followText(blogId) {
    if (this.props.currentUser) {
      let followedBlogIds = this.props.currentUser.follows.map(follow => follow.followed_blog_id);
      if (followedBlogIds.includes(blogId)) {
        return 'Unfollow';
      } else {
        return 'Follow';
      }
    } else {
      return null;
    }
  }

  render() {
    
  //   if (this.props.currentUser) {
  //     this.state.followedBlogIds = this.props.follows.filter(follow => (
  //       follow.follower_id === this.props.currentUser.id
  //     )).map(follow => follow.followed_blog_id);
  //   }

  //   let searchTerm = this.props.searchTerm ? this.props.searchTerm : "";

  //   const FILTERED_POSTS = this.props.posts.filter(post => (
  //     post.text.toUpperCase().includes(searchTerm.toUpperCase()) ||
  //     post.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
  //     post.author.username.toUpperCase().includes(searchTerm.toUpperCase())
  //   ));

  //   const isSingleColumn = FILTERED_POSTS.length < 5;
  //   let newPostForm = null;

  //   const ALL_USERS = shuffle(this.props.posts).map(post => {
  //     return `${post.author.username.toUpperCase()}`;
  //   });

  //   const RELATED_WORDS = [];
  //   const SHUFFLED_POSTS = shuffle(this.props.posts);

  //   for (let i = 0; i < SHUFFLED_POSTS.length; i++) {
  //     let words = SHUFFLED_POSTS[i].text.split(" ");
  //     for (let j = 0; j < words.length; j++) {
  //       let word = words[j].toLowerCase();
  //       if (
  //           !STOP_WORDS.includes(word) && 
  //           !RELATED_WORDS.includes(word) &&
  //           word !== searchTerm.toLowerCase() &&
  //           word.length <= 8 &&
  //           word.length >= 3 &&
  //           !word.includes(",") &&
  //           !word.includes(".") &&
  //           !word.includes("!") &&
  //           !word.includes("_") &&
  //           !word.includes("0") &&
  //           !word.includes("1") &&
  //           !word.includes("2") &&
  //           !word.includes("3") &&
  //           !word.includes("4") &&
  //           !word.includes("5") &&
  //           !word.includes("6") &&
  //           !word.includes("7") &&
  //           !word.includes("8") &&
  //           !word.includes("9") &&
  //           !word.includes("#") &&
  //           !word.includes("@") &&
  //           !word.includes("?")
  //         ) {
  //         RELATED_WORDS.push(word)
  //         if (RELATED_WORDS.length >= 3) { break; }
  //       }
  //     }
  //     if (RELATED_WORDS.length >= 3) { break; }
  //   }

  //   const SELECT_USERS = [];

  //   ALL_USERS.forEach(user => {
  //     if (!SELECT_USERS.includes(user)) {
  //       SELECT_USERS.push(user)
  //     }
  //   })

  //   const columnUlWidth = isSingleColumn ? 300 : 1260;
  //   const columnUlCount = isSingleColumn ? 1 : 4;

  //   const thatsAllMessage = () => {
  //     if (FILTERED_POSTS.length < 1) {
  //       return `Sorry! No posts for "${searchTerm}" yet ;(`
  //     } else {
  //       return [
  //         "That's all folks! :0",
  //         "That's it for now! :p",
  //         "That's all for now! :3",
  //         "That's all we got! :)",
  //       ][Math.floor(Math.random() * 4)]
  //     }
  //   }

  //   const rickRoll = () => {
  //     if (FILTERED_POSTS.length < 1) {
  //       return (<div className="rick-roll-div"></div>)
  //     }
  //   }

  //   let newBlogButton;

  //   if (this.props.currentUser) {
  //     newBlogButton = <BlogFormContainer />;
  //   }
    
  //   let defaultHeaderText = this.props.currentUser ? "YOUR FEED" : "RECENT POSTS";

    return (
      // <div>
      //   <p>{ this.props.post.title }</p>
      //   <p>{ this.props.blog.title }</p>
      // </div>

      <li className="search-post-li">
        {/* <PostSearchCard post={post} blog={this.props.blog.title} /> */}
        <div className="search-search-post-header-div">
          <Link to={`/blogs/${this.props.post.blog_id}`}>
            <div className="search-profile-user-image" style={{ backgroundImage: `url("${AVATARS[(this.props.post.blog_id) % AVATARS.length]}")` }} alt=""></div>
          </Link>
          <Link to={`/blogs/${this.props.post.blog_id}`}>
            <h3 className="search-post-h3">{this.props.blog.title.length > 25 ? (this.props.blog.title.slice(0, 25) + "...") : this.props.blog.title}</h3>
          </Link>
          <span className="search-follow-span" onClick={() => this.followClick(this.props.post.blog_id)}>{ this.state.followText }</span>
        </div>
        <Link to={`/blogs/${this.props.post.blog_id}`}>
          <img className="search-image" src={this.props.post.photoUrl ? this.props.post.photoUrl : this.props.post.pic_url} alt="" />
        </Link>
        <div className="search-post-bottom-div">
          <h4 className="search-post-h4">{this.props.post.title}</h4>
          <p className="search-post-p">{this.props.post.text}</p>
          <p className="search-post-author">posted by
                            <Link to={`/search/${this.props.post.author.username}`}>
              <span className="search-post-author-link">
                {" " + this.props.post.author.username}
              </span>
            </Link>
          </p>
        </div>
      </li>






      // <div>
      //     {newBlogButton}
      //     {this.renderLogoutDemoButton()}
      //     {newPostForm}
      //     <SearchField />
      //     <div className="search-header-div">
      //     </div>
      //     <div className="search-header-links-div">
      //       <ul className="search-header-links-ul">
      //         <li>Search Users:</li>
      //         { SELECT_USERS.slice(0, 5).map( user => {
      //           return(<li><Link className="post-search-header-li-links" to={`/search/${user}`}>{user.toLowerCase()}</Link></li>)
      //         })}
      //       </ul>
      //       <ul className="search-header-links-ul-right">
      //         <ul className="your-blogs-ul">
      //           { this.props.currentUser && Object.values(this.props.blogs).filter(blog => blog.user.id === this.props.currentUser.id).length > 0 ? (<li>Your Blogs:</li>) : null}
      //           { this.props.currentUser ? Object.values(this.props.blogs).filter(blog => blog.user.id === this.props.currentUser.id).map(blog => {
      //             let nameArr = blog.title.toLowerCase().split(" ").filter(word =>
      //               !STOP_WORDS.includes(word)
      //               && !word.toLowerCase().includes(this.props.currentUser.username.toLowerCase())
      //               && !word.toLowerCase().includes("blog")
      //             );

      //             let name = nameArr.length > 0 ? nameArr.slice(-1)[0] : `No.${blog.id}`;

      //             return (<li><Link className="post-search-header-li-links" to={`/blogs/${blog.id}`}>{name}</Link></li>)
      //           }) : null}
      //         </ul>
      //         { this.props.currentUser ? (<li><a className="create-new-blog-button" onClick={this.openModal} >Create a New Blog!</a></li>) : null }
      //         { this.props.currentUser ? null : (<li><Link to="/login">Login</Link></li>) }
      //         { this.props.currentUser ? null : (<li><Link to="/signup">Sign Up</Link></li>) }
      //       </ul>
      //     </div>
      //     <div className="search-header-searchterms-div">
      //     <h3 class="search-header-searchterms-title">{ searchTerm === "" ? defaultHeaderText : searchTerm.toUpperCase() }</h3>
      //       <span class="search-header-searchterms-related">other searches:</span>
      //       <ul class="search-header-searchterms-ul">
      //         {RELATED_WORDS.map( word => {
      //           return(<li><Link to={`/search/${word}`}>{word}</Link></li>)
      //         })}
      //       </ul>
      //     </div>
      //     <div className="search-ul-constrictor">
      //       <ul className={`search-post-ul ${ isSingleColumn ? null : "search-post-ul-fourcolumns"}`} style={{ width: columnUlWidth, columnCount: columnUlCount }}>
      //         <PostSearchCard />
      //         {FILTERED_POSTS.map(post => {
      //               return (
      //                 <li className="search-post-li">
      //                   <div className="search-search-post-header-div">
      //                     <Link to={`/blogs/${post.blog_id}`}>
      //                       <div className="search-profile-user-image" style={{ backgroundImage: `url("${AVATARS[(post.blog_id) % AVATARS.length]}")`}} alt=""></div>
      //                     </Link>
      //                     <Link to={`/blogs/${post.blog_id}`}>
      //                       <h3 className="search-post-h3">{this.props.blogs[post.blog_id].title.length > 25 ? (this.props.blogs[post.blog_id].title.slice(0, 25) + "...") : this.props.blogs[post.blog_id].title }</h3>
      //                     </Link>
      //                     <span className="search-follow-span" onClick={() => this.followClick(post.blog_id)}>{ this.followText(post.blog_id) }</span>
      //                   </div>
      //                   <Link to={`/blogs/${post.blog_id}`}>
      //                     <img className="search-image" src={ post.photoUrl ? post.photoUrl : post.pic_url } alt=""/>
      //                   </Link>
      //                   <div className="search-post-bottom-div">
      //                     <h4 className="search-post-h4">{post.title}</h4>
      //                     <p className="search-post-p">{post.text}</p>
      //                     <p className="search-post-author">posted by 
      //                       <Link to={`/search/${post.author.username}`}>
      //                         <span className="search-post-author-link">
      //                           {" " + post.author.username}
      //                         </span>
      //                       </Link>
      //                     </p>
      //                   </div>
      //                 </li>
      //               )
      //         }).reverse()}
      //         { this.state.isLoaded ? rickRoll() : null }
      //       </ul>
      //     </div>
      //   <span className="posts-search-thatsall-text">{`${ this.state.isLoaded ? thatsAllMessage() : null }`}</span>
      // </div>
    )
  }
}

export default withRouter(PostSearchCard);