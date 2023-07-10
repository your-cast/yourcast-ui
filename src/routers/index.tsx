import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Page} from './types';
import Footer from 'components/Footer/Footer';
import MusicPlayer from 'components/MusicPlayer/MusicPlayer';
import PageHome from 'app/home/page';
import PageArchive from 'app/(archives)/archive/page';
import PageArchiveVideo from 'app/(archives)/archive-3/page';
import PageArchiveAudio from 'app/(archives)/archive-2/page';
import PageAuthor from 'app/author/page';
import PageSingle from 'app/single/single-text/page';
import PageSingleGallery from 'app/single/single-gallery/page';
import PageSingleAudio from 'app/single/single-audio/page';
import PageSingleVideo from 'app/single/single-video/page';
import PageSearch from 'app/search/page';
import PageAbout from 'app/about/page';
import PageContact from 'app/other/contact/page';
import Page404 from 'app/not-found';
import PageLogin from 'app/auth/login/page';
import PageSignUp from 'app/auth/signup/page';
import PageForgotPass from 'app/auth/forgot-pass/page';
import PageSubcription from 'app/other/subscription/page';
import SiteHeader from 'app/SiteHeader';
import DashboardSubmitPost from 'app/other/dashboard/submit-post/page';
import DashboardPosts from 'app/other/dashboard/posts/page';
import DashboardEditProfile from 'app/other/dashboard/edit-profile/page';
import DashboardSubcription from 'app/other/dashboard/subscription/page';
import DashboardBilingAddress from 'app/other/dashboard/billing-address/page';

export const pages: Page[] = [
  {path: '/', component: PageHome},
  {path: '/#', component: PageHome},

  // archives page -------------------------------------------------------
  {path: '/archive/*', component: PageArchive},
  {path: '/archive-2/*', component: PageArchiveAudio},
  {path: '/archive-3/*', component: PageArchiveVideo},
  {path: '/author/*', component: PageAuthor},

  // single page -------------------------------------------------------
  {path: '/single/*', component: PageSingle},
  {path: '/single-audio/*', component: PageSingleAudio},
  {path: '/single-video/*', component: PageSingleVideo},
  {path: '/single-gallery/*', component: PageSingleGallery},

  // search -------------------------------------------------------
  {path: '/search', component: PageSearch},

  // other pages -------------------------------------------------------
  {path: '/about', component: PageAbout},
  {path: '/contact', component: PageContact},
  {path: '/page404', component: Page404},
  {path: '/login', component: PageLogin},
  {path: '/signup', component: PageSignUp},
  {path: '/forgot-pass', component: PageForgotPass},
  {path: '/subscription', component: PageSubcription},
  {path: '/dashboard', component: DashboardSubmitPost},
  {path: '/dashboard/posts', component: DashboardPosts},
  {path: '/dashboard/edit-profile', component: DashboardEditProfile},
  {path: '/dashboard/subscription', component: DashboardSubcription},
  {path: '/dashboard/billing-address', component: DashboardBilingAddress},
  {path: '/dashboard/submit-post', component: DashboardSubmitPost}
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <SiteHeader/>

      <Routes>
        {pages.map(({component: Component, path}, index) => {
          return <Route key={index} element={<Component/>} path={path}/>;
        })}
        <Route element={<Page404/>}/>
      </Routes>

      <Footer/>
      <MusicPlayer/>
    </BrowserRouter>
  );
};

export default MyRoutes;
