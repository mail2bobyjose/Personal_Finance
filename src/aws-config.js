export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-2_ezgwgJAuU",
      userPoolClientId: "4e9qk87aa2is0jqrd05skrg9dk",
      loginWith: {
        oauth: {
          domain:
            "ap-southeast-2ezgwgjauu.auth.ap-southeast-2.amazoncognito.com",
          scopes: ["openid", "email", "profile"],
          redirectSignIn: ["http://localhost:5173/"],
          redirectSignOut: ["http://localhost:5173/"],
          responseType: "code",
        },
      },
    },
  },
};