// import React, { useEffect, useState } from "react";
// import Questions from "./Questions";
// import logo from './assets/CLERKENWELL-removebg-preview.png'

// export default function Home() {
//   const [showApply, setShowApply] = useState(false);

//   let done = false;

//   const speed = 50;
//   const txt1 = "Welcome to Clerkenwell Bio Centre";
//   const txt2 =
//     "We are welcoming a few lucky guests to our underground research centre to see a new machine we've built. As you can see,";
//   const txt3 = " it might change your life..";

//   useEffect(() => {
//     function typeWriter() {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < txt1.length) {
//           document.getElementById("typewriter1").innerHTML += txt1.charAt(i);
//           i++;
//         } else {
//           clearInterval(interval);
//           typeWriter1();
//         }
//       }, speed);
//     }

//     function typeWriter1() {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < txt2.length) {
//           document.getElementById("typewriter2").innerHTML += txt2.charAt(i);
//           i++;
//         } else {
//           clearInterval(interval);
//           document
//             .getElementsByClassName("video")[0]
//             .classList.add("display-block");
//           setTimeout(() => {
//             typeWriter2();
//           }, 2000); // Delay before typing the third text and showing the video
//         }
//       }, speed);
//     }

//    function typeWriter2() {
//   let i = 0;
//   const interval = setInterval(() => {
//     if (i < txt3.length - 1) {
//       document.getElementById("typewriter2").innerHTML += txt3.charAt(i);
//       i++;
//     } else {
//       clearInterval(interval);
//       document
//         .getElementsByClassName("video")[0]
//         .classList.add("display-block");
//       setTimeout(() => {
//         done = true; // Set done flag to true after all animations complete
//         setShowApply(true); // Set showApply to true after all animations complete
//         localStorage.setItem("showApply", "true");
//       }, 1000); // Adjust the timing here as needed
//     }
//   }, speed);
// }

//     if (!done) {
//       done = true;
//       typeWriter();
//     }
//   }, []);

//   return (
//     <div className="text-center app-background">
//       <div>
//         <img src={logo} className="logo " alt="Vite logo" height="250px" />
//       </div>

//       <h3
//         id="typewriter1"
//         className="text-black"
//         style={{
//           fontSize: "20px",
//           fontWeight: "300",
//           fontFamily: "IBM Plex Mono",
//           marginTop: "-100px",
//         }}
//       ></h3>

//       <h3
//         id="typewriter2"
//         className="typewriter text-black mt-4"
//         style={{
//           fontSize: "20px",
//           fontWeight: "300",
//           fontFamily: "IBM Plex Mono",
//         }}
//       ></h3>

//       <section className="video mt-4" style={{ display: "none" }}>
//         <video
//           controls
//           src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//         ></video>
//       </section>
//       <section className="action">{showApply && <Questions />}</section>
//     </div>
//   );
// }

// Inside your component
import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import logo from "./assets/CLERKENWELL-removebg-preview.png";
import "./styles.css"; // Adjust the path as per your project structure
import Logo from "./Logo";

export default function Home() {
  const [showApply, setShowApply] = useState(false);

  let done = false;

  const speed = 50;
  const txt1 = "Welcome to Clerkenwell Bio Botanics:";
  const txt1B = " experts in groundbreaking biophysical research.";
  const txt2A =
    "We are welcoming a few lucky guests to our laboratory for a product showcase called...";
  const txt2B = "VEGETABLES.";

  const txt3A = "As you can see,";
  const txt3B = " it might change your life...";

  useEffect(() => {
    function typeWriter() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt1.length) {
          document.getElementById("typewriter1").innerHTML += txt1.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            typeWriter1();
          }, 1000);
        }
      }, speed);
    }

    function typeWriter1() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt1B.length) {
          document.getElementById("typewriter1").innerHTML += txt1B.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          // document
          //   .getElementsByClassName("video")[0]
          //   .classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            typeWriter2A();
          }, 1000); // Delay before typing the third text and showing the video
        }
      }, speed);
    }
    function typeWriter2A() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt2A.length) {
          document.getElementById("typewriter2").innerHTML += txt2A.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          // document
          //   .getElementsByClassName("video")[0]
          //   .classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            typeWriter2B();
          }, 1000); // Delay before typing the third text and showing the video
        }
      }, speed);
    }
    function typeWriter2B() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt2B.length) {
          document.getElementById("typewriter3").innerHTML += txt2B.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          // document
          //   .getElementsByClassName("video")[0]
          //   .classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            typeWriter3A();
          }, 1000); // Delay before typing the third text and showing the video
        }
      }, speed);
    }
    function typeWriter3A() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt3A.length) {
          document.getElementById("typewriter4").innerHTML += txt3A.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          document.getElementsByClassName("video")[0].classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            typeWriter3B();
          }, 2000); // Delay before typing the third text and showing the video
        }
      }, speed);
    }

    function typeWriter3B() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt3B.length) {
          document.getElementById("typewriter5").innerHTML += txt3B.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          document.getElementsByClassName("video")[0].classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            done = true; // Set done flag to true after all animations complete
            setShowApply(true); // Set showApply to true after all animations complete
            localStorage.setItem("showApply", "true");
          }, 3000); // Adjust the timing here as needed
        }
      }, speed);
    }

    if (!done) {
      done = true;
      typeWriter();
    }
  }, []);

  return (
    <div className="text-center app-background">
      <Logo />

      <div className="typewriter-container">
        <div className="typewriter-wrapper">
          <h3
            id="typewriter1"
            className="typewriter text-black text-left"
            style={{
              fontSize: "20px",
              fontWeight: "300",
              fontFamily: "Courier Prime",
              // marginTop: "-100px",
            }}></h3>

          <h3
            id="typewriter2"
            className="typewriter text-black mt-4"
            style={{
              fontSize: "20px",
              fontWeight: "300",
              fontFamily: "Courier Prime",
            }}></h3>
          <h3
            id="typewriter3"
            className="typewriter text-black mt-4"
            style={{
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Courier Prime",
            }}></h3>
          <h3
            id="typewriter4"
            className="typewriter text-black mt-4"
            style={{
              fontSize: "20px",
              fontWeight: "300",
              fontFamily: "Courier Prime",
            }}></h3>
          <h3
            id="typewriter5"
            className="typewriter text-black mt-4"
            style={{
              fontSize: "20px",
              fontWeight: "300",
              fontFamily: "Courier Prime",
            }}></h3>
        </div>
        <section className="video-container">
          <section className="video">
            {/* <iframe
              src="https://drive.google.com/file/d/1CYW0e5bT0who_oMngUzT8QPJIAnM-rQ8/preview"
              allow="autoplay"></iframe> */}

            {/* <video
              controls
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video> */}
            <video
              controls
              autoPlay
              playsInline
              webkitPlaysInline // Use camelCase for webkit attributes
            >
              <source
                src="https://res.cloudinary.com/dkcmv8onk/video/upload/v1715163646/V_Promo_Paul_music_mix_louder_v3_lowres_2_nwwpkq.mp4"
                type="video/mp4"
              />
            </video>
          </section>
        </section>
        <section className="action">{showApply && <Questions />}</section>
      </div>
    </div>
  );
}
