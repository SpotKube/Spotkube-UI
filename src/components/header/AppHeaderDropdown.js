import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import { useDispatch } from "react-redux";
import { thunks } from "../../store";

import avatar8 from "./../../assets/images/avatar.png";
import { useHistory } from "react-router-dom";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const submitLogOut = async () => {
    await dispatch(thunks.user.userLogout());
    history.replace("/swagger");
    history.go(0);
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        //!TODO : Profile and Logout Settings
        <CDropdownItem href="/user/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={async () => submitLogOut()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
