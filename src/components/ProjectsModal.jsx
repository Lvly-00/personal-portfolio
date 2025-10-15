import React from 'react';

const ProjectsModal = () => {
    return (
        <div className="work modal">
            <div className="modal-wrapper">
                <h1 className="modal-title">~ My Projects ~</h1>

                <div className="modal-content">
                    <div className="modal-content-wrapper">

                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/WIP.jpg"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href=""
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            LOELSKIEE
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "LOELSKIEE Photography — A sleek, responsive website showcasing my photography
                                        and video editing services with galleries, service packages, and booking info."
                                    </p>
                                    {/* <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Github Repo: <a
                        href="https://github.com/Lvly-00/LOELSKIEE-Portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                      >
                        https://github.com/Lvly-00/LOELSKIEE-Portfolio
                      </a>
                    </p> */}
                                    <a
                                        className="contact-link"
                                        href="https://github.com/Lvly-00"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            width="800"
                                            height="800"
                                            viewBox="0 0 800 800"
                                            fill="none"
                                            className="contact-svg github"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M700 400C700 565.687 565.687 700 400 700C234.315 700 100 565.687 100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400Z"
                                                stroke="currentColor"
                                                strokeWidth="66.6667"
                                            />
                                            <path
                                                d="M457.234 296.059C419.604 285.652 380.397 285.652 342.767 296.059C342.124 296.237 341.481 296.418 340.841 296.603C336.891 297.74 332.642 296.967 329.357 294.497C289.771 264.731 269.093 266.061 263.976 267.054C263.154 267.214 262.529 267.827 262.245 268.615C262.173 268.814 262.102 269.013 262.031 269.212C253.88 292.169 252.635 317.605 258.426 341.417C258.764 342.804 259.124 344.184 259.509 345.557C259.534 345.647 259.56 345.737 259.585 345.827C259.919 347.007 259.674 348.277 258.927 349.254C258.359 349.994 257.799 350.744 257.248 351.5C241.494 373.13 232.97 400.71 233.346 429.157C233.346 544.664 293.466 571.194 351.167 579.037L352.361 579.194C384.491 583.997 415.291 583.7 447.317 578.264L448.127 578.167C506.107 571.13 566.654 545.29 566.654 429.157C567.031 400.71 558.507 373.13 542.754 351.5C542.247 350.807 541.734 350.117 541.214 349.434L541.174 349.384C540.367 348.327 540.101 346.95 540.461 345.67C540.857 344.257 541.227 342.84 541.571 341.417C547.367 317.537 546.051 292.026 537.764 269.059C537.711 268.918 537.661 268.777 537.611 268.637C537.317 267.835 536.681 267.21 535.841 267.048C530.701 266.055 510.137 264.794 470.644 294.497C467.361 296.966 463.111 297.733 459.161 296.602C458.521 296.418 457.877 296.237 457.234 296.059Z"
                                                stroke="currentColor"
                                                strokeWidth="66.6667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                </div>
                            </div>
                        </div>


                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/sleepywears.png"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href="https://sleepywear-frontend.onrender.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            SleepyWears
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "SleepyWears is a web application that helps small businesses manage inventory,
                                        track income, analyze revenue trends, and generate professional downloadable invoices
                                        with an intuitive interface."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Backend Github Repo: <a
                                            href="https://github.com/Lvly-00/Sleepywear-Backend"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >https://github.com/Lvly-00/Sleepywear-Backend</a>
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Frontend Github Repo: <a
                                            href="https://github.com/Lvly-00/Sleepywear-Frontend"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >https://github.com/Lvly-00/Sleepywear-Frontend   </a>                 </p>
                                </div>
                            </div>
                        </div>

                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/HB.png"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href="https://github.com/LVCCWAD/Hi_Baby-"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            Hi Baby!
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "Hi Baby! — An e-commerce platform specializing in baby clothes, offering an
                                        easy-to-use shopping experience with product browsing, secure checkout, and
                                        order management for parents."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Github Repo: <a
                                            href="https://github.com/LVCCWAD/Hi_Baby-"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            https://github.com/LVCCWAD/Hi_Baby-
                                        </a>
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/Com.png"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href=""
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            Uniform Detection
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        L"Uniform Detection — A smart system that scans student IDs to verify authenticity
                                        and checks whether the uniform is complete. The system is disabled on wash days,
                                        as uniforms are not required during these days."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Github Repo: <a
                                            href="https://github.com/7078-cj/Uniform-Detection"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            https://github.com/7078-cj/Uniform-Detection
                                        </a>
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/AguhEd.png"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href=""
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            AguhEd
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "Aguhed — An innovative platform designed to enhance learning through gesture
                                        control and AI-powered features. It supports sign language translation and
                                        interactive tools, creating a more inclusive and engaging experience for all
                                        users."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Github Repo: <a
                                            href="https://github.com/7078-cj/AguhED"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            https://github.com/7078-cj/AguhED
                                        </a>
                                    </p>

                                </div>
                            </div>
                        </div>


                        <h2 className="modal-paragraph-header">──────── ✦ ────────</h2>


                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/RIAM.webp"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href="https://drive.google.com/drive/folders/1QqZQrz7KbAhhZjwX84hGcd7uG6FX80zK?fbclid=IwY2xjawNa4XJleHRuA2FlbQIxMQABHsakBsYS5JYCeXSr-po5ZtueRKOfG3fJNemQcDirA0Kas2pQuL5LHt4GjiMV_aem_NIGnsV4wh2rchEK3KsUFsw"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            Rat in a Maze
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "In 'Rat in a Maze,' a clever algorithm guides a virtual agent through a
                                        labyrinth of twists and turns. Amidst the maze, a mysterious disappearance
                                        draws the attention of Job, who must investigate what happened to Jamela.
                                        Combining logic, strategy, and suspense, every step uncovers clues that
                                        reveal the secrets hidden within the maze."                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Video Editor: Francois Dunga,
                                        Lovely Pintes,
                                        Nathaniel David
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Cast: Francois Dunga,
                                        Sofia Latina,
                                        Amber Rosana,
                                        Evangeline Angana,
                                        Lorlyn Boiser,
                                        Maffia Guaro,
                                        Margarette Calumpiano,
                                        Jilyanz Santillian,
                                        Job Bacani
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/piano.webp"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href="https://drive.google.com/drive/folders/1bnOhzptn2JIwy2215b5-784fZIgn6U67?fbclid=IwY2xjawNa6txleHRuA2FlbQIxMQABHhJ237NMW8zlwzCC68FaZq7GbIX0nds6Hv2ceV8X7GH_J8_ztsJEy4H8K8_K_aem_gIxyGeGYBJyXy-9h_NvyQA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}
                                        >
                                            Case 1229
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "Case 1229 picks up where 'Rat in a Maze' left off. Job returns to the labyrinth,
                                        but this time the stakes are higher: new twists, hidden passages, and cryptic
                                        clues point to a deeper mystery. As he navigates the maze, Job uncovers secrets
                                        about Jamela’s disappearance that challenge everything he thought he knew, blending
                                        logic, suspense, and a race against time to solve the case."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Video Editor: Francois Dunga,
                                        Lovely Pintes,
                                        Nathaniel David
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Cast: Francois Dunga,
                                        Sofia Latina,
                                        Amber Rosana,
                                        Evangeline Angana,
                                        Lorlyn Boiser,
                                        Maffia Guaro,
                                        Margarette Calumpiano,
                                        Jilyanz Santillian,
                                        Job Bacani
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="work-project">
                            <div className="work-project-wrapper">
                                <div className="work-image-wrapper">
                                    <img
                                        className="work-base-image"
                                        src="images/takeover.webp"
                                        alt=""
                                        srcSet=""
                                    />
                                </div>
                                <div className="paragraph-section">
                                    <h2 className="modal-paragraph-header">
                                        <a
                                            href="https://www.facebook.com/share/v/1A8gTBG8fr/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                                        >
                                            Takeover
                                        </a>
                                    </h2>
                                    <p className="modal-paragraph-text">
                                        "Takeover explores the dual nature of AI in our world. On one side, it imagines a
                                        dystopian future where AI dominates unchecked, reshaping society in unforeseen and
                                        dangerous ways. On the other, it shows the incredible potential of AI when guided
                                        responsibly—solving global problems, enhancing human creativity, and empowering communities.
                                        Through a gripping narrative, the film challenges us to consider how our choices today will
                                        shape tomorrow’s technology-driven world."
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Video Editor: Francois Dunga,
                                        Lovely Pintes
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Camera Director:
                                        Nathaniel David,
                                    </p>
                                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                                        Cast: Francois Dunga,
                                        Sofia Latina,
                                        Amber Rosana,
                                        Evangeline Angana,

                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
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



    );
};

export default ProjectsModal;