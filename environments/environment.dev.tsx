const environment = {
  name: "development",
  Identity: {
    Authority:
      "https://piaddb2ctenant.b2clogin.com/piaddb2ctenant.onmicrosoft.com/B2C_1_SISU/v2.0",
    ClientId: "3bd7f37f-b433-4f73-9121-04f8745024cf",
    RedirectUrl: "http://localhost:3000/redirect",
    LogoutUrl: "http://localhost:3000/logout",
  },
  ResourceServer: {
    Endpoint: "http://localhost:4000/api",
  },
  CurrentUrl: "http://localhost:3000/",
};
export default environment;
