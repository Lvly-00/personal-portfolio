import React from 'react';

// --- Resume Download Icon Component (SVG) ---
const DownloadIcon = ({ className = "" }) => (
  <svg 
        width="800"
        height="800" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className} 
    >
        {/* File/Document shape: A rectangle with a folded corner */}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        
        {/* Download Arrow over the file */}
        <line x1="12" y1="17" x2="12" y2="10" />
        <polyline points="9 14 12 17 15 14" />
    </svg>
);
// ------------------------------------------

const UtilityToggles = ({ resumePdfPath = "path/to/your/resume.pdf" }) => {
    return (
        <>
            <div className="overlay"></div>
            
            {/* --- Mute Toggle Button --- */}
            <button className="mute-toggle-button toggle-buttons">
                {/* Sound Off SVG */}
                <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    fill="none"
                    className="sound-svg sound-off-svg"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M366.064 567.04C430.064 624 508.464 663.04 545.584 650.56C612.784 625.6 623.984 490.557 623.984 397.117C623.984 371.197 623.984 341.76 620.464 312.641"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M596.134 200.963C592.038 188.521 585.44 177.047 576.746 167.252C568.051 157.456 557.443 149.545 545.578 144.002C506.218 129.282 422.698 175.999 353.578 237.119H302.375C268.427 237.119 235.87 250.606 211.865 274.611C187.86 298.616 174.375 331.171 174.375 365.12V429.12C174.365 453.795 181.488 477.952 194.887 498.672C208.285 519.395 227.387 535.802 249.894 545.92"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M720 77.4414L80 717.44"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Sound On SVG */}
                <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    fill="none"
                    className="sound-svg sound-on-svg"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M417.578 144.002C378.218 129.282 294.696 175.999 225.576 237.119H174.375C140.427 237.119 107.87 250.606 83.8653 274.611C59.8605 298.616 46.375 331.171 46.375 365.12V429.12C46.375 463.066 59.8605 495.626 83.8653 519.632C107.87 543.635 140.427 557.12 174.375 557.12H225.576C293.096 619.2 376.618 664.96 417.578 650.56C484.778 625.6 495.974 490.56 495.974 397.12C495.974 303.679 484.778 168.962 417.578 144.002Z"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M677.127 215.039C725.098 263.044 752.049 328.134 752.049 396C752.049 463.866 725.098 528.957 677.127 576.96"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M609.252 510.4C639.246 480.394 656.097 439.703 656.097 397.277C656.097 354.851 639.246 314.165 609.252 284.16"
                        strokeWidth="85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* --- Theme Toggle Button --- */}
            <button className="theme-toggle-button toggle-buttons">
                {/* Sun SVG */}
                <svg className="sun-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M733.333 550H66.666M666.666 666.667H133.333M399.999 100V166.667M133.333 433.333H66.666M210.47 243.804L163.329 196.663M589.516 243.804L636.659 196.663M733.333 433.333H666.666M233.333 433.333C233.333 341.287 307.952 266.667 399.999 266.667C492.046 266.667 566.666 341.287 566.666 433.333" strokeWidth="85" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Moon SVG */}
                <svg className="moon-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M446.619 254.869C449.832 245.908 462.666 245.908 465.879 254.869L474.669 279.371C475.699 282.239 477.983 284.495 480.886 285.511L505.696 294.193C514.766 297.368 514.766 310.04 505.696 313.215L480.886 321.897C477.983 322.913 475.699 325.169 474.669 328.038L465.879 352.54C462.666 361.5 449.832 361.5 446.619 352.54L437.829 328.038C436.799 325.169 434.516 322.913 431.612 321.897L406.803 313.215C397.733 310.04 397.733 297.368 406.803 294.193L431.612 285.511C434.516 284.495 436.799 282.239 437.829 279.371L446.619 254.869Z" fill="currentColor" />
                    <path d="M543.581 363.74C545.724 357.766 554.278 357.766 556.421 363.74L562.281 380.073C562.968 381.986 564.491 383.49 566.427 384.166L582.964 389.956C589.014 392.073 589.014 400.52 582.964 402.636L566.427 408.423C564.491 409.103 562.968 410.606 562.281 412.52L556.421 428.853C554.278 434.826 545.724 434.826 543.581 428.853L537.721 412.52C537.034 410.606 535.511 409.103 533.574 408.423L517.037 402.636C510.987 400.52 510.987 392.073 517.037 389.956L533.574 384.166C535.511 383.49 537.034 381.986 537.721 380.073L543.581 363.74Z" fill="currentColor" />
                    <path d="M592.31 109.728C596.963 96.7573 615.537 96.7573 620.19 109.728L636.14 154.184C637.627 158.335 640.937 161.602 645.14 163.073L690.15 178.825C703.283 183.421 703.283 201.764 690.15 206.36L645.14 222.112C640.937 223.583 637.627 226.85 636.14 231.002L620.19 275.457C615.537 288.428 596.963 288.428 592.31 275.457L576.36 231.002C574.873 226.85 571.563 223.583 567.36 222.112L522.35 206.36C509.217 201.764 509.217 183.421 522.35 178.825L567.36 163.073C571.563 161.602 574.873 158.335 576.36 154.184L592.31 109.728Z" fill="currentColor" />
                    <path d="M100 448.657C100 587.47 215.807 700 358.66 700C468.637 700 562.58 633.31 600 539.277C570.363 552.803 537.27 560.363 502.363 560.363C375.38 560.363 272.441 460.337 272.441 336.947C272.441 285.342 290.446 237.824 320.685 200C195.834 217.85 100 322.377 100 448.657Z" strokeWidth="85" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* --- Resume Download Button (New) --- */}
            {/* The <a> tag makes it a link, 'download' attribute forces download */}
            
            <a 
                href={resumePdfPath} 
                download 
                className="resume-download-link-button toggle-buttons" 
                aria-label="Download Resume"
            >
                <DownloadIcon className="resume-download-svg" />
            </a>
        </>
    );
};

export default UtilityToggles;