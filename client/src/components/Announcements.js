import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/announcements')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error("Error fetching announcements:", error));
  }, []);

  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements at this time.</p>
      ) : (
        announcements.map(announcement => (
          <div key={announcement.id} className="announcement-card">
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <small>Posted on: {new Date(announcement.date).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Announcements;

