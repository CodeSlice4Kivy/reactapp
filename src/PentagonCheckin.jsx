import React, { useEffect, useState } from "react";
import "./PentagonCheckin.css";

import bg1 from './assets/bg/image1.jpg';
import bg2 from './assets/bg/image2.jpg';
import bg3 from './assets/bg/image3.jpg';
import bg4 from './assets/bg/image4.jpg';
import bg5 from './assets/bg/image5.jpg';
import bg6 from './assets/bg/image6.jpg';
import bg7 from './assets/bg/image7.jpg';

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

const initialData = [
  { title: "Evangelized", subtitle: "new bucket or fruit meeting", status: "Update" },
  { title: "Watched Service", subtitle: "physical or offline", status: "Update" },
  { title: "Speeched", subtitle: "speeched the 10min script", status: "Update" },
  { title: "Wacthed DB", subtitle: "on the day participation", status: "Update" },
  { title: "Done Tithes", subtitle: "10% of my income", status: "Update" },
];

const getStatusClass = (status) => {
  return status === "Yes" ? "status-yes" : "status-update";
};

export default function PentagonCheckin() {
  const [data, setData] = useState(initialData);
  const [bgImage, setBgImage] = useState('');
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    changeBackground();

    const handleClickOutside = (e) => {
      if (!e.target.closest(".card")) {
        setActiveCardIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const changeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBgImage(backgrounds[randomIndex]);
  };

  const handleUpdate = (index) => {
    const newData = [...data];
    newData[index].status = "Yes";
    setData(newData);
  };

  const toggleCard = (idx) => {
    setActiveCardIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <header className="header">
        <div className="menu-icon">☰</div>
        <h1 className="title">
          Pentagon Check<span className="in-circle">in</span>
        </h1>
        <div className="spacer" />
      </header>

      <main className="main">
        <h2 className="section-title">Current Participation</h2>
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`card ${activeCardIndex === idx ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCard(idx);
            }}
          >
            <div className="text-content">
              <p className="card-title">{item.title}</p>
              <p className="card-subtitle">{item.subtitle}</p>
            </div>
            <button
              className={`status-button ${getStatusClass(item.status)}`}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate(idx);
              }}
            >
              {item.status}
            </button>
          </div>
        ))}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button onClick={changeBackground} className="status-button">
            Change Background
          </button>
        </div>
      </main>
    </div>
  );
}
