import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

export interface EngagementChartData {
  day: string;
  posts: number;
  engagement: number;
}

export interface EngagementChartProps {
  data: EngagementChartData[];
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function EngagementChart({
  data,
  title = "Daily Activity",
  subtitle = "Posts published vs engagement received",
  primaryLabel = "Engagement",
  secondaryLabel = "Posts",
  primaryColor = theme.colors.primary,
  secondaryColor = theme.colors.success,
}: EngagementChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.posts * 10, d.engagement))); // Scale posts for visibility

  // Create animated values for each bar
  const animatedValues = useRef(
    data.map(() => ({
      engagement: new Animated.Value(0),
      posts: new Animated.Value(0),
    })),
  ).current;

  useFocusEffect(
    useCallback(() => {
      // Reset all animated values to 0
      animatedValues.forEach((animatedValue) => {
        animatedValue.engagement.setValue(0);
        animatedValue.posts.setValue(0);
      });

      // Create spring animations for all bars simultaneously
      const animations = data.map((item, index) => {
        const engagementHeight = (item.engagement / maxValue) * 80;
        const postsHeight = ((item.posts * 10) / maxValue) * 80;

        return Animated.parallel([
          Animated.spring(animatedValues[index].engagement, {
            toValue: engagementHeight,
            tension: 80,
            friction: 12,
            useNativeDriver: false,
          }),
          Animated.spring(animatedValues[index].posts, {
            toValue: postsHeight,
            tension: 80,
            friction: 12,
            useNativeDriver: false,
          }),
        ]);
      });

      // Start all animations at the same time
      Animated.parallel(animations).start();
    }, [data, maxValue, animatedValues]),
  );

  return (
    <View style={styles.chartCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.chartSubtitle}>{subtitle}</Text>

      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.chartDay}>
            <View style={styles.chartBars}>
              {/* Animated Engagement bar */}
              <Animated.View
                style={[
                  styles.chartBar,
                  {
                    backgroundColor: primaryColor,
                    height: animatedValues[index].engagement,
                  },
                ]}
              />
              {/* Animated Posts bar */}
              <Animated.View
                style={[
                  styles.chartBar,
                  {
                    backgroundColor: secondaryColor,
                    height: animatedValues[index].posts,
                  },
                ]}
              />
            </View>
            <Text style={styles.chartDayLabel}>{item.day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: primaryColor }]} />
          <Text style={styles.legendText}>{primaryLabel}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: secondaryColor }]} />
          <Text style={styles.legendText}>{secondaryLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 10,
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: 6,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 100,
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  chartDay: {
    alignItems: "center",
    flex: 1,
    maxWidth: 40,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    gap: 2,
    width: "100%",
  },
  chartBar: {
    width: 14,
    borderRadius: 2,
    marginTop: 2,
  },
  chartDayLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginTop: 8,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
});
