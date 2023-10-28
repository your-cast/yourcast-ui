import React from 'react';
import MainNavigation from '../components/Header/MainNavigation';

export default function SiteHeader() {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <MainNavigation/>
    </div>
  );
};
