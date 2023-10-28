import React from 'react';
import {DEMO_CATEGORIES} from 'data/taxonomies';
import {DEMO_POSTS} from 'data/posts';
import SectionHero from 'components/SectionHero/SectionHero';
import rightImg from 'images/hero-right.png';
import Vector1 from 'images/Vector1.png';
import SectionSubscribe2 from 'components/SectionSubscribe2/SectionSubscribe2';
import SectionBecomeAnAuthor from 'components/SectionBecomeAnAuthor/SectionBecomeAnAuthor';
import SectionGridCategoryBox from 'components/SectionGridCategoryBox/SectionGridCategoryBox';
import Image from 'components/Image';
import SectionAds from 'components/Sections/SectionAds';
import SectionLatestPosts from 'components/Sections/SectionLatestPosts';

const PageHome: React.FC = () => {
  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg={rightImg}
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              Far from face <br/> but not from {` `}
              <span className="relative pr-3">
                <Image
                  className="w-full absolute top-1/2 -left-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                <span className="relative">heart</span>
              </span>
            </span>
          }
          btnText="Getting started"
          subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
        />

        <SectionGridCategoryBox
          headingCenter={false}
          categoryCardType="card2"
          className="pb-16 lg:pb-28"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
        />

        <SectionAds/>

        <SectionBecomeAnAuthor className="py-16 lg:py-28"/>

        <SectionLatestPosts
          posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 16)}
          postCardName="card7"
          gridClass="sm:grid-cols-2"
          className="pb-16 lg:pb-28"
        />

        <SectionSubscribe2 className="pb-16 lg:pb-28"/>
      </div>
    </div>
  );
};

export default PageHome;
