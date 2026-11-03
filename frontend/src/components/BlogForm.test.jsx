import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";

describe("<BlogForm />", () => {
  let container, createBlog;

  beforeEach(() => {
    createBlog = vi.fn();
    container = render(<BlogForm createBlog={createBlog} />).container;
    // screen.debug()
  });

  test("createBlog is called with the right form field values", async () => {
    const blog = {
      title: "Hello, World!",
      author: "Anonymous",
      url: "example.com",
    };

    const user = userEvent.setup();
    const title = container.querySelector("#title");
    const author = container.querySelector("#author");
    const url = container.querySelector("#url");
    const createBtn = screen.getByText("Create");

    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);
    await user.click(createBtn);
    // console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
  });
});
