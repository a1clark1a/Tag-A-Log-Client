import config from "../config";
import TokenService from "./token-service";

const TagsService = {
  getUserTags() {
    return fetch(`${config.API_ENDPOINT}/tags`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  getTagsListOfLogs(tagsId) {
    return fetch(`${config.API_ENDPOINT}/tags/${tagsId}/logs`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },

  postTag(newTag) {
    return fetch(`${config.API_ENDPOINT}/tags`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newTag),
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },

  updateLog(tagsId, newTag) {
    return fetch(`${config.API_ENDPOINT}/tags/${tagsId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newTag),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },

  deleteTag(tagsId) {
    return fetch(`${config.API_ENDPOINT}/tags/${tagsId}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },
};

export default TagsService;
