import React from "react";
import { useBlogQuery, useField } from "../hooks";
import { flex, listStyle, size, color } from "../styles";

const Comments = () => {
  const { blog, commentBlog } = useBlogQuery();
  const comment = useField("comment");

  const handleAddComment = () => {
    commentBlog({
      comment: comment.value,
      id: blog.id,
    });
    comment.reset();
  };

  const form = {
    ...flex,
    width: "100%",
    marginBottom: size.sz5,
  };

  const input = {
    flex: 1,
    margin: 0,
  };

  const btn = {
    padding: `${size.sz3} 0`,
  };

  return (
    <div>
      <h3>Comments</h3>
      <form style={form}>
        <input {...comment} style={input} />
        <input
          className="inputBtnInvert"
          style={btn}
          type="button"
          value="Comment"
          onClick={handleAddComment}
        />
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li style={listStyle} key={i}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
