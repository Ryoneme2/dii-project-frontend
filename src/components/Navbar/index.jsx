import { Navbar, Dropdown, Avatar, Link, Text } from "@nextui-org/react";
import { Logo } from "./Logo.jsx";

export default function NavbarComponent({ nameWhichActive }) {
  const navItem = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Feed",
      href: "/feed",
    },
    {
      name: "Diary",
      href: "/diary",
    },
  ];
  const collapseItems = [
    ...navItem,
    {
      name: "My Settings",
      href: "/setting",
    },
    {
      name: "Log Out",
      href: "/logout",
    },
  ];

  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <a className="flex items-center" href="/">
            <Logo />
            <Text b color="inherit" hideIn="xs">
              S-LOG
            </Text>
          </a>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          {navItem.map((item) => {
            if (nameWhichActive === item.name)
              return (
                <Navbar.Link isActive href={item.href}>
                  {item.name}
                </Navbar.Link>
              );
            return <Navbar.Link href={item.href}>{item.name}</Navbar.Link>;
          })}
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item.name}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={item.name === nameWhichActive}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.href}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}