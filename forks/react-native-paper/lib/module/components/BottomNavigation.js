function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { View, Animated, TouchableWithoutFeedback, StyleSheet, Platform, Keyboard } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import color from 'color';
import overlay from '../styles/overlay';
import Icon from './Icon';
import Surface from './Surface';
import Badge from './Badge';
import TouchableRipple from './TouchableRipple';
import Text from './Typography/Text';
import { black, white } from '../styles/colors';
import { withTheme } from '../core/theming';
const MIN_RIPPLE_SCALE = 0.001; // Minimum scale is not 0 due to bug with animation

const MIN_TAB_WIDTH = 96;
const MAX_TAB_WIDTH = 168;
const BAR_HEIGHT = 56;
const FAR_FAR_AWAY = 9999;

const Touchable = (_ref) => {
  let {
    route: _0,
    style,
    children,
    borderless,
    centered,
    rippleColor
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["route", "style", "children", "borderless", "centered", "rippleColor"]);

  return TouchableRipple.supported ? /*#__PURE__*/React.createElement(TouchableRipple, _extends({}, rest, {
    borderless: borderless,
    centered: centered,
    rippleColor: rippleColor,
    style: style
  }), children) : /*#__PURE__*/React.createElement(TouchableWithoutFeedback, rest, /*#__PURE__*/React.createElement(View, {
    style: style
  }, children));
};

class SceneComponent extends React.PureComponent {
  render() {
    const _this$props = this.props,
          {
      component
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["component"]);

    return /*#__PURE__*/React.createElement(component, rest);
  }

}
/**
 * Bottom navigation provides quick navigation between top-level views of an app with a bottom navigation bar.
 * It is primarily designed for use on mobile.
 *
 * For integration with React Navigation, you can use [react-navigation-material-bottom-tab-navigator](https://github.com/react-navigation/react-navigation-material-bottom-tab-navigator).
 *
 * By default Bottom navigation uses primary color as a background, in dark theme with `adaptive` mode it will use surface colour instead.
 * See [Dark Theme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more informations
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/bottom-navigation.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { BottomNavigation, Text } from 'react-native-paper';
 *
 * const MusicRoute = () => <Text>Music</Text>;
 *
 * const AlbumsRoute = () => <Text>Albums</Text>;
 *
 * const RecentsRoute = () => <Text>Recents</Text>;
 *
 * const MyComponent = () => {
 *   const [index, setIndex] = React.useState(0);
 *   const [routes] = React.useState([
 *     { key: 'music', title: 'Music', icon: 'queue-music' },
 *     { key: 'albums', title: 'Albums', icon: 'album' },
 *     { key: 'recents', title: 'Recents', icon: 'history' },
 *   ]);
 *
 *   const renderScene = BottomNavigation.SceneMap({
 *     music: MusicRoute,
 *     albums: AlbumsRoute,
 *     recents: RecentsRoute,
 *   });
 *
 *   return (
 *     <BottomNavigation
 *       navigationState={{ index, routes }}
 *       onIndexChange={setIndex}
 *       renderScene={renderScene}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */


class BottomNavigation extends React.Component {
  /**
   * Function which takes a map of route keys to components.
   * Pure components are used to minmize re-rendering of the pages.
   * This drastically improves the animation performance.
   */
  static SceneMap(scenes) {
    return ({
      route,
      jumpTo
    }) => /*#__PURE__*/React.createElement(SceneComponent, {
      key: route.key,
      component: scenes[route.key ? route.key : ''],
      route: route,
      jumpTo: jumpTo
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      index,
      routes
    } = nextProps.navigationState; // Re-create animated values if routes have been added/removed
    // Preserve previous animated values if they exist, so we don't break animations

    const tabs = routes.map( // focused === 1, unfocused === 0
    (_, i) => prevState.tabs[i] || new Animated.Value(i === index ? 1 : 0));
    const offsets = routes.map( // offscreen === 1, normal === 0
    (_, i) => prevState.offsets[i] || new Animated.Value(i === index ? 0 : 1));
    const nextState = {
      tabs,
      offsets
    };

    if (index !== prevState.current) {
      /* $FlowFixMe */
      Object.assign(nextState, {
        // Store the current index in state so that we can later check if the index has changed
        current: index,
        previous: prevState.current,
        // Set the current tab to be loaded if it was not loaded before
        loaded: prevState.loaded.includes(index) ? prevState.loaded : [...prevState.loaded, index]
      });
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "handleKeyboardShow", () => {
      const {
        scale
      } = this.props.theme.animation;
      this.setState({
        keyboard: true
      }, () => Animated.timing(this.state.visible, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true
      }).start());
    });

    _defineProperty(this, "handleKeyboardHide", () => {
      const {
        scale
      } = this.props.theme.animation;
      Animated.timing(this.state.visible, {
        toValue: 1,
        duration: 100 * scale,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          keyboard: false
        });
      });
    });

    _defineProperty(this, "animateToCurrentIndex", () => {
      const shifting = this.isShifting();
      const {
        navigationState,
        theme: {
          animation: {
            scale
          }
        }
      } = this.props;
      const {
        routes,
        index
      } = navigationState; // Reset the ripple to avoid glitch if it's currently animating

      this.state.ripple.setValue(MIN_RIPPLE_SCALE);
      Animated.parallel([Animated.timing(this.state.ripple, {
        toValue: 1,
        duration: shifting ? 400 * scale : 0,
        useNativeDriver: true
      }), ...routes.map((_, i) => Animated.timing(this.state.tabs[i], {
        toValue: i === index ? 1 : 0,
        duration: shifting ? 150 * scale : 0,
        useNativeDriver: true
      }))]).start(({
        finished
      }) => {
        // Workaround a bug in native animations where this is reset after first animation
        this.state.tabs.map((tab, i) => tab.setValue(i === index ? 1 : 0)); // Update the index to change bar's bacground color and then hide the ripple

        this.state.index.setValue(index);
        this.state.ripple.setValue(MIN_RIPPLE_SCALE);

        if (finished) {
          // Position all inactive screens offscreen to save memory usage
          // Only do it when animation has finished to avoid glitches mid-transition if switching fast
          this.state.offsets.forEach((offset, i) => {
            if (i === index) {
              offset.setValue(0);
            } else {
              offset.setValue(1);
            }
          });
        }
      });
    });

    _defineProperty(this, "handleLayout", e => {
      const {
        layout
      } = this.state;
      const {
        height,
        width
      } = e.nativeEvent.layout;

      if (height === layout.height && width === layout.width) {
        return;
      }

      this.setState({
        layout: {
          height,
          width,
          measured: true
        }
      });
    });

    _defineProperty(this, "handleTabPress", index => {
      const {
        navigationState,
        onTabPress,
        onIndexChange
      } = this.props;
      const event = {
        route: navigationState.routes[index],
        defaultPrevented: false,
        preventDefault: () => {
          event.defaultPrevented = true;
        }
      };
      onTabPress === null || onTabPress === void 0 ? void 0 : onTabPress(event);

      if (event.defaultPrevented) {
        return;
      }

      if (index !== navigationState.index) {
        onIndexChange(index);
      }
    });

    _defineProperty(this, "jumpTo", key => {
      const index = this.props.navigationState.routes.findIndex(route => route.key === key);
      this.props.onIndexChange(index);
    });

    _defineProperty(this, "isShifting", () => typeof this.props.shifting === 'boolean' ? this.props.shifting : this.props.navigationState.routes.length > 3);

    const {
      index: _index
    } = this.props.navigationState;
    this.state = {
      visible: new Animated.Value(1),
      tabs: [],
      offsets: [],
      index: new Animated.Value(_index),
      ripple: new Animated.Value(MIN_RIPPLE_SCALE),
      touch: new Animated.Value(MIN_RIPPLE_SCALE),
      layout: {
        height: 0,
        width: 0,
        measured: false
      },
      current: _index,
      previous: 0,
      loaded: [_index],
      keyboard: false
    };
  }

  componentDidMount() {
    // Workaround for native animated bug in react-native@^0.57
    // Context: https://github.com/callstack/react-native-paper/pull/637
    this.animateToCurrentIndex();

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
      Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
    } else {
      Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
      Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigationState.index === this.props.navigationState.index) {
      return;
    } // Reset offsets of previous and current tabs before animation


    this.state.offsets.forEach((offset, i) => {
      if (i === this.props.navigationState.index || i === prevProps.navigationState.index) {
        offset.setValue(0);
      }
    });
    this.animateToCurrentIndex();
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      Keyboard.removeListener('keyboardWillShow', this.handleKeyboardShow);
      Keyboard.removeListener('keyboardWillHide', this.handleKeyboardHide);
    } else {
      Keyboard.removeListener('keyboardDidShow', this.handleKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', this.handleKeyboardHide);
    }
  }

  render() {
    const {
      navigationState,
      renderScene,
      renderIcon,
      renderLabel,
      renderTouchable = props => /*#__PURE__*/React.createElement(Touchable, props),
      getLabelText = ({
        route
      }) => route.title,
      getBadge = ({
        route
      }) => route.badge,
      getColor = ({
        route
      }) => route.color,
      getAccessibilityLabel = ({
        route
      }) => route.accessibilityLabel,
      getTestID = ({
        route
      }) => route.testID,
      activeColor,
      inactiveColor,
      keyboardHidesNavigationBar,
      barStyle,
      labeled,
      style,
      theme,
      sceneAnimationEnabled
    } = this.props;
    const {
      layout,
      loaded,
      index,
      visible,
      ripple,
      keyboard,
      tabs,
      offsets
    } = this.state;
    const {
      routes
    } = navigationState;
    const {
      colors,
      dark: isDarkTheme,
      mode
    } = theme;
    const shifting = this.isShifting();
    const {
      backgroundColor: customBackground,
      elevation = 4
    } = StyleSheet.flatten(barStyle) || {};
    const approxBackgroundColor = customBackground ? customBackground : isDarkTheme && mode === 'adaptive' ? overlay(elevation, colors.surface) : colors.primary;
    const backgroundColor = shifting ? index.interpolate({
      inputRange: routes.map((_, i) => i),
      //@ts-ignore
      outputRange: routes.map(route => getColor({
        route
      }) || approxBackgroundColor)
    }) : approxBackgroundColor;
    const isDark = !color(approxBackgroundColor).isLight();
    const textColor = isDark ? white : black;
    const activeTintColor = typeof activeColor !== 'undefined' ? activeColor : textColor;
    const inactiveTintColor = typeof inactiveColor !== 'undefined' ? inactiveColor : color(textColor).alpha(0.5).rgb().string();
    const touchColor = color(activeColor || activeTintColor).alpha(0.12).rgb().string();
    const maxTabWidth = routes.length > 3 ? MIN_TAB_WIDTH : MAX_TAB_WIDTH;
    const maxTabBarWidth = maxTabWidth * routes.length;
    const tabBarWidth = Math.min(layout.width, maxTabBarWidth);
    const tabWidth = tabBarWidth / routes.length;
    const rippleSize = layout.width / 4;
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, style]
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.content, {
        backgroundColor: colors.background
      }]
    }, routes.map((route, index) => {
      if (!loaded.includes(index)) {
        // Don't render a screen if we've never navigated to it
        return null;
      }

      const focused = navigationState.index === index;
      const opacity = sceneAnimationEnabled ? tabs[index] : focused ? 1 : 0;
      const top = offsets[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, FAR_FAR_AWAY]
      });
      return /*#__PURE__*/React.createElement(Animated.View, {
        key: route.key,
        pointerEvents: focused ? 'auto' : 'none',
        accessibilityElementsHidden: !focused,
        importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
        style: [StyleSheet.absoluteFill, {
          opacity
        }],
        collapsable: false,
        removeClippedSubviews: // On iOS, set removeClippedSubviews to true only when not focused
        // This is an workaround for a bug where the clipped view never re-appears
        Platform.OS === 'ios' ? navigationState.index !== index : true
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: [styles.content, {
          top
        }]
      }, renderScene({
        route,
        jumpTo: this.jumpTo
      })));
    })), /*#__PURE__*/React.createElement(Surface, {
      style: [styles.bar, keyboardHidesNavigationBar ? {
        // When the keyboard is shown, slide down the navigation bar
        transform: [{
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [layout.height, 0]
          })
        }],
        // Absolutely position the navigation bar so that the content is below it
        // This is needed to avoid gap at bottom when the navigation bar is hidden
        position: keyboard ? 'absolute' : null
      } : null, barStyle],
      pointerEvents: layout.measured ? keyboardHidesNavigationBar && keyboard ? 'none' : 'auto' : 'none',
      onLayout: this.handleLayout
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.barContent, {
        backgroundColor
      }]
    }, /*#__PURE__*/React.createElement(SafeAreaView, {
      forceInset: {
        top: 'never',
        bottom: 'always'
      },
      style: [styles.items, {
        maxWidth: maxTabBarWidth
      }]
    }, shifting ? /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: "none",
      style: [styles.ripple, {
        // Since we have a single ripple, we have to reposition it so that it appears to expand from active tab.
        // We need to move it from the top to center of the navigation bar and from the left to the active tab.
        top: (BAR_HEIGHT - rippleSize) / 2,
        left: tabWidth * (navigationState.index + 0.5) - rippleSize / 2,
        height: rippleSize,
        width: rippleSize,
        borderRadius: rippleSize / 2,
        backgroundColor: getColor({
          route: routes[navigationState.index]
        }),
        transform: [{
          // Scale to twice the size  to ensure it covers the whole navigation bar
          scale: ripple.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 8]
          })
        }],
        opacity: ripple.interpolate({
          inputRange: [0, MIN_RIPPLE_SCALE, 0.3, 1],
          outputRange: [0, 0, 1, 1]
        })
      }]
    }) : null, routes.map((route, index) => {
      const focused = navigationState.index === index;
      const active = tabs[index]; // Scale the label up

      const scale = labeled && shifting ? active.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
      }) : 1; // Move down the icon to account for no-label in shifting and smaller label in non-shifting.

      const translateY = labeled ? shifting ? active.interpolate({
        inputRange: [0, 1],
        outputRange: [7, 0]
      }) : 0 : 7; // We render the active icon and label on top of inactive ones and cross-fade them on change.
      // This trick gives the illusion that we are animating between active and inactive colors.
      // This is to ensure that we can use native driver, as colors cannot be animated with native driver.

      const activeOpacity = active;
      const inactiveOpacity = active.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      });
      const badge = getBadge({
        route
      });
      return renderTouchable({
        key: route.key,
        route,
        borderless: true,
        centered: true,
        rippleColor: touchColor,
        onPress: () => this.handleTabPress(index),
        testID: getTestID({
          route
        }),
        accessibilityLabel: getAccessibilityLabel({
          route
        }),
        accessibilityTraits: focused ? ['button', 'selected'] : 'button',
        accessibilityComponentType: 'button',
        accessibilityRole: 'button',
        accessibilityState: {
          selected: true
        },
        style: styles.item,
        children: /*#__PURE__*/React.createElement(View, {
          pointerEvents: "none"
        }, /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.iconContainer, {
            transform: [{
              translateY
            }]
          }]
        }, /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.iconWrapper, {
            opacity: activeOpacity
          }]
        }, renderIcon ? renderIcon({
          route,
          focused: true,
          color: activeTintColor
        }) : /*#__PURE__*/React.createElement(Icon, {
          source: route.icon,
          color: activeTintColor,
          size: 24
        })), /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.iconWrapper, {
            opacity: inactiveOpacity
          }]
        }, renderIcon ? renderIcon({
          route,
          focused: false,
          color: inactiveTintColor
        }) : /*#__PURE__*/React.createElement(Icon, {
          source: route.icon,
          color: inactiveTintColor,
          size: 24
        })), /*#__PURE__*/React.createElement(View, {
          style: [styles.badgeContainer, {
            right: (badge != null && typeof badge !== 'boolean' ? String(badge).length * -2 : 0) - 2
          }]
        }, typeof badge === 'boolean' ? /*#__PURE__*/React.createElement(Badge, {
          visible: badge,
          size: 8
        }) : /*#__PURE__*/React.createElement(Badge, {
          visible: badge != null,
          size: 16
        }, badge))), labeled ? /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.labelContainer, {
            transform: [{
              scale
            }]
          }]
        }, /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.labelWrapper, {
            opacity: activeOpacity
          }]
        }, renderLabel ? renderLabel({
          route,
          focused: true,
          color: activeTintColor
        }) : /*#__PURE__*/React.createElement(Text, {
          style: [styles.label, {
            color: activeTintColor
          }]
        }, getLabelText({
          route
        }))), shifting ? null : /*#__PURE__*/React.createElement(Animated.View, {
          style: [styles.labelWrapper, {
            opacity: inactiveOpacity
          }]
        }, renderLabel ? renderLabel({
          route,
          focused: false,
          color: inactiveTintColor
        }) : /*#__PURE__*/React.createElement(Text, {
          style: [styles.label, {
            color: inactiveTintColor
          }]
        }, getLabelText({
          route
        })))) : /*#__PURE__*/React.createElement(View, {
          style: styles.labelContainer
        }))
      });
    })))));
  }

}

_defineProperty(BottomNavigation, "defaultProps", {
  labeled: true,
  keyboardHidesNavigationBar: true,
  sceneAnimationEnabled: false
});

export default withTheme(BottomNavigation);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  content: {
    flex: 1
  },
  bar: {
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 4
  },
  barContent: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  items: {
    flexDirection: 'row',
    width: '100%'
  },
  item: {
    flex: 1,
    // Top padding is 6 and bottom padding is 10
    // The extra 4dp bottom padding is offset by label's height
    paddingVertical: 6
  },
  ripple: {
    position: 'absolute'
  },
  iconContainer: {
    height: 24,
    width: 24,
    marginTop: 2,
    marginHorizontal: 12,
    alignSelf: 'center'
  },
  iconWrapper: _objectSpread(_objectSpread({}, StyleSheet.absoluteFillObject), {}, {
    alignItems: 'center'
  }),
  labelContainer: {
    height: 16,
    paddingBottom: 2
  },
  labelWrapper: _objectSpread({}, StyleSheet.absoluteFillObject),
  label: _objectSpread({
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }, Platform.OS === 'web' ? {
    whiteSpace: 'nowrap'
  } : null),
  badgeContainer: {
    position: 'absolute',
    left: 0,
    top: -2
  }
});
//# sourceMappingURL=BottomNavigation.js.map