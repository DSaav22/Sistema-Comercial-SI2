import { MainLayout } from './MainLayout';
import { SidebarAdmin } from './ui/SidebarAdmin';

export const AdminLayout = ({ children }) => {
  return (
    <MainLayout showFooter={false}>
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <SidebarAdmin />
        </div>
        <div className="col-md-9 col-lg-10">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};