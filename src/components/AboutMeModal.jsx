import React from 'react';

const AboutMeModal = () => {
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
              <br/>
              <p className="modal-paragraph-text">
                <b>Lovely Heart Pintes</b>, but you can also call me
                Lovely! I'm currently a third-year student at La Verdad Christian College
                studying information systems. I love to take my combination of skills of
                technical and artsy skills to create beautiful things for the world that I am
                passionate about.
              </p>
              <p className="modal-paragraph-text sm-margin-top">
                In my free time you'll definitely catch me watching anime, J-drama and
                playing games. I also practice coding one or two hours a day and continuously
                work on improving my problem-solving skills and building real-world projects.
                May or may not also catch me going for strolls around my neighbohrhood.
              </p>
              <h2 className="modal-paragraph-header">──────── ✦ ────────</h2>

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
                Our team proudly won **Champion** at the 4th Regional Cybersecurity Conference
                held at Holy Angel University, earning an impressive score of 3400 points.
                It was an incredible experience that tested our technical skills, teamwork,
                and problem-solving under pressure — a true reflection of our dedication to
                cybersecurity excellence.
              </p>

              <br/>
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
                Our team proudly placed **37th** in the UCTF (University Capture The Flag) competition —
                a national-level cybersecurity event that tested our skills in areas such as cryptography,
                web exploitation, reverse engineering, and forensics. Despite the tough competition, we
                demonstrated persistence, collaboration, and continuous learning throughout the challenge.
              </p>
              <br/>
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

              <br/>

              {/* Skills Section */}
              <h2 className="modal-paragraph-header-2">Skills and Expertise:</h2>
              <ul>
                <li className="list-text-2">
                  Proficient in **JavaScript, React, and Python**, with experience in both frontend and backend development.
                </li>
                <li className="list-text-2">
                  Skilled in **UI/UX design, animation, and creative storytelling** through digital art and visuals.
                </li>
                <li className="list-text-2">
                  Passionate about continuous learning — from cybersecurity to interactive 3D web experiences.
                </li>
              </ul>

              <h2 className="modal-paragraph-header-2">Core Programming:</h2>
              <ul>
                <li className="list-text-2">**React.js** → Frontend development with Vite + Mantine</li>
                <li className="list-text-2">**Laravel / PHP** → Backend web development, APIs</li>
                <li className="list-text-2">**HTML / CSS / Tailwind** → UI styling and responsive design</li>
                <li className="list-text-2">Databases & APIs (**MySQL**, **REST APIs**)</li>
                <li className="list-text-2">**Python** → Automation, scripting, and CTF challenges</li>
                <li className="list-text-2">**C++** → Performance-heavy coding, algorithms, problem-solving</li>
                <li className="list-text-2">**C#** → Unity and application development</li>
              </ul>

              <h2 className="modal-paragraph-header-2">Cybersecurity:</h2>
              <ul>
                <li className="list-text-2">
                  <strong>Web Exploitation:</strong> SQL Injection, XSS, Command Injection, Authentication Bypass
                </li>
                <li className="list-text-2">
                  <strong>Cryptography:</strong> Classic Ciphers (Caesar, Vigenère), Modern Crypto (RSA, AES, ECC basics), Hash Cracking (MD5, SHA-1)
                </li>
                <li className="list-text-2">
                  <strong>Forensics:</strong> File Analysis, Packet Capture Analysis (Wireshark, PCAP), Steganography
                </li>
                <li className="list-text-2">
                  <strong>Reverse Engineering:</strong> Binary Analysis (Ghidra, IDA Free, Radare2), Decompiling & Debugging, Malware Basics
                </li>
                <li className="list-text-2">
                  <strong>Pwn/Exploitation:</strong> Buffer Overflow, Format String Exploits, Memory Corruption
                </li>
                <li className="list-text-2">
                  <strong>OSINT:</strong> Social Media Reconnaissance, Public Data Gathering, Google Dorking
                </li>
                <li className="list-text-2">
                  <strong>Misc / General:</strong> Python Scripting, CTF Tools (CyberChef, Strings, Binwalk), Puzzle / Logic challenges
                </li>
              </ul>

              <h2 className="modal-paragraph-header-2">Design & Animation:</h2>
              <ul>
                <li className="list-text-2">
                  <strong>2D Art & Animation:</strong> Digital Drawing & Illustration, Character Design, Storyboarding, 2D Animation (frame-by-frame / motion)
                  <em>Tools:</em> Krita, Photoshop, Illustrator, Toon Boom, After Effects
                </li>
                <li className="list-text-2">
                  <strong>3D Modeling & Animation:</strong> Hard Surface Modeling, Organic Modeling, Texturing, Rigging, 3D Animation, Sculpting
                  <em>Tools:</em> Blender, Maya, 3ds Max
                </li>
                <li className="list-text-2">
                  <strong>Visual Effects & Editing:</strong> Compositing, Motion Graphics, Particle Simulation, Green Screen, Cinematic Camera & Lighting, Video Editing
                  <em>Tools:</em> After Effects, Premiere Pro, DaVinci Resolve, Nuke
                </li>
                <li className="list-text-2">
                  <strong>Creative Media Integration:</strong> 2D + 3D hybrid, VFX for coding/game projects, UI/UX Design, Animation for storytelling
                </li>
              </ul>

              <h2 className="modal-paragraph-header-2">Soft Skills:</h2>
              <ul>
                <li className="list-text-2">
                  <strong>Core Soft Skills:</strong> Teamwork, Problem-Solving, Creativity, Communication
                </li>
                <li className="list-text-2">
                  <strong>Growth & Work Skills:</strong> Adaptability, Time Management, Leadership, Critical Thinking, Resilience
                </li>
                <li className="list-text-2">
                  <strong>Professional Skills:</strong> Presentation Skills, Collaboration Tools (GitHub, Trello, Discord), Documentation, Attention to Detail
                </li>
                <li className="list-text-2">
                  <strong>Personal Qualities:</strong> Curiosity, Self-Motivation, Open-Mindedness, Patience
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exit Button */}
        <button className="modal-exit-button">
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
      </div>
    </div>
  );
};

export default AboutMeModal;