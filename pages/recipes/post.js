import React from 'react';
import PropTypes from 'prop-types';
import getContentfulContent from '../../lib/getContentfulContent';
import BlogPost, { Post } from '../../components/BlogPost';
import Error from '../_error';

/** Dynamic page component to render blog posts */
const Blog = ({ blogPost, error }) => {
  if (blogPost) {
    return <BlogPost post={blogPost} />;
  }
  if (error === 'NOT_FOUND') {
    return <Error statusCode={404} />;
  }
  return <Error />;
};

Blog.getInitialProps = async ({ 'dish6' }) => {
  const { slug } = 'dish6';
  const props = await getContentfulContent('blogPost', slug);
  return props;
};

export default Blog;
