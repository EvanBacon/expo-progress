import * as React from 'react';
import {
  ImageBackground,
  ImageURISource,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  ImageBackgroundProps,
} from 'react-native';
import Animated, {
  // @ts-ignore: always isn't defined in the types
  always,
  block,
  Extrapolate,
  interpolate,
  multiply,
  Node,
  set,
} from 'react-native-reanimated';
import { clamp, loop, timing, useValue } from 'react-native-redash';

export type ProgressBarProps = {
  /**
   * If the progress bar will show indeterminate progress by looping an animation infinitely.
   *
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * Duration to animate changes in milliseconds.
   *
   * @default isIndeterminate ? 1000 : 500
   */
  duration?: number;

  /**
   * If the bar should animate between values.
   *
   * @default false
   */
  isAnimated?: boolean;

  /**
   * The progress value (between 0 and 1).
   *
   * @default 0
   */
  progress?: number;

  /**
   * The tint color of the progress bar itself.
   *
   * @default #007aff
   */
  color?: string;

  /**
   * The tint color of the progress bar track.
   *
   * @default transparent
   */
  trackColor?: string;

  /**
   * A stretchable image to display as the progress bar.
   */
  progressImage?: ImageURISource | ImageURISource[];

  /**
   * A stretchable image to display behind the progress bar.
   */
  trackImage?: ImageURISource | ImageURISource[];

  /**
   * Height of the loading indicator.
   *
   * @default 7
   */
  height?: number;

  /**
   * Border radius of the loading indicator.
   *
   * @default height / 2
   */
  borderRadius?: number;

  /**
   * Style for the loading indicator container view.
   */
  style?: ImageBackgroundProps['style'];
};

const minProgress = 0;
const maxProgress = 1;

function useCode(nodeFactory, dependencies) {
  if (!(React.useEffect instanceof Function)) return;

  // @ts-ignore
  React.useEffect(() => {
    // check and correct 1st parameter
    if (!(nodeFactory instanceof Function)) {
      console.warn(
        'useCode() first argument should be a function that returns an animation node.'
      );

      const node = nodeFactory;
      nodeFactory = () => node;
    }

    let node = nodeFactory();
    if (node) {
      // allow factory to return array
      if (node instanceof Array) node = block(node);

      const animatedAlways = always(node);
      animatedAlways.__attach();
      // todo: upstream this
      if (Platform.OS === 'web') {
        animatedAlways.__onEvaluate();
      }

      // return undo function
      return () => animatedAlways.__detach();
    }
  }, dependencies);
}

function ProgressBar({
  isIndeterminate = false,
  duration = isIndeterminate ? 1000 : 500,
  isAnimated = false,
  progress = isIndeterminate ? 0.5 : 0,
  height = 7,
  borderRadius = height * 0.5,
  // Default iOS blue
  color = '#007aff',
  trackColor = 'transparent',
  style,
  trackImage,
  progressImage,
}: ProgressBarProps) {
  const [width, setWidth] = React.useState(0);
  const progressValue = useValue(isAnimated ? 0 : progress);
  const indeterminateValue = useValue(0);
  const animatedWidth = interpolate(
    clamp(progressValue, minProgress, maxProgress),
    {
      inputRange: [minProgress, maxProgress],
      outputRange: [0, width],
      extrapolate: Extrapolate.CLAMP,
    }
  );

  useCode(() => {
    if (isAnimated) {
      return set(
        progressValue,
        timing({
          from: progressValue,
          to: progress,
          duration,
        })
      );
    } else {
      return set(progressValue, progress);
    }
  }, [progress]);

  useCode(() => {
    if (isIndeterminate) {
      const loopingIndeterminateValue = loop({
        autoStart: true,
        boomerang: false,
        duration,
      });
      return set(indeterminateValue, loopingIndeterminateValue);
    }
    const animatedIndeterminateValue = timing({
      from: indeterminateValue,
      to: 0,
    });
    return set(indeterminateValue, animatedIndeterminateValue);
  }, [isIndeterminate]);

  // todo: web has a bug where the reanimated Animated.View style is not updating unless this is an animated value.
  let translateX: Node<number> | number = useValue(0);

  if (isIndeterminate) {
    translateX = interpolate(indeterminateValue, {
      inputRange: [0, 1],
      outputRange: [multiply(-1, animatedWidth), width],
    });
  }

  return (
    <ImageBackground
      onLayout={(e: LayoutChangeEvent) => {
        setWidth(e.nativeEvent.layout.width);
      }}
      style={[
        styles.container,
        {
          height,
          borderRadius,
          backgroundColor: trackColor,
        },
        style,
      ]}
      // @ts-ignore
      source={trackImage}
    >
      <Animated.Image
        style={[
          styles.bar,
          {
            width: animatedWidth,
            transform: [
              {
                translateX,
              },
            ],
            backgroundColor: color,
            borderRadius,
          },
        ]}
        // @ts-ignore
        source={progressImage}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    resizeMode: 'stretch',
  },
  bar: {
    resizeMode: 'stretch',
    left: 0,
    position: 'absolute',
    height: '100%',
  },
});

export default ProgressBar;
