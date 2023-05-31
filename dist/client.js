// src/client.tsx
import {useEffect, useLayoutEffect, useRef} from "react";
import {Slot} from "@radix-ui/react-slot";
import ray from "./index";
function useRay(value, options = { replace: true, type: "send" }) {
  const rayRef = useRef(ray());
  useEffect(() => {
    if (options.replace !== true) {
      rayRef.current = ray();
    }
    rayRef.current[options.type ?? "send"](value);
  }, [value]);
}
function useRayWithElement(ref, dependencies = [], options = { replace: true }) {
  const rayRef = useRef(ray());
  const innerRef = useRef(null);
  useLayoutEffect(() => {
    if (!options.replace) {
      rayRef.current = ray();
    }
    if (ref?.current) {
      rayRef.current.html(ref.current.innerHTML);
    } else if (innerRef.current) {
      rayRef.current.html(innerRef.current.innerHTML);
    }
  }, dependencies);
  return innerRef;
}
function Ray({ children, dependencies }) {
  const ref = useRef(null);
  useRayWithElement(ref, dependencies);
  return jsxDEV(Slot, {
    ref,
    children
  }, undefined, false, undefined, this);
}
import {
jsxDEV
} from "react/jsx-dev-runtime";
var client_default = ray;
export {
  useRayWithElement,
  useRay,
  client_default as default,
  Ray
};

//# debugId=EDEE96A90003FB0164756e2164756e21
