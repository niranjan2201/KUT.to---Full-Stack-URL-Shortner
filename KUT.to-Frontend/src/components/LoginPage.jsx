import React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/api.js'
import { useStoreContext } from '../api/ContextApi.jsx'


const LoginPage = () => {

  const [loader, setLoader] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const context = useStoreContext()
  const { setToken, setUser } = context || {}

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const loginHandler = async (data) => {
    setLoader(true)

    try {
      const { data: response } = await api.post('/api/auth/public/login', data)
      console.log('Login response:', response); // Debug log

      setToken(response.token)

      // Use API user data or create fallback if not provided
      const userData = response.user || {
        email: data.email,
        username: response.username || data.email.split('@')[0]
      };
      setUser(userData)

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(userData))
      toast.success('Logged in successfully!')
      reset()
      navigate('/')

    } catch (err) {
      console.log(err)

      if (err.response?.status === 401) {
        toast.error('Invalid email or password')
      } else {
        toast.error(
          err.response?.data?.message || 'Login failed. Please try again.'
        )
      }

    } finally {
      setLoader(false)
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex bg-[#eeeeee36]"
    >

      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex w-1/2 relative overflow-hidden
        bg-gradient-to-r from-[#2e1947] to-[#512a33]"
      >

        {/* Glows */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px]
          bg-purple-500/30 rounded-full blur-[180px]" />
        <div className="absolute -bottom-48 -right-48 w-[620px] h-[620px]
          bg-rose-600/25 rounded-full blur-[200px]" />
        <div className="absolute inset-0
          bg-gradient-to-t from-black/10 via-transparent to-black/5" />

        <div className="flex flex-col justify-center px-16 text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold mb-6 leading-tight"
          >
            Shorten links.<br />Track smarter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg text-gray-200 max-w-md leading-relaxed"
          >
            KUT.to helps you turn long URLs into clean, shareable links
            with analytics and full control — fast, secure, and reliable.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-gray-300"
          >
            Built for students, creators & developers 🚀
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full max-w-md"
        >

          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl
            bg-gradient-to-r from-purple-500/40 to-indigo-500/40
            blur-[60px] opacity-40 -z-10" />

          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/80
            border border-white/20 rounded-2xl
            shadow-2xl p-8">

            <h2 className="text-2xl text-gray-900 mb-1">
              Welcome Back!
            </h2>

            <hr className="border-black/20 mb-6 mt-4" />

            <motion.form
              onSubmit={handleSubmit(loginHandler)}
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } }
              }}
            >

              {/* Email */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full px-4 py-3 rounded-lg
                    bg-white/70 backdrop-blur-md
                    border ${errors.email ? 'border-red-400' : 'border-gray-300'}
                    focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password with Show/Hide */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                    className={`w-full px-4 py-3 pr-12 rounded-lg
                      bg-white/70 backdrop-blur-md
                      border ${errors.password ? 'border-red-400' : 'border-gray-300'}
                      focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                      text-gray-600 hover:text-gray-900"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👀'}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loader}
                type="submit"
                className="mt-2 w-full py-3 rounded-lg
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  text-white font-semibold"
              >
                {loader ? 'Logging in...' : 'Login'}
              </motion.button>

            </motion.form>

            <p className="text-center text-sm text-gray-800 mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-purple-700 font-medium hover:underline">
                Create an Account
              </Link>
            </p>

          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoginPage
