import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '1',
  title: 'To be displayed',
  author: 'Anonymous',
  url: 'example.com',
  likes: [{ username: 'alice' }, { username: 'bob' }],
  comments: [],
  user: { name: 'Root', username: 'root' },
}

const mocks = vi.hoisted(() => ({
  likeBlog: vi.fn(),
  deleteBlog: vi.fn(),
}))

vi.mock('../hooks', async (importOriginal) => ({
  ...(await importOriginal()),
  useBlogQuery: () => ({
    blog,
    likeBlog: mocks.likeBlog,
    deleteBlog: mocks.deleteBlog,
    commentBlog: mocks.commentBlog,
    hasUserLiked: false,
  }),
  useUserValue: () => ({ username: 'root' }),
}))

describe('<Blog />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<Blog />)
  })

  test('renders the blog title and details', () => {
    const section = screen.getByTestId('blog')
    expect(section).toBeVisible()

    const title = screen.getByTestId('blog-title')
    expect(title).toHaveTextContent(blog.title)

    const details = screen.getByTestId('blog-details')
    expect(details).toBeVisible()
    expect(details).toHaveTextContent(blog.author)
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent(blog.user.name)
    expect(screen.getByTestId('likes-count')).toHaveTextContent(/^2$/)
  })

  test('"Like" btn click calls likeBlog with the blog', async () => {
    const user = userEvent.setup()
    const likeBtn = screen.getByRole('button', { name: 'Like' })
    await user.click(likeBtn)

    expect(mocks.likeBlog).toHaveBeenCalledTimes(1)
    expect(mocks.likeBlog).toHaveBeenCalledWith(blog)
  })

  test('"Delete" btn click calls deleteBlog with the blog', async () => {
    const user = userEvent.setup()
    const deleteBtn = screen.getByRole('button', { name: 'Delete' })
    await user.click(deleteBtn)

    expect(mocks.deleteBlog).toHaveBeenCalledTimes(1)
    expect(mocks.deleteBlog).toHaveBeenCalledWith(blog)
  })
})
