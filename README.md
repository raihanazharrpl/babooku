# babooku
project schools

```markdown

╭─    ~/pr/app/javascript/task-school/babooku  on   main      ✔  took 14s  ─╮
╰─ tree --gitignore                                                                  ─╯
.
├── README.md
├── api
│   ├── bookLikes.js
│   ├── bookReviews.js
│   ├── books.js
│   ├── categories.js
│   ├── discounts.js                                                                    │   ├── generateKeywords.js
│   ├── index.js
│   ├── login.js
│   ├── publishers.js
│   ├── readme.md
│   ├── register.js
│   ├── tags.js
│   └── upload.js
├── app
│   ├── Commands
│   │   ├── makeApiVercel.js
│   │   ├── makeEnvExample.js
│   │   ├── makeMigration.js
│   │   ├── makeSecret.js
│   │   ├── makeSeeder.js
│   │   └── migrate.js                                                                  │   ├── Controllers
│   │   ├── index.controller.js
│   │   └── landing.controller.js
│   ├── Middlewares
│   └── Models
├── config
│   ├── app.js
│   ├── database.js
│   └── pagesUrl.js
├── database
│   ├── factories
│   │   └── bookFactory.js
│   ├── migrations
│   │   ├── mysql
│   │   │   ├── 20260809112651_create_users_table.sql
│   │   │   ├── 20260809112652_create_categories_table.sql                              │   │   │   ├── 20260809112654_create_subcategories_table.sql
│   │   │   ├── 20260809112655_create_books_table.sql
│   │   │   ├── 20260809112657_create_cart_items_table.sql
│   │   │   ├── 20260809112658_create_orders_table.sql
│   │   │   ├── 20260809112659_create_order_items_table.sql
│   │   │   ├── 20260825061932_create_notifications_table.sql
│   │   │   ├── 20260825061949_create_mail_table.sql
│   │   │   ├── 20260825073720_create_tags_table.sql
│   │   │   ├── 20260825083455_create_discounts_table.sql
│   │   │   ├── 20260825083516_create_book_likes_table.sql
│   │   │   ├── 20260825085421_create_book_reviews_table.sql
│   │   │   └── 20260825091440_create_publishers_table.sql
│   │   └── postgres
│   │       ├── 20260825010428_create_users_table.sql
│   │       ├── 20260825010445_create_categories_table.sql
│   │       ├── 20260825010505_create_subcategories_table.sql
│   │       ├── 20260825010609_create_orders_table.sql
│   │       ├── 20260825061932_create_notifications_table.sql
│   │       ├── 20260825061949_create_mail_table.sql
│   │       ├── 20260825073720_create_tags_table.sql
│   │       ├── 20260825091440_create_publishers_table.sql
│   │       ├── 20260825122247_create_books_table.sql
│   │       ├── 20260825122456_create_cart_items_table.sql
│   │       ├── 20260825122605_create_order_items_table.sql
│   │       ├── 20260825122730_create_discounts_table.sql
│   │       ├── 20260825122833_create_book_likes_table.sql
│   │       └── 20260825122917_create_book_reviews_table.sql
│   └── seeders
│       ├── BookSeeder.js
│       ├── CategorySeeder.js
│       ├── DatabaseSeeder.js                                                           │       ├── PublisherSeeder.js
│       ├── TagsSeeder.js
│       └── UsersSeeder.js
├── index.html
├── lang
├── logo-with-text.png
├── nodemon.json
├── package-lock.json
├── package.json
├── public
│   └── main.jsx
├── resources
│   ├── components                                                                      │   │   ├── Helper
│   │   │   └── ScrollToTop.jsx
│   │   └── Route
│   │       ├── GuestRoute.jsx
│   │       └── ProtectedRoute.jsx                                                      │   ├── css
│   │   └── style.css                                                                   │   ├── helpers
│   │   ├── assetsHelper.js                                                             │   │   ├── categoriesHelper.js
│   │   ├── dbHelper.js                                                                 │   │   ├── priceHelper.js
│   │   ├── searchingHelper.js                                                          │   │   └── uploadCoversHelper.js
│   ├── layouts
│   │   ├── AdminLayout.jsx
│   │   ├── AppLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── part
│   │       ├── FooterPrimary.jsx
│   │       ├── FooterSecondary.jsx
│   │       ├── NavbarAdmin.jsx
│   │       ├── NavbarBack.jsx
│   │       ├── NavbarPrimary.jsx
│   │       ├── NavbarSecondary.jsx
│   │       ├── SidebarAdmin.jsx
│   │       └── SidebarPrimary.jsx
│   ├── libs
│   │   ├── dbPool.js
│   │   └── uploadCover.js
│   ├── main.jsx
│   ├── pages
│   │   ├── AboutPage
│   │   │   └── index.jsx
│   │   ├── Auth
│   │   │   ├── LoginPage
│   │   │   │   └── index.jsx
│   │   │   └── RegisterPage
│   │   │       └── index.jsx
│   │   ├── BookDetailPage
│   │   │   └── index.jsx
│   │   ├── CartPage
│   │   │   └── index.jsx
│   │   ├── CheckoutPage
│   │   │   └── index.jsx
│   │   ├── ContactPage
│   │   │   └── index.jsx
│   │   ├── ErrorPage
│   │   │   └── index.jsx
│   │   ├── HomePage
│   │   │   └── index.jsx
│   │   ├── LandingPage
│   │   │   └── index.jsx
│   │   ├── ProfilePage
│   │   │   └── index.jsx
│   │   ├── StorePage
│   │   │   └── index.jsx
│   │   └── admin
│   │       ├── BannerPage
│   │       │   └── index.jsx
│   │       ├── CustomersPage
│   │       │   └── index.jsx
│   │       ├── DashboardPage
│   │       │   └── index.jsx
│   │       ├── MailPage
│   │       │   └── index.jsx
│   │       ├── NotificationPage
│   │       │   └── index.jsx
│   │       ├── OrdersPage
│   │       │   └── index.jsx
│   │       ├── ProfilePage
│   │       │   └── index.jsx                                                           │   │       ├── SettingPage
│   │       │   └── index.jsx                                                           │   │       ├── analytics
│   │       │   ├── SalesPage
│   │       │   │   └── index.jsx                                                       │   │       │   ├── StockPage
│   │       │   │   └── index.jsx
│   │       │   ├── SummaryPage
│   │       │   │   └── index.jsx
│   │       │   └── UsersPage
│   │       │       └── index.jsx
│   │       └── books
│   │           ├── CategoryPage
│   │           │   └── index.jsx
│   │           ├── ListPage
│   │           │   └── index.jsx
│   │           ├── PublisherPage
│   │           │   └── index.jsx
│   │           └── TagPage
│   │               └── index.jsx
│   ├── stores
│   │   └── useAuthStore.js
│   ├── tools
│   │   ├── create-user.js                                                              │   │   └── upload-cover.js                                                             │   └── utils                                                                           │       └── supabase.js
├── routes
│   ├── AdminRoutes.jsx
│   ├── AppRoutes.jsx
│   └── api
│       ├── bookLikes.js
│       ├── bookReviews.js
│       ├── books.js
│       ├── categories.js
│       ├── discounts.js
│       ├── generateKeywords.js
│       ├── landing.js
│       ├── login.js                                                                    │       ├── publishers.js
│       ├── register.js
│       ├── tags.js
│       └── upload.js
├── server.js
├── storage
│   ├── assets
│   │   ├── images
│   │   │   ├── ex.png
│   │   │   ├── statis
│   │   │   │   ├── hero-books.webp
│   │   │   │   ├── logo-only-500.png
│   │   │   │   ├── logo-with-text-non-proposional-500.png
│   │   │   │   ├── logo-with-text-proposional-1250.png
│   │   │   │   └── wallpaper-landing-page.jpg
│   │   │   └── uploads
│   │   │       └── covers
│   │   │           ├── categories
│   │   │           │   └── novels
│   │   │           │       └── ex.png
│   │   │           └── ex.png
│   │   └── videos
│   └── images
│       └── covers
│           ├── bumi-manusia.jpg
│           ├── cantik-itu-luka.jpg
│           ├── dikta-dan-hukum.jpg
│           ├── funiculi-funicula.jpg
│           ├── gadis-kretek.jpg
│           ├── home-sweet-loan.jpg
│           ├── hujan.jpg
│           ├── laskar-pelangi.jpg
│           ├── laut-bercerita.jpg
│           └── perahu-kertas.jpg
├── vercel.json
└── vite.config.js

74 directories, 157 files
```

pertama, aku mau memisahkan komponen komponen halaman jadi kecil, kamu tunggu instruksi dsri aku, jangan sok tau ya 