import React from 'react';
import CommuColCategory from '../components/CommuColCategory';
import PagesHeader from '../components/PagesHeader';

function CommuCollectionPage() {
  return (
    <>
      <PagesHeader title={'내 커뮤니티 활동'} />
      <CommuColCategory />
    </>
  );
}

export default CommuCollectionPage;
