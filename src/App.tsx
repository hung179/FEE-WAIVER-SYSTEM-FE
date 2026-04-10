import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './common/contexts/AuthContext';
import { ModalProvider } from './common/contexts/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from './common/routes/routes';
import { ConfirmModal } from './common/components/Modal/ConfirmModal';

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <ConfirmModal />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;