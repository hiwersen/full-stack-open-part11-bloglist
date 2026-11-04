const login = async (page, { username, password }) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Log In' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${title}, ${author}`).waitFor()
}

const postBlog = async (request, blog, token) => {
  await request.post('/api/blogs', {
    data: blog,
    headers: { Authorization: `Bearer ${token}` },
  })
}

module.exports = { login, createBlog, postBlog }
