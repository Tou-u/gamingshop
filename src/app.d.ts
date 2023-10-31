/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    role: "guest" | "admin";
  };
  type DatabaseSessionAttributes = {};
}
