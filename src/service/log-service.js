import config from "../config";
import TokenService from "./token-service";

const LogsService = {
  getUsersLogs() {
    return fetch(`${config.API_ENDPOINT}/logs`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  getClickedLog(logsId) {
    return fetch(`${config.API_ENDPOINT}/logs/${logsId}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  getLogsListOfTags(logsId) {
    return fetch(`${config.API_ENDPOINT}/logs/${logsId}/tags`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },

  postLog(newLog) {
    return fetch(`${config.API_ENDPOINT}/logs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newLog),
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },

  updateLog(logsId, newLog) {
    return fetch(`${config.API_ENDPOINT}/logs/${logsId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newLog),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },

  deleteLog(logsId) {
    return fetch(`${config.API_ENDPOINT}/logs/${logsId}`, {
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

export default LogsService;
