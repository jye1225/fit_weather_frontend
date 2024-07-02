import { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';

function CommuCollLike() {
  const { onMyPageCate, setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('like');
  }, []);

  return (
    <main className={`mw`}>
      CommuCollectionPage
      <div>CommuCollLike</div>
    </main>
  );
}

export default CommuCollLike;
