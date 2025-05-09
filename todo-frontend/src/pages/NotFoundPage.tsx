import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-4">Sayfa Bulunamadı</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">
        Aradığınız sayfaya ulaşılamıyor. Sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
      </p>
      
      <Link to="/">
        <Button className="flex items-center">
          <HomeIcon className="h-5 w-5 mr-2" />
          <span>Ana Sayfaya Dön</span>
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;