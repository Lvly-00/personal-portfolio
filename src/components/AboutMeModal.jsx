import React from 'react';

const AboutMeModal = ({ onClose }) => {
  return (
    <div className="about modal">
      <div className="modal-wrapper">
        <h1 className="modal-title">~ About Me ~</h1>

        <div className="modal-content">
          <div className="modal-content-wrapper">
            <div className="paragraph-section">

              {/* Profile Section */}
              <div className="image-wrapper">
                <img
                  className="base-image"
                  src="images/profile.webp"
                  alt="Profile picture"
                  srcSet=""
                />
              </div>
              <h2 className="modal-paragraph-header">
                Frontend Developer, Backend Developer, Artist, Animator, Video Editor
              </h2>
              <p className="skills-list-item">
                <span className="skill-badge">JavaScript</span>
                <span className="skill-badge">React</span>
                <span className="skill-badge">Python</span>
                <span className="skill-badge">Mantine</span>
                <span className="skill-badge">C++</span>
                <span className="skill-badge">Laravel</span>
                <span className="skill-badge">PHP</span>
                <span className="skill-badge">HTML</span>
                <span className="skill-badge">CSS</span>
                <span className="skill-badge">MySQL</span>
                <span className="skill-badge">REST APIs</span>
                <span className="skill-badge">C#</span>

                <span className="skill-badge">Krita</span>
                <span className="skill-badge">Photoshop</span>
                <span className="skill-badge">Audacity</span>
                <span className="skill-badge">OpenToonz</span>
                <span className="skill-badge">After Effects</span>
                <span className="skill-badge">Figma</span>
                <span className="skill-badge">Blender</span>
                <span className="skill-badge">Gimp</span>
                <span className="skill-badge">Premiere Pro</span>
                <span className="skill-badge">DaVinci Resolve</span>
                <span className="skill-badge">Capcut</span>
                <br />

              </p>
              <p className="modal-paragraph-text">
                <b>Lovely Heart Pintes</b>, but you can also call me Lovely! I'm currently a third-year student at La Verdad Christian College
                studying Bachelor of Science in Information Systems. I love to take my
                combination of skills of technical and artsy skills to create beautiful
                things for the world that I am passionate about.
              </p>
              <p className="modal-paragraph-text sm-margin-top">
                In my free time you'll definitely catch me watching anime, J-drama and
                playing games. I also practice coding one or two hours a day and continuously
                work on improving my problem-solving skills and building real-world projects.
                May or may not also catch me going for strolls around my neighbohrhood.
              </p>



              <h2 className="modal-divider">──────── ✦ ────────</h2>



              {/* Achievements Section */}
              <h2 className="modal-paragraph-header">4th Regional Cybersecurity Conference</h2>
              <div className="image-about-wrapper">
                <img
                  className="base-image"
                  src="images/CTF.webp"
                  alt="4th Regional Cybersecurity Conference award image"
                  srcSet=""
                />
              </div>
              <p className="list-text">
                Our team proudly won Champion at the 4th Regional Cybersecurity Conference
                held at Holy Angel University, earning an impressive score of 3400 points.
                It was an incredible experience that tested our technical skills, teamwork,
                and problem-solving under pressure — a true reflection of our dedication to
                cybersecurity excellence.
              </p>

              <br />
              <h2 className="modal-paragraph-header">University Capture the Flag</h2>

              <div className="image-about-wrapper">
                <img
                  className="base-image"
                  src="images/UCTF.webp"
                  alt="University Capture the Flag competition image"
                  srcSet=""
                />
              </div>
              <p className="list-text">
                Our team proudly placed 37th in the UCTF (University Capture The Flag) competition —
                a national-level cybersecurity event that tested our skills in areas such as cryptography,
                web exploitation, reverse engineering, and forensics. Despite the tough competition, we
                demonstrated persistence, collaboration, and continuous learning throughout the challenge.
              </p>
              <br />
              <h2 className="modal-paragraph-header">IRCITE I.T. Marketing Challenge</h2>

              <div className="image-about-wrapper">
                <img
                  className="base-image"
                  src="images/ITMarketing.webp"
                  alt="IRCITE I.T. Marketing Challenge image"
                  srcSet=""
                />
              </div>
              <p className="list-text">
                Our team had the exciting opportunity to join the IRCITE I.T. Marketing Challenge,
                where we combined creativity, strategy, and technical knowledge to present an
                innovative marketing concept centered around technology and digital engagement.
              </p>

              <br />

            </div>
          </div>
        </div>


      </div>
      {/* Exit Button */}
      <button className="modal-exit-button" onClick={onClose}>
        <svg
          width="98"
          height="96"
          viewBox="0 0 98 96"
          className="exit-button-svg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="115.92"
            height="17.889"
            rx="8.94448"
            transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
            fill="currentColor"
          />
          <rect
            width="115.92"
            height="17.889"
            rx="8.94448"
            transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
            fill="currentColor"
          />
        </svg>
      </button>
    </div >
  );
};

export default AboutMeModal;