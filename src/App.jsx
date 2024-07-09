import './style.scss'
import { createBrowserRouter,  Outlet,RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Category from './pages/Category'
import OrderDetails from './pages/OrderDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import UserInfo from './userinfo/UserInfo'
import OrderHistory from './userinfo/OrderHistory'
import TopupHistory from './userinfo/TopupHistory'
import ChangePassword from './userinfo/ChangePassword'
import AdminDashboard from './adminCom/AdminDashboard'
import AdminOrder from './adminCom/AdminOrder'
import AdminProduct from './adminCom/AdminProduct';
import Test from './adminCom/Test'
import Slip from './topup/Slip'
import TrueWallet from './topup/TrueWallet'
import Topup from './pages/Topup'
import ProtectedRoute from './ProtectedRoute'
import UsersReport from './report/UsersReport'
import AdminBanner from './adminCom/AdminBanner'
import AdminBannerAdd from './adminCom/AdminBannerAdd'
import AdminReport from './adminCom/AdminReport'
import AdminProtected from './AdminProtected'
import AdminNotice from './adminCom/AdminNotice'
import AdminNoticeAdd from './adminCom/AdminNoticeAdd'
import AdminAddStockIdPass from './adminCom/AdminAddStockIdPass'
import AdminAddStockCode from './adminCom/AdminAddStockCode'
import OrderHistoryDetails from './userinfo/OrderHistoryDetails'
import AllCategory from './pages/AllCategory'
import AdminEditStockIdPass from './adminCom/AdminEditStockIdPass'
import AdminAnnounce from './adminCom/AdminAnnounce'
import AdminAnnounceEdit from './adminCom/AdminAnnounceEdit'
import AdminEditPost from './adminCom/AdminEditPost'
import AdminPostsManagement from './adminCom/AdminPostsManagement'
import AdminCategory from './adminCom/AdminCategory'
import AdminCategoryEdit from './adminCom/AdminCategoryEdit'
import FAQ from './pages/FAQ'
import AdminAddPayment from './adminCom/AdminAddPayment'
import Addpayment from './adminCom/Addpayment'
import EditPayment from './adminCom/EditPayment'
import HowRegister from './FAQCom/howRegister'
import HowTopup from './FAQCom/HowTopup'
import HowOrder from './FAQCom/HowOrder'
import Terms from './FAQCom/Terms'
import CateChoice from './pages/CateChoice'
import AllCate from './pages/AllCate'
import Kasikorn from './adminCom/Kasikorn'
import AdminPoster from './adminCom/AdminPoster'
import Poster from './adminCom/Poster'
import { InactivityTimerProvider } from './context/InactivityTimerContext';


const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userInfo",
        element: <UserInfo />,
      },
      {
        path: "/orderhistory",
        element: <OrderHistory />,
      },
      {
        path: "/orderhistorydetails/:id",
        element: <OrderHistoryDetails />,
      },
      {
        path: "/topuphistory",
        element: <TopupHistory />,
      },
      // {
      //   path: "/luckyhistory",
      //   element: <LuckyHistory />,
      // },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: '/cateChoice',
        element: <CateChoice />
      },
      {
        path: '/allcategory',
        element: <AllCate />
      },
      {
        path: "/allgoods",
        element: <AllCategory />,
      },
      {
        path: "/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/addaccount/:id",
        element: <Test />,
      },
      {
        path: "/report",
        element: <UsersReport />,
      },
      {
        path: '/faq',
        element: <FAQ />
      },
      {
        path: '/faq/howregister',
        element: <HowRegister />
      },
      {
        path: '/faq/howtopup',
        element: <HowTopup />
      },
      {
        path: '/faq/howorder',
        element: <HowOrder />
      },
      {
        path: '/faq/terms',
        element: <Terms />
      },
    ],
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    ),
  },
  {
    path: "/topup",
    element: <Layout />,
    children: [
      {
        path: "/topup",
        element: (
          <ProtectedRoute>
            <Topup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/topup/truewallet",
        element: (
          <ProtectedRoute>
            <TrueWallet />
          </ProtectedRoute>
        ),
      },
      {
        path: "/topup/slip",
        element: (
          <ProtectedRoute>
            <Slip />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        {" "}
        <Layout />
      </AdminProtected>
    ),
    children: [
      {
        path: "/admin",
        element: (
          <AdminProtected>
            <AdminDashboard />
          </AdminProtected>
        ),
      },
      {
        path: '/admin/payment',
        element: (
          <AdminProtected>
            <AdminAddPayment />
          </AdminProtected>
        )
      },
      {
        path: '/admin/kasikorn',
        element: (
          <AdminProtected>
            <Kasikorn />
          </AdminProtected>
        )
      },
      {
        path: '/admin/addpayment',
        element: (
          <AdminProtected>
            <Addpayment />
          </AdminProtected>
        )
      },
      {
        path: '/admin/editpayment/:id',
        element: (
          <AdminProtected>
            <EditPayment />
          </AdminProtected>
        )
      },
      {
        path: '/admin/category',
        element: (
          <AdminProtected>
            <AdminCategory />
          </AdminProtected>
        )
      },
      {
        path: '/admin/edit-category',
        element: (
          <AdminProtected>
            <AdminCategoryEdit />
          </AdminProtected>
        )
      },
      {
        path: '/admin/edit-category/:id',
        element: (
          <AdminProtected>
            <AdminCategoryEdit />
          </AdminProtected>
        )
      },
      {
        path: "/admin/orders",
        element: (
          <AdminProtected>
            <AdminOrder />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <AdminProtected>
            <AdminProduct />
          </AdminProtected>
        ),
      },
      // {/**EDIT*/} ADD: id in bolt add id pass and add code
      {
        path: "/admin/addidpass/:id",
        // {/**EDIT*/}
        element: (
          <AdminProtected>
            <AdminAddStockIdPass />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/addidpass",
        element: (
          <AdminProtected>
            <AdminAddStockIdPass />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/editidpass",
        element: (
          <AdminProtected>
            <AdminEditStockIdPass />
          </AdminProtected>
        ),
      },
      {
        // {/**EDIT*/} ADD: id in bolt add id pass and add code
        path: "/admin/addcode/:id",
        // {/**EDIT*/}
        element: (
          <AdminProtected>
            <AdminAddStockCode />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/addcode",
        element: (
          <AdminProtected>
            <AdminAddStockCode />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/banner",
        element: (
          <AdminProtected>
            <AdminBanner />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/addbanner",
        element: (
          <AdminProtected>
            <AdminBannerAdd />
          </AdminProtected>
        ),
      },
      {
        path: '/admin/poster',
        element: (
          <AdminProtected>
            <Poster />
          </AdminProtected>
        )
      },
      {
        path: '/admin/addposter',
        element: (
          <AdminProtected>
            <AdminPoster />
          </AdminProtected>
        )
      },
      {
        path: "/admin/report",
        element: (
          <AdminProtected>
            <AdminReport />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/notice",
        element: (
          <AdminProtected>
            <AdminNotice />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/addnotice",
        element: (
          <AdminProtected>
            <AdminNoticeAdd />
          </AdminProtected>
        ),
      },
      {
        path: "/admin/announce",
        element: (
          <AdminProtected>
            <AdminAnnounce />
          </AdminProtected>
        )
      },
      {
        path: "/admin/announceEdit",
        element: (
          <AdminProtected>
            <AdminAnnounceEdit />
          </AdminProtected>
        )
      },
      {
        path: '/admin/announceEdit/:id',
        element: (
          <AdminProtected>
            <AdminAnnounceEdit />
          </AdminProtected>
        )
      },
      {
        path: "/admin/posts-management",
        element: (
          <AdminProtected>
            <AdminPostsManagement />
          </AdminProtected>
        ),
      },
      // แก้ไขกล่อง
      {
        path: "/admin/post-edit/:id",
        element: (
          <AdminProtected>
            <AdminEditPost />
          </AdminProtected>
        ),
      },
    ],
  },
]);

// const admin = createBrowserRouter([
//   {
//     path: '/admin',
//     element: <Layout />,
//     children: [
//       {path: '/admin', element: <AdminDashboard /> }, 
//       {path: '/admin/orders', element: <AdminOrder /> }, 
//       {path: '/admin/products', element: <AdminProduct /> }, 
//     ]
//   }
// ])

function App() {

  return (
    <InactivityTimerProvider>
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
    </InactivityTimerProvider>

  );
}

export default App
