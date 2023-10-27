import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client-ts";

import env from "../../../../environments";

const config = {
  authority: env.Identity.Authority,
  client_id: env.Identity.ClientId,
  redirect_uri: env.Identity.RedirectUrl,
  post_logout_redirect_uri: env.Identity.LogoutUrl,
  scope:
    "openid offline_access https://piaddb2ctenant.onmicrosoft.com/api/read",
  response_type: "code",
  prompt: "login",
  response_mode: "fragment",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
} as UserManagerSettings;

const userManager = new UserManager(config);

var _user: User;

export const loadUser = () => {
  var promise = userManager.getUser();
  promise.then((user) => {
    if (user && !user.expired) {
      _user = user;
    }
  });
  return promise;
};

export const login = (returnUrl?: string) => {
  console.log("Return Url:", returnUrl);
  if (returnUrl) {
    localStorage.setItem("returnUrl", returnUrl);
  }
  return userManager.signinRedirect();
};

export const logout = () => {
  return userManager.signoutRedirect();
};

export const isLoggedIn = () => {
  return _user && _user.access_token && !_user.expired;
};

export const getAccessToken = () => {
  return _user ? _user.access_token : "";
};

export const signoutRedirectCallback = () => {
  return userManager.signoutRedirectCallback();
};

export const getCurrentUser = () => {
  return {
    id: _user?.profile.sub,
    userName: "nani",
    firstName: "Nihan",
    lastName: "Ali",
  };
};

export const isAuthenticated = () => {
  return isLoggedIn();
};
