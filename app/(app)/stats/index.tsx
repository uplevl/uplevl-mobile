import { DollarSign, MessageCircle, TrendingUp, Zap } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import dashboardData from "@/assets/mocks/dashboard.json";

import theme from "@/constants/theme";

import DetailRow from "@/components/common/detail-row";
import StatCard from "@/components/dashboard/stat-card";

const { stats, engagement: engagementData } = dashboardData;

// Calculate business value metrics
const timesSavedHours = Math.round(stats.commentsAnswered * 0.5); // 30 seconds per comment
const estimatedRevenue = stats.potentialLeads * 850; // Average commission per lead
const totalEngagement = engagementData.reduce((sum, day) => sum + day.engagement, 0);
const avgDailyEngagement = Math.round(totalEngagement / engagementData.length);

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.content}>
        {/* Hero Metrics Row */}
        <View style={styles.heroSection}>
          <View style={styles.heroMetricsRow}>
            <View style={styles.heroMetric}>
              <Text style={styles.heroValue}>{stats.potentialLeads}</Text>
              <Text style={styles.heroLabel}>New Leads</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroMetric}>
              <Text style={styles.heroValue}>{timesSavedHours}h</Text>
              <Text style={styles.heroLabel}>Time Saved</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroMetric}>
              <Text style={styles.heroValue}>{stats.postsPublished}</Text>
              <Text style={styles.heroLabel}>Posts Created</Text>
            </View>
          </View>
        </View>

        {/* Key Performance Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.metricsGrid}>
            <StatCard title="Potential Revenue" value={`$${estimatedRevenue.toLocaleString()}`} icon={DollarSign} />
            <StatCard title="Avg Response Time" value={stats.avgResponseTime} icon={Zap} />
            <StatCard title="Comments Handled" value={stats.commentsAnswered} icon={MessageCircle} />
            <StatCard title="Daily Engagement" value={avgDailyEngagement} icon={TrendingUp} />
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                <Text style={styles.legendText}>Engagement</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.success }]} />
                <Text style={styles.legendText}>Posts</Text>
              </View>
            </View>

            <View style={styles.chartContainer}>
              {engagementData.map((day, index) => {
                const maxEngagement = Math.max(...engagementData.map((d) => d.engagement));
                const maxPosts = Math.max(...engagementData.map((d) => d.posts));
                const engagementHeight = (day.engagement / maxEngagement) * 60;
                const postsHeight = (day.posts / maxPosts) * 60;

                return (
                  <View key={index} style={styles.chartDay}>
                    <View style={styles.chartBars}>
                      <View
                        style={[
                          styles.chartBar,
                          {
                            height: engagementHeight,
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.chartBar,
                          {
                            height: postsHeight,
                            backgroundColor: theme.colors.success,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.chartLabel}>{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Quick Stats Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>This Month Summary</Text>
          <View style={styles.summaryCard}>
            <DetailRow label="AI Automation Rate" value="94%" showDivider={true} />
            <DetailRow label="Lead Conversion Rate" value="35%" showDivider={true} />
            <DetailRow label="Engagement Growth" value="+47%" showDivider={true} />
            <DetailRow label="Cost Per Lead" value="$12" showDivider={false} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  heroSection: {
    marginBottom: 32,
  },
  heroMetricsRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  heroMetric: {
    flex: 1,
    alignItems: "center",
  },
  heroValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
    fontFamily: "Geist-SemiBold",
    marginBottom: 4,
  },
  heroLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    fontFamily: "Geist",
    textAlign: "center",
  },
  heroDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: 16,
  },
  metricsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 16,
    fontFamily: "Geist-SemiBold",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chartSection: {
    marginBottom: 32,
  },
  chartCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    fontFamily: "Geist",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 80,
    paddingHorizontal: 10,
  },
  chartDay: {
    alignItems: "center",
    flex: 1,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 60,
    gap: 2,
  },
  chartBar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
    marginTop: 8,
    fontFamily: "Geist",
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
