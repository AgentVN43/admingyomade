import { Button, Collapse, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Sản phẩm",
    href: "/product",
    icon: "bi bi-basket",
  },
  {
    title: "Hình ảnh",
    href: "/media",
    icon: "bi bi-images",
  },
  {
    title: "Blog",
    href: "/blog",
    icon: "bi bi-newspaper",
    submenus: [
      {
        title: "Thêm bài",
        href: "/blog/add",
      },
      {
        title: "Danh sách bài",
        href: "/blog/list",
      },
      {
        title: "Categories",
        href: "/blog/categories",
      },
    ],
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMenuItemClick = (href) => {
    setActiveItem(href);
    setOpenSubmenu(null);
  };

  const handleLogoClick = () => {
    setActiveItem("");
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (href) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  let location = useLocation();

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    setActiveItem("");
  }, [location.pathname]);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo onClick={handleLogoClick} />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {/* <Link
                to={navi.href}
                onClick={() => handleMenuItemClick(navi.href)}
                className={
                  (location.pathname === navi.href || activeItem === navi.href)
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link> */}
              {navi.submenus ? (
                <>
                  <Link
                    to="#"
                    onClick={() => toggleSubmenu(navi.href)}
                    className="nav-link py-3"
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                  <Collapse isOpen={openSubmenu === navi.href}>
                    {navi.submenus.map((submenu, subIndex) => (
                      <Link
                        key={subIndex}
                        to={submenu.href}
                        onClick={() => handleMenuItemClick(submenu.href)}
                        className={
                          location.pathname === submenu.href
                            ? "text-primary nav-link py-3"
                            : "nav-link text-secondary py-3"
                        }
                      >
                        <i className="bi bi-arrow-right"></i>
                        <span className="ms-3 d-inline-block">
                          {submenu.title}
                        </span>
                      </Link>
                    ))}
                  </Collapse>
                </>
              ) : (
                <Link
                  to={navi.href}
                  onClick={() => handleMenuItemClick(navi.href)}
                  className={
                    location.pathname === navi.href || activeItem === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
