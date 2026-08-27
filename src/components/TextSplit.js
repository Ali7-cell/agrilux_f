"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextSplit({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  stagger = 0.02,
  style = {},
  ...props
}) {
  const elRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = elRef.current;
    if (!el) return;

    const text = el.innerText || el.textContent;
    if (!text) return;

    // Split text into spans for each character
    const chars = [];
    el.innerHTML = "";

    const words = text.split(" ");
    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(8px)";
        charSpan.style.transition = "none";
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      el.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const space = document.createTextNode(" ");
        el.appendChild(space);
      }
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: {
        each: stagger,
        from: "random",
      },
      delay: delay,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [children, delay, stagger]);

  return (
    <Component ref={elRef} className={className} style={style} {...props}>
      {children}
    </Component>
  );
}
