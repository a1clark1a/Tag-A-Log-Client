import React from "react";

import "./ProfilePage.css";

function ProfilePage() {
  return (
    <section className="profile-sect">
      <header className="button-grp">
        <button>Tags</button>
        <button>Logs</button>
      </header>
      <div class="list">
        <label className="sort">
          Sort by:{" "}
          <select>
            <option>Date created</option>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </label>
        <div>
          item list <button>X</button>
        </div>
        <div>
          item list <button>X</button>
        </div>
        <div>
          item list <button>X</button>
        </div>
        <div>
          item list <button>X</button>
        </div>
        <div>
          item list <button>X</button>
        </div>
        <div>
          item list <button>X</button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
