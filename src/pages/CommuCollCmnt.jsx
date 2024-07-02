import { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';

function CommuCollCmnt() {
  const { onMyPageCate, setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('comment');
  }, []);

  return (
    <main className={`mw`}>
      CommuCollectionPage
      <div>CommuCollCmnt</div>
    </main>
  );
}

export default CommuCollCmnt;
