import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostsByUserId } from '../../actions/index';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class PostMine extends Component {

  componentDidMount() {
    this.props.fetchPostsByUserId();
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  renderPostSummary(post) {
    return (
      <div key={post._id}>
        <h3>
          <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </h3>
        {this.renderTags(post.categories)}
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{post.authorName}</span>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <hr />
      </div>
    );
  }

  render() {
    return (
      <Container className="mt-5 pt-5">
        <Row className="justify-content-lg-center">
          <Form>
            <h3>My Blog Posts</h3>
          </Form>
          {_.map(this.props.posts, post => {
            return this.renderPostSummary(post);
          })}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPostsByUserId })(PostMine);
