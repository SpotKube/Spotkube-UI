import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { selectors, thunks } from "../store";
import { AppSidebarNav } from "./AppSidebarNav";
// sidebar nav config
import navigation from "../_nav";

import SimpleBar from "simplebar-react";

import "simplebar/dist/simplebar.min.css";
const logoPhoto = require("../assets/images/logo.png");

const AppSidebar = () => {
  const dispatch = useDispatch();

  const unfoldable = useSelector(selectors.ui.selectUnfoldable);
  const sidebarShow = useSelector(selectors.ui.selectSidebarShow);
  const accountType = useSelector(selectors.user.selectUserType);

  const [navItems, setNavItems] = useState([]);
  

  useEffect(() => {
    const temps = navigation.filter((item) => {
      if (item.accounttype) {
        if (item.accounttype.indexOf(accountType) !== -1) {
          delete item.accounttype;
          return item;
        } else {
          return false;
        }
      } else {
        return item;
      }
    });
    setNavItems(temps);
  }, [accountType]);
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch(thunks.ui.setSidebarShow(visible));
      // }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
      { !unfoldable ? (<img className="h-24 w-auto sm:h-40" src={logoPhoto} alt="Logo"/>) : ""}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navItems} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(thunks.ui.setUnfoldable(!unfoldable))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
