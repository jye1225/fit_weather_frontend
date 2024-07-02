import style from '../css/FashionFeedPage.module.css';
import FashionFeedModal from '../components/FashionFeedModal';
import { useEffect, useState } from 'react';
import { url } from '../store/ref';
import { useCategoryStore } from '../store/categoryStore';

function FashionFeedPage() {
  const { setOnCommuCate } = useCategoryStore();
  useEffect(() => {
    setOnCommuCate('feed');
  }, []);

  //  시도해보는 중
  // const [onFshModal, setOnFshModal] = useState(false);
  // const [feeds, setFeeds] = useState(true);
  // const [error, serError] = useState(null);

  // const INSTA_ACCOUNT_ID = '17841466980397718';
  // const INSTA_ACCESS_TOKEN =
  //   'EABwxhKkQmXQBO3NWIgvNtJhITDJj0AA6dBtLrNR8JkZADdM7hIeVSDeevAlPmXk8caXe2QjHdgBWiB0cCCFWqN18YE8z0CUZCezjD08eDu2LRXFcfUEF96HbWTLzXjfZB5kfwKtgZBcYvUtj7ZAsEZCfy5zBGPKwkfZAdAycsxoEGROE7Ap05qBhZBAq3ICtuPVNXoj2hX5ufCgIvWIqHyVax4jEGcNV9KCu5a0ZD';
  // const fetchFeeds = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://graph.facebook.com/v20.0/${INSTA_ACCOUNT_ID}?fields=business_discovery.username(rimjunhee){id,media.limit(10),username}&access_token=${INSTA_ACCESS_TOKEN}`
  //     );
  //     const data = await response.json();
  //     // console.log(response);
  //     console.log(data);
  //     getMediaUrls(data);
  //   } catch (error) {
  //     console.error('인스타 피드 불러오기 에러', error);
  //   }
  // };

  // const getMediaUrls = async (businessDiscoveryData) => {
  //   const mediaItems = businessDiscoveryData.business_discovery.media.data;

  //   mediaItems.map(async (item) => {
  //     const response = await fetch(
  //       `https://graph.facebook.com/v20.0/${item.id}?fields=media_url,thumbnail_url&access_token=${INSTA_ACCESS_TOKEN}`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     return { ...item, ...data };
  //   });
  // };

  // useEffect(() => {
  //   fetchFeeds();
  // }, []);

  // const clickOneFeed = () => {
  //   setOnFshModal(true);
  // };

  return (
    <main className={`mw ${style.fashionFeedPage}`}>
      {/* <h3 className={`fontHead3 ${style.fshFeedTitle}`}>
        패션 인플루언서의 코디
      </h3> */}
      {/* <div>
        <iframe
          src="https://www.musinsa.com/snap/main/recommend?isApp=false&viewport=desktop&feed-tab=NEW"
          className={style.embedded}
          title="External Website"
        />
      </div> */}
      {/* <ul className={style.fshFeedCon}>
        <li onClick={clickOneFeed}>피드</li>
        <li>피드</li>
        <li>피드</li>
        <li>피드</li>
      </ul>
      <FashionFeedModal onFshModal={onFshModal} setOnFshModal={setOnFshModal} /> */}
    </main>
  );
}

export default FashionFeedPage;
