const environment = {
  name: "production",
  Identity: {
    Authority:
      "https://piaddb2ctenant.b2clogin.com/piaddb2ctenant.onmicrosoft.com/B2C_1_signup/v2.0",
    ClientId: "3bd7f37f-b433-4f73-9121-04f8745024cf",
    RedirectUrl: "http://localhost:1414/redirect",
    LogoutUrl: "http://localhost:1414/logout",
  },
  ResourceServer: {
    Endpoint: "https://localhost:44312/api/",
    NotificationEndpoint: "https://localhost:44312/hubs/notification",
  },
  CurrentUrl: "http://localhost:3000/",
};
export default environment;
