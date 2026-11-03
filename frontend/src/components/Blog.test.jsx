import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "To be displayed",
    author: "Anonymous",
    url: "example.com",
    likes: 15,
  };

  let container, mockUpdateBlog;

  beforeEach(() => {
    mockUpdateBlog = vi.fn();
    container = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} />,
    ).container;
    // screen.debug()
  });

  test(".content-main renders by default", () => {
    const main = container.querySelector(".content-main");
    expect(main).toBeVisible();
    expect(main).toHaveTextContent(`${blog.title}, ${blog.author}`);
  });

  test(".content-details are not displayed by default", () => {
    const details = container.querySelector(".content-details");
    expect(details).not.toBeVisible();
  });

  test('.content-details are displayed after clicking "View" btn', async () => {
    const user = userEvent.setup();
    const viewBtn = screen.getByText("View");
    await user.click(viewBtn);

    const details = container.querySelector(".content-details");
    expect(details).toBeVisible();
    expect(details).toHaveTextContent(blog.url);
    expect(details).toHaveTextContent(blog.likes.toString());
  });

  test('updateBlog is called twice if the "Like" btn is clicked twice', async () => {
    const user = userEvent.setup();
    const likeBtn = screen.getByText("Like");
    await user.click(likeBtn);
    await user.click(likeBtn);
    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});
