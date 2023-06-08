import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectors } from "../store";

const ProtectedRoute = ({ isLoggedIn, accountType, location, ...rest }) => {
    if (!isLoggedIn) {
        return <Route {...rest} />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useSelector(selectors.user.selectUserId) !== "") {
        if (accountType) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if (accountType.indexOf(useSelector(selectors.user.selectRole)) !== -1) {
                return <Route {...rest} />;
            } else {
                return (
                    <Redirect
                        to={{
                            pathname: "/404",
                        }}
                    />
                );
            }
        } else {
            return <Route {...rest} />;
        }
    }

    return (
        <Redirect
            to={{
                pathname: "/login",
                state: {
                    from: location,
                },
            }}
        />
    );
};

export default ProtectedRoute;

