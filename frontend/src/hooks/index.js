import { useContext, useRef, useState } from "react";
import NotificationContext from "../NotificationContext";
import UserContext from "../UserContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from '../services/blogs'
import loginService from '../services/login'
import usersService from '../services/users'
import { useNavigate, useMatch } from "react-router-dom";

export const useUserValue = () => {
    return useContext(UserContext).user[0]
}

export const useUserDispatch = () => {
    return useContext(UserContext).user[1]
}

export const useUserLoading = () => {
  return useContext(UserContext).loading
}

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useShowNotification = () => {
    const notification = useNotificationValue()
    const dispatch = useContext(NotificationContext)[1]

    return notificationToShow => {
        notification && clearTimeout(notification?.timeoutID)

        notificationToShow.timeoutID = setTimeout(() => {
        dispatch({ type: 'CLEAR' });
        }, 5000);

        dispatch({ type: 'SHOW', payload: notificationToShow });

    }
}

export const useUsersQuery = () => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: false,
  })

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  }
}

export const useBlogQuery = () => {
    const showNotification = useShowNotification();

    const blogsQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        select: blogs => [...blogs].sort((a, b) => b.likes.length - a.likes.length),
        retry: false,
      })

    const queryClient = useQueryClient();

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: updatedBlog => {
          queryClient.setQueryData(['blogs'], blogs => blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b));
          const message = `"${updatedBlog.title}" has been updated`;
          showNotification({ message: message, error: false });
        },
        onError: error => {
          const message = error.response?.data?.error || "error updating blog";
          showNotification({ message, error: true });
          console.error(error.message);
        }
    })

    const likeBlogMutation = useMutation({
      mutationFn: blogService.like,
      onSuccess: (likedBlog) => {
        queryClient.setQueryData(['blogs'], blogs => blogs.map(b => b.id === likedBlog.id ? likedBlog : b));
        const message = `"${likedBlog.title}" liked`;
        showNotification({ message: message, error: false });

        console.log(likedBlog)
      },
      onError: error => {
        const message = error.response?.data?.error || "error liking blog";
        showNotification({ message, error: true });
        console.error(error.message);
      }
  })

    const commentBlogMutation = useMutation({
      mutationFn: blogService.comment,
      onSuccess: (commentedBlog, comment) => {
        queryClient.setQueryData(['blogs'], blogs => blogs.map(b => b.id === commentedBlog.id ? commentedBlog : b));
        const message = `comment: "${comment.comment}" added to "${commentedBlog.title}"`;
        showNotification({ message: message, error: false });
      },
      onError: error => {
        const message = error.response?.data?.error || "error commenting blog";
        showNotification({ message, error: true });
        console.error(error.message);
      }
  })

    const deleteBlogMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: (_, deletedBlog) => {
        queryClient.setQueryData(['blogs'], blogs => blogs.filter(b => b.id !== deletedBlog.id));
        const message = `blog "${deletedBlog.title}" has been deleted`;
        showNotification({ message: message, error: false });
    },
    onError: (error, blog) => {
        const message = error.response?.data?.error || `error deleting blog: "${blog.title}"`;
        showNotification({ message, error: true });
    }
    });

    const updateBlog = (blogToUpdate) => {
      updateBlogMutation.mutate(blogToUpdate)
    };

    let userHasLiked;

    const useLikeBlog = () => {
      const user = useUserValue();
      userHasLiked = blog?.likes?.some(({ username }) => username === user.username);

      return (blogToLike) => {
        const message = `You have already liked this blog!`;
        if (userHasLiked) return showNotification({ message, error: true });

        likeBlogMutation.mutate(blogToLike)
      }
    }

    const commentBlog = (commentToAdd) => {
      commentBlogMutation.mutate(commentToAdd)
    };

    const deleteBlog = (blogToDelete) => {
    const ok = window.confirm(`Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`);
    if (!ok) return;

    deleteBlogMutation.mutate(blogToDelete)
    };

    const match = useMatch('/blogs/:id');
    const blogs = blogsQuery.data || []
    const blog = match && (blogs.find(({ id }) => match.params.id === id) || null)

    return {
        blog,
        blogs,
        isLoading: blogsQuery.isLoading,
        isError: blogsQuery.isError,
        updateBlog,
        likeBlog: useLikeBlog(),
        commentBlog,
        deleteBlog,
        userHasLiked,
    }
}

export const useAuth = () => {
    const showNotification = useShowNotification();
    const userDispatch = useUserDispatch();
    const navigate = useNavigate();

    const signup = async (userToSignup) => {
        try {
          const user = await usersService.post(userToSignup);

          if (user) {
            login({
              username: userToSignup.username,
              password: userToSignup.password,
            });
          }
        } catch (error) {
          const message = error.response.data.error || error.message;
          showNotification({ message, error: true });
        }
      };

      const login = async (userToLogin) => {
        try {
          const user = await loginService.login(userToLogin);
          window.localStorage.setItem("user", JSON.stringify(user));
          blogService.setToken(user.token);
          userDispatch({ type: 'SET', payload: user });
          navigate('/')
        } catch (error) {
          const message = error.response.data.error || error.message;
          showNotification({ message, error: true });
        }
      };

      const logout = () => {
        window.localStorage.removeItem("user");
        blogService.setToken(null);
        userDispatch({ type: 'CLEAR' });
      };

      return {
        signup,
        login,
        logout,
      }
}

export const useCreateBlog = () => {
  const showNotification = useShowNotification();
  const queryClient = useQueryClient();
  const toggleBlogFormRef = useRef();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: blog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      const message = `a new blog "${blog.title}" by ${blog.author} added`;
      showNotification({ message: message, error: false });
      toggleBlogFormRef.current.toggleVisibility();
    },
    onError: error => {
      const message = error.response?.data?.error || "error creating new blog";
      showNotification({ message, error: true });
    }
  });

  const createBlog = (blogToCreate) => {
    createBlogMutation.mutate(blogToCreate)
  };

  return { createBlog, toggleBlogFormRef }
}

export const useField = (name, type = "text") => {
  const [value, setValue] = useState('');

  class Attributes {
    constructor() {
      this.name = name;
      this.type = type;
      this.value = value;
      this.id = name;
      this["data-testid"] = name;
      this.onChange = ({ target: { value } }) => setValue(value)
    }

    set(value) {
      setValue(value)
    }

    reset() {
      setValue('')
    }
  }

  return new Attributes()

}