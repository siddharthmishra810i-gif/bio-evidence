import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

import { HomePage } from './pages/HomePage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { EvidencePage } from './pages/EvidencePage';
import { SearchPage } from './pages/SearchPage';
import { GenePage } from './pages/GenePage';
import { DrugPage } from './pages/DrugPage';
import { DiseasePage } from './pages/DiseasePage';
import { EntityListingPage } from './pages/EntityListingPage';
import { LiteraturePage } from './pages/LiteraturePage';
import { ClinicalTrialsPage } from './pages/ClinicalTrialsPage';
import { AskGraphPage } from './pages/AskGraphPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F7F5EF] text-[#252824] antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Quiet Scientific Footer */}
        <footer className="border-t border-[#DFDCD3] bg-[#EFEEE7]/60 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-[#7A8077] space-y-1">
          <div className="font-serif text-[#252824]">
            BioEvidence &bull; Open Biomedical Knowledge Explorer
          </div>
          <div className="font-mono text-[10px]">
            Academic Research Use Only &bull; Not for Clinical Diagnosis or Patient Treatment Advice
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/graph" element={<KnowledgeGraphPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Entity routes */}
            <Route path="/genes" element={<EntityListingPage entityType="genes" />} />
            <Route path="/genes/:id" element={<GenePage />} />

            <Route path="/drugs" element={<EntityListingPage entityType="drugs" />} />
            <Route path="/drugs/:id" element={<DrugPage />} />

            <Route path="/diseases" element={<EntityListingPage entityType="diseases" />} />
            <Route path="/diseases/:id" element={<DiseasePage />} />

            <Route path="/mutations" element={<EntityListingPage entityType="mutations" />} />
            <Route path="/pathways" element={<EntityListingPage entityType="pathways" />} />

            {/* Discovery & Literature */}
            <Route path="/literature" element={<LiteraturePage />} />
            <Route path="/trials" element={<ClinicalTrialsPage />} />
            <Route path="/ask" element={<AskGraphPage />} />

            {/* Architecture & Analytics */}
            <Route path="/sources" element={<DataSourcesPage />} />
            <Route path="/analytics" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
