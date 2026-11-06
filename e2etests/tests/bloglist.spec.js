const { describe, test, expect, beforeEach } = require('@playwright/test')
const { login, createBlog, postBlog } = require('./helper')

describe('Blog App', () => {
  const user = {
    username: 'johnuser',
    password: 'secure_password',
    name: 'John User',
  }

  beforeEach(async ({ page, request }) => {
    // empty the db
    const response = await request.post('/api/testing/reset')
    expect(response.ok()).toBeTruthy()

    // create a user
    await request.post('/api/users', { data: user })

    // const usersResponse = await request.get('/api/users')
    // const blogsResponse = await request.get('/api/blogs')

    // const users = await usersResponse.json()
    // const blogs = await blogsResponse.json()

    // console.log('users in database before tests: ----------', users.length)
    // console.log('blogs in database before tests: ----------', blogs.length)

    await page.goto('/')
  })

  describe('Login', () => {
    test('Login form is shown by default', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, user)
      await expect(
        page.getByText(`Hi, ${user.name.split(' ')[0]}!`),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
    })

    test('fails with wrong username', async ({ page }) => {
      await login(page, { ...user, username: 'wrong_username' })
      await expect(page.getByText('invalid username')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Log out' }),
      ).not.toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await login(page, { ...user, password: 'wrong_password' })
      await expect(page.getByText('invalid password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Log out' }),
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    const otherUser = {
      username: 'otheruser',
      password: 'secure_password',
      name: 'Other User',
    }

    const blog = {
      title: 'A blog created by playwright',
      author: 'Playwright',
      url: 'playwright.dev',

      get createMessage() {
        return `a new blog "${this.title}" by ${this.author} added`
      },
      get likedMessage() {
        return `"${this.title}" liked`
      },
      get updateMessage() {
        return `"${this.title}" has been updated`
      },
      get deleteMessage() {
        return `blog "${blog.title}" has been deleted`
      },
      get dialogDeleteMessage() {
        return `Delete blog "${this.title}" by ${this.author}?`
      },
    }

    beforeEach(async ({ page }) => {
      await login(page, user)
      await createBlog(page, blog)
    })

    test('a new blog can be created', async ({ page }) => {
      const blogItem = page
        .getByRole('listitem')
        .filter({ hasText: blog.title })
        .filter({ hasText: blog.author })

      await expect(page.getByText(blog.createMessage)).toBeVisible()
      await expect(blogItem).toBeVisible()
    })

    test('the blog can be liked once', async ({ page }) => {
      await page.getByRole('link', { name: blog.title }).click()
      await expect(
        page.getByRole('heading', { name: blog.title }),
      ).toBeVisible()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText(blog.likedMessage)).toBeVisible()
      await expect(page.getByTestId('likes')).toContainText('Likes 1')

      await page.getByRole('button', { name: 'Like' }).click()
      await expect(
        page.getByText('You have already liked this blog!'),
      ).toBeVisible()
      await expect(page.getByTestId('likes')).toContainText('Likes 1')
    })

    test('the user who added the blog can delete it', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe(blog.dialogDeleteMessage)
        await dialog.accept()
      })
      await page.getByRole('link', { name: blog.title }).click()
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByText(blog.deleteMessage)).toBeVisible()
      await expect(page).not.toHaveURL(/\/blogs\//)
      const blogItem = page
        .getByRole('listitem')
        .filter({ hasText: blog.title })
        .filter({ hasText: blog.author })
      await expect(blogItem).toHaveCount(0)
    })

    test('the Delete button is not displayed to other user', async ({
      page,
      request,
    }) => {
      await page.getByRole('button', { name: 'Log out' }).click()
      await request.post('/api/users', { data: otherUser })
      await login(page, otherUser)

      await page.getByRole('link', { name: blog.title }).click()
      await expect(
        page.getByRole('heading', { name: blog.title }),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'Like' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0)
    })
  })
})
