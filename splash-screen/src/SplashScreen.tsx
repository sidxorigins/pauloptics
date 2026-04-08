import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Raleway";

const { fontFamily: raleway } = loadFont("normal", {
  weights: ["300", "700", "900"],
  subsets: ["latin"],
});

// Brand colors
const NAVY = "#1A3A7C";
const ROYAL = "#2563C4";
const GOLD = "#E8A820";
const ICE = "#EBF2FC";
const BG = "#E8EEF8";
const PALE = "#C8DCF5";
const SKY = "#4A87D0";

export const SplashScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── Blob animations ──
  const blob1Scale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const blob2Scale = spring({ frame: frame - 4, fps, config: { damping: 15, stiffness: 60 } });
  const blob3Scale = spring({ frame: frame - 8, fps, config: { damping: 10, stiffness: 90 } });

  // ── Logo entrance (bouncy pop) ──
  const logoScale = spring({ frame: frame - 8, fps, config: { damping: 8 } });
  const logoRotate = interpolate(
    spring({ frame: frame - 8, fps, config: { damping: 12 } }),
    [0, 1],
    [-12, 0]
  );

  // ── Logo clay shadow grows in ──
  const shadowSpread = interpolate(logoScale, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ── Wordmark slide up ──
  const wordmarkProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const wordmarkY = interpolate(wordmarkProgress, [0, 1], [40, 0]);
  const wordmarkOpacity = interpolate(wordmarkProgress, [0, 1], [0, 1]);

  // ── Tagline fade in ──
  const taglineProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineProgress, [0, 1], [20, 0]);

  // ── Gold line sweep ──
  const lineProgress = spring({
    frame: frame - 38,
    fps,
    config: { damping: 200 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 200]);

  // ── Dot accents ──
  const dot1 = spring({ frame: frame - 45, fps, config: { damping: 10 } });
  const dot2 = spring({ frame: frame - 50, fps, config: { damping: 10 } });

  // ── Floating blob gentle drift ──
  const drift = interpolate(frame, [0, 90], [0, 15], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: raleway,
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: height * 0.15 + drift,
          right: width * 0.18,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PALE}80 0%, transparent 70%)`,
          transform: `scale(${blob1Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: height * 0.2 - drift * 0.5,
          left: width * 0.15,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,168,32,0.12) 0%, transparent 70%)`,
          transform: `scale(${blob2Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: height * 0.35,
          left: width * 0.3 - drift,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ICE}90 0%, transparent 70%)`,
          transform: `scale(${blob3Scale})`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Logo in clay card */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: 56,
            background: "#F0F4FB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            boxShadow: `
              ${12 * shadowSpread}px ${12 * shadowSpread}px ${24 * shadowSpread}px rgba(26,58,124,0.14),
              ${-6 * shadowSpread}px ${-6 * shadowSpread}px ${16 * shadowSpread}px rgba(255,255,255,0.85),
              inset 0 ${3 * shadowSpread}px ${6 * shadowSpread}px rgba(255,255,255,0.7),
              inset 0 ${-2 * shadowSpread}px ${4 * shadowSpread}px rgba(26,58,124,0.08)
            `,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: 8,
            color: NAVY,
            opacity: wordmarkOpacity,
            transform: `translateY(${wordmarkY}px)`,
          }}
        >
          PAUL OPTICS
        </div>

        {/* Gold divider line */}
        <div
          style={{
            marginTop: 16,
            width: lineWidth,
            height: 4,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${GOLD}, ${ROYAL})`,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: 6,
            textTransform: "uppercase" as const,
            color: SKY,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Redefining Vision Since 1986
        </div>

        {/* Accent dots */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: ROYAL,
              transform: `scale(${dot1})`,
              boxShadow: `2px 2px 6px rgba(37,99,196,0.3), inset 0 1px 2px rgba(255,255,255,0.4)`,
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: GOLD,
              transform: `scale(${dot2})`,
              boxShadow: `2px 2px 6px rgba(232,168,32,0.3), inset 0 1px 2px rgba(255,255,255,0.4)`,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: NAVY,
              transform: `scale(${dot1})`,
              boxShadow: `2px 2px 6px rgba(26,58,124,0.3), inset 0 1px 2px rgba(255,255,255,0.4)`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
