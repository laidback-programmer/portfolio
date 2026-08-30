"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

type Origin =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "both";

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const originToFlip = (origin: Origin): [number, number] => {
  switch (origin) {
    case "top-left":
      return [1, 0];

    case "bottom-right":
      return [0, 1];

    case "bottom-left":
      return [1, 1];

    default:
      return [0, 0];
  }
};

const SideRays = ({
  speed = 2.5,
  rayColor1 = "#EAB308",
  rayColor2 = "#96c8ff",
  intensity = 2,
  spread = 2,
  origin = "top-right",
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 2.0,
  opacity = 1.0,
  className = "",
}: SideRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<
    string,
    { value: number | number[] }
  > | null>(null);

  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  const cleanupFunctionRef = useRef<(() => void) | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  /*
   * Detect whether the component is visible.
   * WebGL is only initialized when the effect is actually visible.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  /*
   * Initialize WebGL only while visible.
   */
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise<void>((resolve) => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
      });

      rendererRef.current = renderer;

      const gl = renderer.gl;

      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      containerRef.current.appendChild(gl.canvas);

      const vert = `
        attribute vec2 position;

        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = `
        precision highp float;

        uniform float iTime;
        uniform vec2 iResolution;

        uniform float iSpeed;

        uniform vec3 iRayColor1;
        uniform vec3 iRayColor2;

        uniform float iIntensity;
        uniform float iSpread;

        uniform float iFlipX;
        uniform float iFlipY;
        uniform float iBoth;

        uniform float iTilt;
        uniform float iSaturation;
        uniform float iBlend;
        uniform float iFalloff;
        uniform float iOpacity;

        float rayStrength(
          vec2 raySource,
          vec2 rayRefDirection,
          vec2 coord,
          float seedA,
          float seedB,
          float speed
        ) {
          vec2 sourceToCoord = coord - raySource;

          float cosAngle =
            dot(
              normalize(sourceToCoord),
              rayRefDirection
            );

          return clamp(
            (
              0.45 +
              0.15 *
              sin(
                cosAngle * seedA +
                iTime * speed
              )
            ) +
            (
              0.3 +
              0.2 *
              cos(
                -cosAngle * seedB +
                iTime * speed
              )
            ),
            0.0,
            1.0
          )
          *
          clamp(
            (
              iResolution.x -
              length(sourceToCoord)
            ) / iResolution.x,
            0.5,
            1.0
          );
        }

        vec4 calculateRays(
          vec2 coord,
          vec2 rayPos,
          vec2 rayRefDirection1,
          vec2 rayRefDirection2
        ) {
          vec4 rays1 =
            vec4(iRayColor1, 1.0) *
            rayStrength(
              rayPos,
              rayRefDirection1,
              coord,
              36.2214,
              21.11349,
              iSpeed
            );

          vec4 rays2 =
            vec4(iRayColor2, 1.0) *
            rayStrength(
              rayPos,
              rayRefDirection2,
              coord,
              22.3991,
              18.0234,
              iSpeed * 0.2
            );

          return (
            rays1 *
            (1.0 - iBlend) *
            0.9
          )
          +
          (
            rays2 *
            iBlend *
            0.9
          );
        }

        void main() {
          vec2 fragCoord = gl_FragCoord.xy;

          /*
           * Normal single-origin mode
           */
          if (iBoth < 0.5) {
            if (iFlipX > 0.5) {
              fragCoord.x =
                iResolution.x -
                fragCoord.x;
            }

            if (iFlipY > 0.5) {
              fragCoord.y =
                iResolution.y -
                fragCoord.y;
            }
          }

          vec2 coord =
            vec2(
              fragCoord.x,
              iResolution.y - fragCoord.y
            );

          float tiltRad =
            iTilt *
            3.14159265 /
            180.0;

          float cs = cos(tiltRad);
          float sn = sin(tiltRad);

          /*
           * TOP RIGHT
           */
          vec2 rayPosRight =
            vec2(
              iResolution.x * 1.1,
              -0.5 * iResolution.y
            );

          vec2 relRight =
            coord -
            rayPosRight;

          vec2 tiltedRight =
            vec2(
              relRight.x * cs -
              relRight.y * sn,

              relRight.x * sn +
              relRight.y * cs
            ) +
            rayPosRight;

          float halfSpread =
            iSpread *
            0.275;

          vec2 rightDir1 =
            normalize(
              vec2(
                cos(
                  0.785398 +
                  halfSpread
                ),

                sin(
                  0.785398 +
                  halfSpread
                )
              )
            );

          vec2 rightDir2 =
            normalize(
              vec2(
                cos(
                  0.785398 -
                  halfSpread
                ),

                sin(
                  0.785398 -
                  halfSpread
                )
              )
            );

          /*
           * TOP LEFT
           *
           * Mirror the X direction of the
           * right-side ray directions.
           */
          vec2 rayPosLeft =
            vec2(
              -0.1 * iResolution.x,
              -0.5 * iResolution.y
            );

          vec2 relLeft =
            coord -
            rayPosLeft;

          vec2 tiltedLeft =
            vec2(
              relLeft.x * cs -
              relLeft.y * sn,

              relLeft.x * sn +
              relLeft.y * cs
            ) +
            rayPosLeft;

          vec2 leftDir1 =
            normalize(
              vec2(
                -cos(
                  0.785398 +
                  halfSpread
                ),

                sin(
                  0.785398 +
                  halfSpread
                )
              )
            );

          vec2 leftDir2 =
            normalize(
              vec2(
                -cos(
                  0.785398 -
                  halfSpread
                ),

                sin(
                  0.785398 -
                  halfSpread
                )
              )
            );

          vec4 color;

          /*
           * BOTH SIDES
           */
          if (iBoth > 0.5) {
            vec4 rightRays =
              calculateRays(
                tiltedRight,
                rayPosRight,
                rightDir1,
                rightDir2
              );

            vec4 leftRays =
              calculateRays(
                tiltedLeft,
                rayPosLeft,
                leftDir1,
                leftDir2
              );

            color =
              (rightRays + leftRays) *
              0.55;

            /*
             * Distance-based brightness
             * from both light sources.
             */
            float rightDistance =
              length(
                fragCoord -
                vec2(
                  rayPosRight.x,
                  iResolution.y -
                  rayPosRight.y
                )
              ) /
              iResolution.y;

            float leftDistance =
              length(
                fragCoord -
                vec2(
                  rayPosLeft.x,
                  iResolution.y -
                  rayPosLeft.y
                )
              ) /
              iResolution.y;

            float rightBrightness =
              iIntensity *
              0.4 /
              pow(
                max(
                  rightDistance,
                  0.001
                ),
                iFalloff
              );

            float leftBrightness =
              iIntensity *
              0.4 /
              pow(
                max(
                  leftDistance,
                  0.001
                ),
                iFalloff
              );

            color.rgb *=
              max(
                rightBrightness,
                leftBrightness
              );
          }

          /*
           * SINGLE SIDE
           */
          else {
            color =
              calculateRays(
                tiltedRight,
                rayPosRight,
                rightDir1,
                rightDir2
              );

            float distanceToLight =
              length(
                fragCoord -
                vec2(
                  rayPosRight.x,
                  iResolution.y -
                  rayPosRight.y
                )
              ) /
              iResolution.y;

            float brightness =
              iIntensity *
              0.4 /
              pow(
                max(
                  distanceToLight,
                  0.001
                ),
                iFalloff
              );

            color.rgb *= brightness;
          }

          /*
           * Saturation
           */
          float gray =
            dot(
              color.rgb,
              vec3(
                0.299,
                0.587,
                0.114
              )
            );

          color.rgb =
            mix(
              vec3(gray),
              color.rgb,
              iSaturation
            );

          color.a =
            max(
              color.r,
              max(
                color.g,
                color.b
              )
            )
            *
            iOpacity;

          gl_FragColor = color;
        }
      `;

      const [flipX, flipY] = originToFlip(origin);

      const uniforms = {
        iTime: {
          value: 0,
        },

        iResolution: {
          value: [1, 1] as number[],
        },

        iSpeed: {
          value: speed,
        },

        iRayColor1: {
          value: hexToRgb(rayColor1) as number[],
        },

        iRayColor2: {
          value: hexToRgb(rayColor2) as number[],
        },

        iIntensity: {
          value: intensity,
        },

        iSpread: {
          value: spread,
        },

        iFlipX: {
          value: flipX,
        },

        iFlipY: {
          value: flipY,
        },

        iBoth: {
          value: origin === "both" ? 1 : 0,
        },

        iTilt: {
          value: tilt,
        },

        iSaturation: {
          value: saturation,
        },

        iBlend: {
          value: blend,
        },

        iFalloff: {
          value: falloff,
        },

        iOpacity: {
          value: opacity,
        },
      };

      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });

      const mesh = new Mesh(gl, {
        geometry,
        program,
      });

      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current) return;

        renderer.dpr = Math.min(window.devicePixelRatio || 1, 2);

        const { clientWidth: width, clientHeight: height } =
          containerRef.current;

        renderer.setSize(width, height);

        uniforms.iResolution.value = [
          width * renderer.dpr,
          height * renderer.dpr,
        ];
      };

      const loop = (time: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = time * 0.001;

        try {
          renderer.render({
            scene: mesh,
          });

          animationIdRef.current = requestAnimationFrame(loop);
        } catch {
          return;
        }
      };

      window.addEventListener("resize", updateSize);

      updateSize();

      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);

          animationIdRef.current = null;
        }

        window.removeEventListener("resize", updateSize);

        try {
          const loseContext = renderer.gl.getExtension("WEBGL_lose_context");

          if (loseContext) {
            loseContext.loseContext();
          }

          const canvas = renderer.gl.canvas;

          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        } catch {
          // Ignore WebGL cleanup errors.
        }

        rendererRef.current = null;

        uniformsRef.current = null;

        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      cleanupFunctionRef.current?.();
      cleanupFunctionRef.current = null;
    };
  }, [
    isVisible,
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  ]);

  /*
   * Update uniforms without rebuilding
   * the WebGL scene when props change.
   */
  useEffect(() => {
    if (!uniformsRef.current) return;

    const uniforms = uniformsRef.current;

    uniforms.iSpeed.value = speed;

    uniforms.iRayColor1.value = hexToRgb(rayColor1);

    uniforms.iRayColor2.value = hexToRgb(rayColor2);

    uniforms.iIntensity.value = intensity;

    uniforms.iSpread.value = spread;

    const [flipX, flipY] = originToFlip(origin);

    uniforms.iFlipX.value = flipX;

    uniforms.iFlipY.value = flipY;

    uniforms.iBoth.value = origin === "both" ? 1 : 0;

    uniforms.iTilt.value = tilt;

    uniforms.iSaturation.value = saturation;

    uniforms.iBlend.value = blend;

    uniforms.iFalloff.value = falloff;

    uniforms.iOpacity.value = opacity;
  }, [
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden pointer-events-none ${className}`.trim()}
    />
  );
};

export default SideRays;
