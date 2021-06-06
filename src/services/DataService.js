import http from "../http-common";

class DataService {
  getAllDevs() {
    return http.get("/devs");
  }
  
  getAllProjs() {
    return http.get("/projetos");
  }

  getAllTasksById(proj) {
    return http.get("/tasks/" + proj);
  }

   get(id) {
     return http.get(`/tutorials/${id}`);
   }

  uploadButton() {
    return http.get("/uploadButton");
  }

  create(data) {
    return http.post("/upload_json", data);
  }

  // create(data) {
  //   return http.post("/tutorials", data);
  // }

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new DataService();