import http from "../http-common/http-common";

class UserDataService {
  userRegistration(data) {
    return http.post("/users/registration",data);
  }

  userLogin(data) {
    return http.post("/users/login",data);
  }

  createUser(data) {
    return http.post("/users", data);
  }
}

export default new UserDataService();