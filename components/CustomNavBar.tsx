import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const PRIMARY_COLOR = "#172e73";
const SECONDARY_COLOR = "#fff";

// Simple icon components to replace lucide-react-native
const HomeIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

const ScanIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size, borderRadius: 4 }]} />
);

const ProfileIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />
);

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" },
            ]}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? PRIMARY_COLOR : SECONDARY_COLOR
            )}
            {isFocused && (
              <Text style={styles.text}>
                {label as string}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "index":
        return <HomeIcon color={color} />;
      case "scan":
        return <ScanIcon color={color} />;
      case "profile":
        return <ProfileIcon color={color} />;
      default:
        return <HomeIcon color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "60%",
    alignSelf: "center",
    bottom: Platform.OS === 'web' ? 10 : 20,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 13,
    borderRadius: 30,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },
  icon: {
    borderRadius: 2,
  },
});

export default CustomNavBar;