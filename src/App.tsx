import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginView } from './components/views/LoginView';

// Views
import { DashboardAdmin } from './components/views/DashboardAdmin';
import { DashboardPembina } from './components/views/DashboardPembina';
import { DashboardSiswa } from './components/views/DashboardSiswa';
import { SiswaView } from './components/views/SiswaView';
import { PembinaView } from './components/views/PembinaView';
import { EkstrakurikulerView } from './components/views/EkstrakurikulerView';
import { AnggotaView } from './components/views/AnggotaView';
import { JadwalView } from './components/views/JadwalView';
import { AbsensiFormView } from './components/views/AbsensiFormView';
import { RiwayatAbsensiView } from './components/views/RiwayatAbsensiView';
import { RekapKehadiranView } from './components/views/RekapKehadiranView';
import { PenggunaView } from './components/views/PenggunaView';
import { ProfilSekolahView } from './components/views/ProfilSekolahView';

function AppContent() {
  const { currentUser, currentMenu } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // If not logged in, render the login view
  if (!currentUser) {
    return (
      <>
        <LoginView />
        <ToastContainer />
      </>
    );
  }

  // Determine active view content
  const renderContent = () => {
    switch (currentMenu) {
      case 'dashboard':
        if (currentUser.role === 'ADMIN') return <DashboardAdmin />;
        if (currentUser.role === 'PEMBINA') return <DashboardPembina />;
        return <DashboardSiswa />;

      case 'siswa':
        return <SiswaView />;

      case 'pembina':
        return <PembinaView />;

      case 'ekskul':
      case 'ekskul-siswa':
        return <EkstrakurikulerView />;

      case 'anggota':
        return <AnggotaView />;

      case 'jadwal':
      case 'jadwal-siswa':
        return <JadwalView />;

      case 'absensi-form':
      case 'input-absensi':
        return <AbsensiFormView />;

      case 'riwayat-absensi':
      case 'riwayat-siswa':
        return <RiwayatAbsensiView />;

      case 'rekap':
        return <RekapKehadiranView />;

      case 'pengaturan-user':
      case 'pengguna':
        return <PenggunaView />;

      case 'pengaturan-sekolah':
      case 'pengaturan':
        return <ProfilSekolahView />;

      default:
        if (currentUser.role === 'ADMIN') return <DashboardAdmin />;
        if (currentUser.role === 'PEMBINA') return <DashboardPembina />;
        return <DashboardSiswa />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Responsive Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Global Toast Notification System */}
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
