import http from "../http-common/http-common";

class ItemDataService {
  getAll() {
    return http.get("/items");
  }

  get(id) {
    return http.get(`/items/${id}`);
  }

  create(data) {
    return http.post("/items", data);
  }

  update(id, data) {
    return http.patch(`/items/${id}`, data);
  }

  delete(id) {
    return http.delete(`/items/${id}`);
  }
}

export default new ItemDataService();