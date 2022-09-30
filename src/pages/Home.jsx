import { useState } from 'react';
import Navbar from '../components/Navbar';
import HomeForm from '../components/Homeform';
import NotLoginInfo from '../components/NotLoginInfo';
import ModalCard from '../components/Home/ModelCard';
import ModalEdit from '../components/Home/ModelEdit';

import { getCookie } from '../libs/getterSetterCookie';
import HomeStore from '../context/contextStore_home';
import { fetchApi } from '../helpers/fetchApi';

const Home = () => {
  //TODO : handle login page
  const cookie = getCookie('login_data');
  const [cardModalData, setCardModalData] = useState({});
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = async (id) => {
    try {
      setIsModelOpen(true);
      setIsCardLoading(true);
      console.log({ id });
      const res = await fetchApi('get', `api/v1/posts/individual/${id}`, true);
      setCardModalData(res.data.data);
      setIsCardLoading(false);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const closeModalHandler = () => {
    setIsModelOpen(false);
  };

  const openEdit = () => setEditOpen(true);
  const closeHandler = () => setVisible(false);

  if (cookie === undefined)
    return (
      <div className='h-screen'>
        <NotLoginInfo />
      </div>
    );

  return (
    <>
      <Navbar nameWhichActive={'Home'} />
      <HomeStore.Provider
        value={{
          openModal,
          closeModalHandler,
          openEdit,
          isModelOpen,
          editOpen,
          cardModalData,
          setVisible,
        }}
      >
        {/* edit modal */}
        <ModalCard data={cardModalData} loading={isCardLoading} />
        <ModalEdit data={{ visible, closeHandler }} />

        <HomeForm />
      </HomeStore.Provider>
    </>
  );
};

export default Home;
