import React from 'react'
import { useUserValue, useBlogQuery } from '../hooks';
import { color, size, flex } from '../styles';

const BlogDetails = () => {
    const { blog, likeBlog, deleteBlog, userHasLiked } = useBlogQuery();
    const user = useUserValue();

    const style = {
      display: 'flex',
      justifyContent: 'end',
    }

    const info = {
      marginBottom: size.sz8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: size.sz6,
    }

    const author = {
      ...flex,
      color: color.c3,
      fontStyle: 'italic',
      fontSize: '1.3em',
      textShadow: `2px 2px 2px ${color.c1}`,
      marginBottom: size.sz2,
    }

      const likeBtn = () => {
        return (
          <input
            className={userHasLiked ? "" : "inputBtnInvert"}
            type="button"
            value="Like"
            onClick={() => likeBlog(blog)}
          />
        );
      };

      const deleteBtn = () => {
        const style = {
          display: blog.user?.username === user?.username ? "" : "none",
        };

        return (
          <input
            style={style}
            type="button"
            value="Delete"
            onClick={() => deleteBlog(blog)}
          />
        );
      };

    return (
        <div style={style}>
          <div style={info}>

            <div>
              <div style={author}>author: {blog.author}</div>
              <div>
                <a href="#" target="_blank">{blog.url}</a>
              </div>
            </div>

            <div data-testid="likes" style={flex}>
              <span>
                  <span>Likes </span>
                  <span data-testid="likes-count">{blog.likes.length}</span>
              </span>
              {likeBtn()}
            </div>

            <div style={flex}>
              <div>Added by: {blog.user?.name || "Anonymous"}</div>
              <div>{deleteBtn()}</div>
            </div>
          </div>

        </div>
    )
}

export default BlogDetails