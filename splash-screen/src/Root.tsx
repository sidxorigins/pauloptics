import { Composition } from "remotion";
import { SplashScreen } from "./SplashScreen";

export const RemotionRoot = () => {
  return (
    <Composition
      id="SplashScreen"
      component={SplashScreen}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
