import React, { FunctionComponent, useEffect, useRef } from "react";
import { ReactComponent as LoaderSVG } from "images/loader.svg";
import { LoaderWrapper } from "./Loader.components";
import { gsap } from "gsap";

const Loader: FunctionComponent = () => {
  const ref = useRef<null | SVGSVGElement>(null);

  useEffect(() => {
    const calendars = ref?.current?.children;
    const tl = gsap.timeline({ repeat: -1 });

    if (!calendars) return;
    tl.to(calendars, {
      duration: 0.5,
      stagger: 0.3,
      transformOrigin: "50% 50%",
      scale: 0.75,
    }).to(
      calendars,
      {
        duration: 0.5,
        stagger: 0.3,
        transformOrigin: "50% 50%",
        scale: 1,
      },
      "-=0.5"
    );
  }, []);

  return (
    <LoaderWrapper>
      <LoaderSVG ref={ref} />
    </LoaderWrapper>
  );
};

export default Loader;
