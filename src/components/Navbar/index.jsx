import { Navbar, Dropdown, Avatar, Text, Input } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Logo } from './Logo.jsx';

const SearchInput = (w) => {
  return (
    <Input
      css={{
        width: w,
      }}
      underlined
      placeholder='Search user...'
      color='secondary'
      contentRight={
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-search'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#6f32be'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <circle cx='10' cy='10' r='7' />
            <line x1='21' y1='21' x2='15' y2='15' />
          </svg>
        </>
      }
    />
  );
};

export default function NavbarComponent({ nameWhichActive, moreRoute = [] }) {
  const cookieData = JSON.parse(Cookies.get('login_data'));
  const navItem = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Feed',
      to: '/feed',
    },
    {
      name: 'Diary',
      to: '/myDiary',
    },
    ...moreRoute,
  ];
  const collapseItems = [
    ...navItem,
    {
      name: 'My Settings',
      to: '/setting',
    },
    {
      name: 'Log Out',
      to: '/logout',
    },
  ];

  const handlerLogout = () => {
    Cookies.remove('login_data');

    window.location.replace('/login');
  };

  return (
    <>
      <Navbar className='z-[9999] bg-none' variant='floating'>
        <Navbar.Toggle showIn='sm' />
        <Navbar.Brand
          css={{
            '@xs': {
              w: '12%',
            },
          }}
        >
          <Link className='flex items-center' to='/'>
            <Logo />
            <Text b color='inherit' hideIn='sm'>
              S-LOG
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor='secondary'
          hideIn='sm'
          variant='highlight-rounded'
        >
          {navItem.map((item) => {
            if (nameWhichActive === item.name)
              return (
                <Navbar.Link key={`${item.name}navItem`} isActive>
                  <Link
                    className='flex justify-center items-center'
                    to={item.to}
                  >
                    {item.name}
                  </Link>
                </Navbar.Link>
              );
            return (
              <Navbar.Link key={`${item.name}navItem`}>
                <Link className='flex justify-center items-center' to={item.to}>
                  {item.name}
                </Link>
              </Navbar.Link>
            );
          })}
        </Navbar.Content>
        <Navbar.Content
          css={{
            '@xs': {
              w: '12%',
              jc: 'flex-end',
            },
          }}
        >
          <Navbar.Item hideIn='sm'>
            <SearchInput w={'10rem'} />
          </Navbar.Item>
          <Dropdown placement='bottom-right'>
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as='button'
                  color='secondary'
                  size='md'
                  src={cookieData.imageUrl}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label='User menu actions'
              color='secondary'
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key='profile' css={{ height: '$18' }}>
                <Text b color='inherit' css={{ d: 'flex' }}>
                  Signed in as
                </Text>
                <Text
                  b
                  className='flex text-ellipsis whitespace-nowrap max-w-[10rem] sm:max-w-[13rem] overflow-hidden'
                  // color='inherit'
                >
                  {cookieData.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key='settings' withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key='logout' withDivider color='error'>
                <button onClick={handlerLogout}>Log Out</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={`${item.name}-${item.to}`}
              activeColor='secondary'
              css={{
                color: index === collapseItems.length - 1 ? '$error' : '',
              }}
              isActive={item.name === nameWhichActive}
            >
              <Link
                color='inherit'
                css={{
                  minWidth: '100%',
                }}
                to={item.to}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}

          <Navbar.CollapseItem>
            <SearchInput w={'100%'} />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
