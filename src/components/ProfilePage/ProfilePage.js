import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ProfilePage.css";

function ProfilePage() {
  const [active, setActive] = useState("Logs");

  const displayLogs = () => {
    const list = [];
    for (let i = 0; i < 25; i++) {
      list.push(
        <div className="item">
          <Link to={`/logpage/${i}`}>item list</Link>
          <button>X</button>
        </div>
      );
    }
    return list;
  };

  const displayTags = () => {
    const item = (
      <div className="tags">
        Tag <button>X</button>
      </div>
    );
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push(item);
    }

    return list;
  };

  return (
    <section className="profile-sect">
      <header className="button-grp">
        <button onClick={() => setActive("Logs")}>Logs</button>
        <button onClick={() => setActive("Tags")}>Tags</button>
      </header>
      <div class="prof-list list">
        <label className="sort">
          Sort by:{" "}
          <select>
            <option>Date created</option>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </label>
        {active === "Logs" ? displayLogs() : displayTags()}
      </div>
    </section>
  );
}

export default ProfilePage;
