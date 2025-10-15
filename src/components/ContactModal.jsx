import React from 'react';

const ContactModal = () => {
  return (
    <div className="contact modal">
      <div className="modal-wrapper">
        <h1 className="modal-title">~ Contact Me! ~</h1>

        <div className="modal-content">
          <div className="modal-content-wrapper">
            <div className="paragraph-section">
              <h2 className="modal-paragraph-header xsm-margin-top">
                If you like coding, music, games, and food, let's connect!
              </h2>
              
              <div className="contact-button-wrapper">
                {/* Email Link */}
                <a
                  className="contact-link"
                  href="mailto:galacticabaddon@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send an email to galacticaabaddon@gmail.com"
                >
                  <svg className="contact-svg mail" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M656.85 209.817C608.726 166.348 527.66 150 400 150C272.34 150 191.272 166.348 143.15 209.817M656.85 209.817C700.01 248.804 716.666 309.608 716.666 400C716.666 591.177 642.156 650 400 650C157.843 650 83.333 591.177 83.333 400C83.333 309.608 99.9903 248.804 143.15 209.817M656.85 209.817L447.14 419.527C421.103 445.56 378.893 445.56 352.86 419.527L143.15 209.817" stroke="currentColor" strokeWidth="66.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                
                {/* GitHub Link */}
                <a
                  className="contact-link"
                  href="https://github.com/Lvly-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to Lvly-00's GitHub profile"
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
                
                {/* LinkedIn Link */}
                <a
                  className="contact-link"
                  href="https://www.linkedin.com/in/lovely-pintes-3b40962bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to Lovely Pintes' LinkedIn profile"
                >
                  <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    className="contact-svg linkedin"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_371_15)">
                      <path
                        d="M600 100C655.23 100 700 144.772 700 200V600C700 655.23 655.23 700 600 700H200C144.772 700 100 655.23 100 600V200C100 144.772 144.772 100 200 100H600ZM600 166.667H200C181.591 166.667 166.667 181.591 166.667 200V600C166.667 618.41 181.591 633.333 200 633.333H600C618.41 633.333 633.333 618.41 633.333 600V200C633.333 181.591 618.41 166.667 600 166.667ZM266.667 333.333C283.761 333.333 297.85 346.201 299.776 362.779L300 366.667V533.333C300 551.743 285.076 566.667 266.667 566.667C249.572 566.667 235.483 553.799 233.558 537.221L233.333 533.333V366.667C233.333 348.257 248.257 333.333 266.667 333.333ZM366.667 300C383.043 300 396.66 311.809 399.47 327.376C406.21 323.478 413.167 319.964 420.223 316.946C442.463 307.432 475.773 302.198 505.83 311.65C521.587 316.603 537.44 325.969 549.193 341.853C559.682 356.034 565.33 373.28 566.456 392.642L566.667 400V533.333C566.667 551.74 551.743 566.667 533.333 566.667C516.238 566.667 502.15 553.796 500.224 537.22L500 533.333V400C500 389.023 497.337 383.857 495.6 381.503C493.81 379.087 490.913 376.843 485.837 375.247C474.227 371.597 457.537 373.493 446.443 378.24C429.742 385.383 414.491 396.571 404.131 406.945L400 411.327V533.333C400 551.743 385.077 566.667 366.667 566.667C349.572 566.667 335.483 553.799 333.558 537.221L333.333 533.333V333.333C333.333 314.924 348.257 300 366.667 300ZM266.667 233.333C285.076 233.333 300 248.257 300 266.667C300 285.076 285.076 300 266.667 300C248.257 300 233.333 285.076 233.333 266.667C233.333 248.257 248.257 233.333 266.667 233.333Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_371_15">
                        <rect width="800" height="800" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
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

export default ContactModal;