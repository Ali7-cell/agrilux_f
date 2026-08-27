"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const frameUrlsPlant = [
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866c7b4232e602f2522_soon_00000.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886646aeb14b047b8c7d_soon_00001.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866d12be9d1c53b75b6_soon_00002.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88660194235c3f611ab2_soon_00003.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88661f7ccb26c2c92fcf_soon_00004.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866651effb0fb6ce5f0_soon_00005.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866bfba5a51fecbb2a0_soon_00006.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886665ef7e2e4aa72005_soon_00007.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88661241f43a60e625fe_soon_00008.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866d5ec8c5699289321_soon_00009.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88666910c395644283d7_soon_00010.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866602180e66322f307_soon_00011.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a965356eac47e263a_soon_00012.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88661062ffbb1ba647e0_soon_00013.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866ae1578ad521d4c3d_soon_00014.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886646aeb14b047b8c9a_soon_00015.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886de739f2eb52c1519d_soon_00016.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886605bb52c764703326_soon_00017.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886625ccf0f66b39eeab_soon_00018.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866897d930488a5926b_soon_00019.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866fd92e4fa86cc331a_soon_00020.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886645b8c4cf7f6041bf_soon_00021.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886687613cac751277bc_soon_00022.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866acd92d4676e48599_soon_00023.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88661d0dcc80e3c9cbfd_soon_00024.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886628fbbd90ec6f2d51_soon_00025.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88662b78fc984a81fca2_soon_00026.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866c930df063afd1550_soon_00027.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8866cf2009e9bc2a8668_soon_00028.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88664c90c257a5aa7bb2_soon_00029.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88666ea8e1916dfde9d8_soon_00030.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867714d802bc3f8b191_soon_00031.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867b6c7f42b76dd06bc_soon_00032.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886771646c53e313210c_soon_00033.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867bd51a5f112763bc6_soon_00034.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867f91ec5dd7a9b1e4b_soon_00035.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886797ecb86fc73e6ffb_soon_00036.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867480df0eb556ca28b_soon_00037.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88672f1c6e4ca9f37088_soon_00038.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88675bd9347202b46d24_soon_00039.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867308181c24dae084f_soon_00040.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886732e41fa173fb0d43_soon_00041.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867d3ec3c0a7a9c032c_soon_00042.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867ded83bd5814e2dac_soon_00043.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88671bd7e56a119c9f36_soon_00044.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8867b1c7323cc6d7ecd9_soon_00045.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886839ab32abbaa7635e_soon_00046.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88686d1e59686b78362b_soon_00047.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868121820e1e0b5db2c_soon_00048.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868cd001cf6cb33c1d3_soon_00049.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88685c7157f1ed8da264_soon_00050.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886898c3f04697ff52db_soon_00051.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868560b1c81e002773e_soon_00052.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868856ad1d61df77c5e_soon_00053.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88680edf963ea38b950a_soon_00054.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868586ee629f9e3990c_soon_00055.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88683d4851660c532bae_soon_00056.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8868e7cbe0feb720e22c_soon_00057.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88681260f04fc2d73d31_soon_00058.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88683dc4aeed727b1fc1_soon_00059.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886980c0130cf6df35dd_soon_00060.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88687605343ea85a13e3_soon_00061.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88698986af1829838e84_soon_00062.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8869fe688b394c673aab_soon_00063.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886af91ec5dd7a9b2083_soon_00064.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88694a0c2d19329cda78_soon_00065.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88694eabaae56b847d1a_soon_00066.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8869583bec67e81bc21e_soon_00067.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8869dc01f11c81c6053c_soon_00068.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886980c0130cf6df35fd_soon_00069.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa8869fedbfa31d9917dac_soon_00070.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886afc33d7be328b9ddd_soon_00071.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a956b5d3aafa0ecc1_soon_00072.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a83c4788236703e64_soon_00073.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886ace86a11ef4fd0e39_soon_00074.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a895653cb4cc0ed45_soon_00075.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a409fde0499730d5b_soon_00076.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a5fe05fcafc23ecee_soon_00077.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886aefea2cf1c387d8da_soon_00078.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886a3c67b4df0e846c2e_soon_00079.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886bded83bd5814e2e78_soon_00080.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b80554e630f310343_soon_00081.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b7d259072245095a6_soon_00082.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b13bc8cf9464705f8_soon_00083.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b9d1f30952bddf3ac_soon_00084.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886bbaac5fbe166f70e2_soon_00085.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b7160739d502dc2b9_soon_00086.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886b4aea35091e33f696_soon_00087.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886cbd51a5f112763c8d_soon_00088.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c79876f063a1258fa_soon_00089.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c34d7b4adaeaa2c9f_soon_00090.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88798bf9ba36ad25cd1c_soon_00091.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c1bd7e56a119c9fd2_soon_00092.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c0e7efb696d57ef14_soon_00093.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c28fbbd90ec6f2f0e_soon_00094.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c5b25547aa8ea5199_soon_00095.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886c9083168bb153259c_soon_00096.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886d8986af1829838fdc_soon_00097.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886dae6ace087be13510_soon_00098.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886dc8a065dffe06a5d0_soon_00099.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886d9991755871844c0c_soon_00100.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886d1feabf2f1e87c290_soon_00101.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886d201a6f422c4ceba1_soon_00102.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886d9e84e0fff4f52deb_soon_00103.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e9e84e0fff4f52e14_soon_00104.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e1da89caec16e5321_soon_00105.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e5c7157f1ed8da40c_soon_00106.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e65ef7e2e4aa722f8_soon_00107.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e9f776a5723a039f5_soon_00108.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e1feabf2f1e87c2ca_soon_00109.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886eddf35a9a27a8f100_soon_00110.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886e2b1ad83cba7eff18_soon_00111.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886f05e4df730dd7af56_soon_00112.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886f147c29e210ca330e_soon_00113.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886f0e7efb696d57efb7_soon_00114.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886f7d2590722450967a_soon_00115.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886fded83bd5814e2ef7_soon_00116.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886fb70221ae675322e4_soon_00117.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886f9a88b0c2b55c7fac_soon_00118.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa886fd9caa1cea06a0293_soon_00119.avif"
];

const FRAMES_PER_CLICK = 25;
const TWEEN_DURATION = 1.2;

export default function PlantGrowthCanvas() {
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [headingText, setHeadingText] = useState("Watch Your Crops Flourish with AI");
  const imagesRef = useRef([]);

  const total = frameUrlsPlant.length;
  const totalClicks = Math.ceil((total - 1) / FRAMES_PER_CLICK);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let loaded = 0;
    const imgs = [];

    frameUrlsPlant.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imgs[i] = img;
        loaded++;
        if (loaded === total) {
          imagesRef.current = imgs;
          setIsReady(true);
          drawFrame(0, imgs);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          imagesRef.current = imgs;
          setIsReady(true);
        }
      };
    });

    function drawFrame(idx, imgsList) {
      const img = imgsList[idx];
      if (!img || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      const scale = Math.max(cw / img.width, ch / img.height);
      const x = (cw - img.width * scale) / 2;
      const y = (ch - img.height * scale) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleNourishClick = () => {
    if (animating || !isReady || currentFrame >= total - 1) return;

    setAnimating(true);
    const nextFrame = Math.min(currentFrame + FRAMES_PER_CLICK, total - 1);
    setClickCount((prev) => prev + 1);

    const frameObj = { f: currentFrame };

    gsap.to(frameObj, {
      f: nextFrame,
      duration: TWEEN_DURATION,
      ease: "power1.inOut",
      onUpdate: () => {
        const frameIdx = Math.round(frameObj.f);
        setCurrentFrame(frameIdx);

        const canvas = canvasRef.current;
        if (canvas && imagesRef.current[frameIdx]) {
          const ctx = canvas.getContext("2d");
          const dpr = window.devicePixelRatio || 1;
          const cw = canvas.width / dpr;
          const ch = canvas.height / dpr;
          const img = imagesRef.current[frameIdx];
          const scale = Math.max(cw / img.width, ch / img.height);
          const x = (cw - img.width * scale) / 2;
          const y = (ch - img.height * scale) / 2;
          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      },
      onComplete: () => {
        setAnimating(false);
        if (nextFrame >= total - 1) {
          setHeadingText("Full Harvest Potential Unlocked!");
        }
      },
    });
  };

  const progressPercent = Math.min((clickCount / totalClicks) * 100, 100);

  return (
    <section
      style={{
        backgroundColor: "#F4EDE6",
        color: "#404F1D",
        padding: "5rem 1.88em",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <span
          style={{
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#636F3D",
            fontWeight: 600,
          }}
        >
          INTERACTIVE GROWTH SIMULATION
        </span>

        <h2
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            fontWeight: 500,
            color: "#636F3D",
            margin: "0.75rem 0 1.5rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {headingText}
        </h2>

        <p
          style={{
            fontSize: "1.15rem",
            color: "#4C5B20",
            maxWidth: "650px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.5,
          }}
        >
          Click <strong style={{ color: "#404F1D" }}>Nourish & Grow</strong> to feed AI-calculated nutrient cycles into the soil and observe full crop maturity in real-time.
        </p>

        {/* Growth Canvas Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            height: "450px",
            margin: "0 auto 2.5rem",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(64, 79, 29, 0.12)",
            backgroundColor: "#E5DDD3",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              opacity: isReady ? 1 : 0.3,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Water drop progress indicator */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#404F1D",
            }}
          >
            <span>💧</span>
            <span>{Math.round(progressPercent)}% Growth</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNourishClick}
          disabled={animating || !isReady || currentFrame >= total - 1}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1.1rem 2.2rem",
            borderRadius: "50px",
            backgroundColor: currentFrame >= total - 1 ? "#7C914C" : "#404F1D",
            color: "#F4EDE6",
            fontSize: "0.95rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            border: "none",
            cursor: currentFrame >= total - 1 ? "default" : "pointer",
            boxShadow: "0 8px 24px rgba(64, 79, 29, 0.25)",
            transition: "all 0.3s ease",
            opacity: animating ? 0.7 : 1,
          }}
        >
          <span>🌱</span>
          {currentFrame >= total - 1
            ? "Crop Fully Grown"
            : animating
            ? "Nourishing Soil..."
            : "Nourish & Grow Crop"}
        </button>
      </div>
    </section>
  );
}
