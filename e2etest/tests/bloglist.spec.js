const { describe, test, expect, beforeEach } = require('@playwright/test')
const { login, createBlog, postBlog } = require('./helper')

describe('Blog App', () => {

    const user = {
        username: 'johnuser',
        password: 'secure_password',
        name: 'John User'
    }

    beforeEach(async ({ page, request }) => {
        // empty the db
        await request.post('/api/tests/reset')

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
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
            await expect(page.getByText('LoginUsername:Password:Log inSign Up')).toBeVisible()
        })

        test('succeeds with correct credentials', async ({ page }) => {
            await login(page, user)
            await expect(page.getByText(`Blogs${user.name} logged-in`)).toBeVisible()
        })

        test('fails with wrong username', async ({ page }) => {
            user.username = 'wrong_username'
            await login(page, user)
            await expect(page.getByText('invalid username')).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Blogs' })).not.toBeVisible()
        })

        test('fails with wrong password', async ({ page }) => {
            user.password = 'wrong_password'
            await login(page, user)
            await expect(page.getByText('invalid password')).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Blogs' })).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        const otherUser = {
            username: 'otheruser',
            password: 'secure_password',
            name: 'Other User'
        }

        const blog = {
            title: 'A blog created by playwright',
            author: 'Playwright',
            url: 'playwright.dev',
            likes: 0,
            like(n = 1) {
                this.likes = this.likes + n
                return this
            },
            get createMessage() {
                return `a new blog "${this.title}" by ${this.author} added`
            },
            get updateMessage() {
                return `"${this.title}" has been updated`
            },
            get deleteMessage() {
                return `blog "${blog.title}" has been deleted`
            },
            get dialogDeleteMessage() {
                return `Delete blog "${this.title}" by ${this.author}?`
            }
        }

        beforeEach(async ({ page }) => {
            await login(page, user)
            await createBlog(page, blog)
        })

        test('a new blog can be created', async ({ page }) => {
            await expect(page.getByText(blog.createMessage)).toBeVisible()
            await expect(page.getByText(`${blog.title}, ${blog.author}`)).toBeVisible()
        })

        test('the blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'View' }).click()
            await page.getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText(blog.updateMessage)).toBeVisible()
            await expect(page.getByTestId('likes')).toContainText('Likes 1');
        })

        test('the user who added the blog can delete the blog', async ({ page }) => {
            page.on('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm')
                expect(dialog.message()).toBe(blog.dialogDeleteMessage)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'View' }).click()
            await page.getByRole('button', { name: 'Delete' }).click()
            await expect(page.getByText(blog.deleteMessage)).toBeVisible()
            await expect(page.getByText(`${blog.title}, ${blog.author}`)).not.toBeVisible()
        })

        test('the delete button is not shown to other user', async ({ page, request }) => {
            await page.getByRole('button', { name: 'Log out' }).click()
            await request.post('/api/users', { data: otherUser })
            await login(page, otherUser)
            const blogLocator = page.getByText(`${blog.title}, ${blog.author}`)
            await expect(blogLocator).toBeVisible()
            await blogLocator.locator('..').getByRole('button', { name: 'View' }).click()
            await expect(blogLocator.locator('../..').getByRole('button', { name: 'Delete' })).not.toBeVisible()
        })

        describe('and several blogs exist', () => {
            beforeEach(async ({ page, request }) => {
                await request.post('/api/users', { data: otherUser })
                const response = await request.post('/api/login', { data: otherUser })
                const { token } = await response.json()
                
                await postBlog(request, blog.like(), token)
                await postBlog(request, blog.like(), token)
                await postBlog(request, blog.like(), token)
                {
                    // const usersResponse = await request.get('/api/users')
                    // const blogsResponse = await request.get('/api/blogs')

                    // const users = await usersResponse.json()    
                    // const blogs = await blogsResponse.json()

                    // console.log('users in database before tests: ----------', users.length)
                    // console.log('users in database before tests: ----------', users)
                    // console.log('blogs in database before tests: ----------', blogs.length)
                    // console.log('blogs in database before tests: ----------', blogs)
                }

                await page.goto('/')
            })

            test('the blogs are arranged in descending order', async ({ page }) => {
                const likes = page.getByTestId('likes-count')
                const likesText = await likes.allTextContents()
                const pageOrder = likesText.map(t => Number(t))
                const sorted = [...pageOrder].sort((a, b) => b - a)
                await expect(likes).toHaveCount(4)
                expect(pageOrder).toEqual(sorted)
            })
        })
    })
})