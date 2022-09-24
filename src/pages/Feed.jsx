import React, { useEffect, useState, createContext } from 'react';
import { useModal } from '@nextui-org/react';

import { getCookie } from '../libs/getterSetterCookie';
import Navbar from '../components/Navbar';
import Container from '../layouts/Container';
import Post from '../components/Posts';
import PostLayout from '../layouts/PostLayout';
import NewPost from '../components/Posts/NewPost';
import ComplexWithAnimation from '../components/Skeleton';
import AllCommentModel from '../components/Posts/AllCommentModel';
import NotLoginInfo from '../components/NotLoginInfo';
import { fetchApi } from '../helpers/fetchApi';

const Feed = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstPostLoading, setIsFirstPostLoading] = useState(false);
  const { setVisible, bindings } = useModal();
  const [postId, setPostId] = useState('');
  const [loading, setLoading] = useState(false);
  const [allComment, setAllComment] = useState([]);

  const cookieData = getCookie('login_data');
  const modalPostId = createContext(postId);

  useEffect(() => {
    const resData = async () => {
      setIsLoading(true);

      if (!cookieData) {
        return;
      }

      const result = await fetchApi('get', 'api/v1/posts/recent', true);
      const ss = await fetchApi('get', 'testGet');

      setData(result.data.data);
      setIsLoading(false);
    };

    resData();
  }, []);

  if (!cookieData) {
    return <NotLoginInfo />;
  }

  const openAllCommentModal = async () => {
    setVisible(true);
  };

  // const getComment = async () => {
  //   try {
  //     setLoading(true);
  //     const apiUrl = `${
  //       import.meta.env.VITE_API_HOSTNAME
  //     }post/comment/${postId}`;
  //     const config = {
  //       headers: {
  //         Authorization: cookieData.token,
  //       },
  //     };
  //     const res = await axios.get(apiUrl, config);

  //     setAllComment(res.data.data);
  //     setLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  // };

  return (
    <>
      <Navbar nameWhichActive={'Feed'} />
      <modalPostId.Provider>
        <Container>
          {bindings.open ? (
            ''
          ) : (
            <AllCommentModel
              bindings={bindings}
              setVisible={setVisible}
              loading={loading}
            />
          )}
          <div className='flex flex-col gap-5 justify-center items-center'>
            <NewPost
              setIsFirstPostLoading={setIsFirstPostLoading}
              setPost={setData}
            />
            {isLoading ? (
              <ComplexWithAnimation />
            ) : (
              data.map((item, i) => {
                return i === 0 ? (
                  <PostLayout
                    isFirstPostLoading={isFirstPostLoading}
                    key={item.id}
                  >
                    <Post postData={item} />
                  </PostLayout>
                ) : (
                  <PostLayout key={item.id}>
                    <Post postData={item} />
                  </PostLayout>
                );
              })
            )}
          </div>
        </Container>
      </modalPostId.Provider>
    </>
  );
};

export default Feed;
