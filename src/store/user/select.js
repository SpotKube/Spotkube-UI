import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectUserData = createDraftSafeSelector(
  (state) => state.user,
  (user) => user.userData
);

export const selectAccountType = createDraftSafeSelector(
  (state) => state.user,
  (user) => user.userData.accountType
);

export const selectUserId = createDraftSafeSelector(
  (state) => state.user,
  (user) => user.userData.userId
);

export const selectUserType = createDraftSafeSelector(
    (state) => state.user,
    (user) => user.userData.userType
)