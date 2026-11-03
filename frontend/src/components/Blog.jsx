import { useBlogQuery } from "../hooks";
import Subheading from "./Subheading";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments"
import { Navigate } from "react-router-dom";

const Blog = () => {
  const { blog } = useBlogQuery();

  if (!blog) return <Navigate to="/" replace />

  return (
    <section data-testid="blog">
      <Subheading text={blog.title} />
      <BlogDetails />
      <Comments />
    </section>
  );
};

export default Blog;
