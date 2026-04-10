import { Navigate, type RouteObject, type UIMatch } from 'react-router-dom';
import Login from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import Unauthorized from '../pages/Unauthorized';
import Home from '../pages/Home';
import { UsersPage } from '../../user/admin/pages/UsersPage';
import CreateUserPage from '../../user/admin/pages/CreateUserPage';
import { UpdateUserPage } from '../../user/admin/pages/UpdateUserPage';
import { OrganizationPage } from '../../organization/pages/OrganizationPage';
import CreateOrganizationPage from '../../organization/pages/CreateOrganizationPage';
import UpdateOrganizationPage from '../../organization/pages/UpdateOrganizationPage';
import { AcademicYear } from '../../academic/year/pages/AcademicYear';
import { CreateAcademicTerm } from '../../academic/term/pages/CreateAcademicTerm';
import { UpdateAcademicYear } from '../../academic/year/pages/UpdateAcademicYear';
import { UpdateAcademicTerm } from '../../academic/term/pages/UpdateAcademicTerm';
import { Supports } from '../../supports/pages/Supports';
import { CreateSupport } from '../../supports/pages/CreateSupport';
import { UpdateSupport } from '../../supports/pages/UpdateSupport';
import CreateAcademicYear from '../../academic/year/pages/CreateAcademicYear';

type AppRoute = RouteObject & {
  isPublic?: boolean;
  handle?: {
    breadcrumb?: string | ((match: any) => string);
  };
};

export const routes: AppRoute[] = [
  {
    path: '/login',
    element: <Login />,
    isPublic: true,
    handle: { breadcrumb: 'Đăng nhập' },
  },

  {
    element: <ProtectedRoute allowedRoles={['QUANTRIVIEN']} />,
    children: [
      {
        element: <MainLayout />,
        handle: { breadcrumb: 'Trang chủ' },
        children: [
          { path: '/admin', element: <Home />, handle: { breadcrumb: 'Dashboard' } },

          { path: '/users', element: <UsersPage />, handle: { breadcrumb: 'Người dùng' } },
          { path: '/users/create', element: <CreateUserPage />, handle: { breadcrumb: 'Tạo người dùng' } },
          {
            path: '/users/update/:id',
            element: <UpdateUserPage />,
            handle: {
              breadcrumb: (match : UIMatch) => `Cập nhật user #${match.params.id}`,
            },
          },

          { path: '/organizations', element: <OrganizationPage />, handle: { breadcrumb: 'Tổ chức' } },
          { path: '/organizations/create', element: <CreateOrganizationPage />, handle: { breadcrumb: 'Tạo tổ chức' } },
          {
            path: '/organizations/update/:id',
            element: <UpdateOrganizationPage />,
            handle: {
              breadcrumb: (match: UIMatch) => `Cập nhật tổ chức #${match.params.id}`,
            },
          },

          { path: '/academics/year', element: <AcademicYear />, handle: { breadcrumb: 'Năm học' } },
          { path: '/academics/year/create', element: <CreateAcademicYear />, handle: { breadcrumb: 'Tạo năm học' } },
          {
            path: '/academics/year/update/:id',
            element: <UpdateAcademicYear />,
            handle: {
              breadcrumb: (match: UIMatch) => `Cập nhật năm học #${match.params.id}`,
            },
          },

          {
            path: '/academics/:yearId/term',
            element: <CreateAcademicTerm />,
            handle: {
              breadcrumb: (match: UIMatch) => `Học kỳ - Năm ${match.params.yearId}`,
            },
          },
          {
            path: '/academics/:yearId/term/:termId',
            element: <UpdateAcademicTerm />,
            handle: {
              breadcrumb: (match: UIMatch) =>
                `Cập nhật học kỳ #${match.params.termId}`,
            },
          },

          { path: '/supports', element: <Supports />, handle: { breadcrumb: 'Hỗ trợ' } },
          { path: '/supports/create', element: <CreateSupport />, handle: { breadcrumb: 'Tạo hỗ trợ' } },
          {
            path: '/supports/update/:id',
            element: <UpdateSupport />,
            handle: {
              breadcrumb: (match: UIMatch) => `Cập nhật hỗ trợ #${match.params.id}`,
            },
          },
        ],
      },
    ],
  },

  {
    path: 'unauthorized',
    element: <Unauthorized />,
    handle: { breadcrumb: 'Không có quyền' },
  },

  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
];