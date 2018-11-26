import React, { Component } from 'react';

class Article extends Component {
  render() {
    return (
      <div>
        <p>User's Name</p>
        <p>Article</p>
        <button>Add a comment</button>
        <p>Comment count</p>
        <p>Comment 1</p>
        <p>Comment 2</p>
      </div>
    );
  }
}

export default Article;