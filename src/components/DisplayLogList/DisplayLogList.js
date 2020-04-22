import React from "react";
import { Link } from "react-router-dom";

import "./DisplayLogList.css";

const DisplayLogList = ({ log }) => {
  return (
    <Link className="log-wrapper log" to={`/log/${log.id}`}>
      <h3 className="log-name log">{log.log_name}</h3>
      <button className="log-delete log">X</button>
    </Link>
  );
};

export default DisplayLogList;
