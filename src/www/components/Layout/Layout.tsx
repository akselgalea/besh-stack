import { type User } from '@/types'
import { type PropsWithChildren } from '@kitajs/html'

const Layout = ({ title, user, currentUrl, children }: PropsWithChildren<{ title: string, currentUrl: string, user?: User }>) => {
  const active = ' bg-blue-100 text-blue-500'

  console.log(user)

  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bun todo - { title }</title>

      <script src="/public/js/htmx.min.js"></script>
      <script src="/public/js/unocss-runtime.js"></script>
      <link rel="stylesheet" href="/public/css/unocss-tailwind.min.css"></link>
      <link rel="stylesheet" href="/public/css/styles.css"></link>
    </head>
    <body class="min-h-screen max-w-[1280px] mx-auto">
      <header>
        <nav class="grid grid-cols-2">
          <div class="flex justify-start items-center [&>a]:py-2 [&>a]:px-6">
            <a href="/" class={ 'font-semibold hover:bg-blue-100 hover:text-blue-500' + (currentUrl === '/' ? active : '')}>Home</a>
          </div>

          <div class="flex justify-end items-center [&>a]:py-2 [&>a]:px-6">
          {
            user ?
            <>
              <a href="/logout" class={ 'font-semibold hover:bg-blue-100 hover:text-blue-500' + (currentUrl === '/logout' ? active : '')}>Logout</a>
              <p>{user.name}</p>
            </>
            :
            <>
              <a href="/login" class={ 'font-semibold hover:bg-blue-100 hover:text-blue-500' + (currentUrl === '/login' ? active : '')}>Log in</a>
              <a href="/register" class={ 'font-semibold hover:bg-blue-100 hover:text-blue-500' + (currentUrl === '/register' ? active : '')}>Register</a>
            </>
          }
          </div>
        </nav>
      </header>

      <main class="px-6 py-4">
        { children }
      </main>

      <footer class="text-center">@devmafia 2024</footer>
    </body>
    </html>
  )
}

export default Layout