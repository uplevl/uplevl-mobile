import { BotIcon, CheckCircleIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import theme from "@/constants/theme";

import BookingPotentialBadge from "@/components/business/booking-potential-badge";

import { formatRelativeDate } from "@/lib/helpers/date";

// Types for AI comments
interface AIComment {
  id: string;
  customerComment: string;
  customerName: string;
  aiResponse: string;
  timestamp: string;
  isBookingInterest: boolean;
}

interface AICommentCardProps {
  comment: AIComment;
}

export default function AICommentCard({ comment }: AICommentCardProps) {
  const hasBookingPotential = comment.isBookingInterest;

  return (
    <View style={[styles.commentCard, hasBookingPotential && styles.commentCardBooking]}>
      <View style={styles.commentHeader}>
        <Text style={styles.customerName}>@{comment.customerName}</Text>
        <Text style={styles.commentTime}>{formatRelativeDate(comment.timestamp)}</Text>
        {hasBookingPotential && <BookingPotentialBadge />}
      </View>
      <Text style={styles.customerComment}>{comment.customerComment}</Text>
      <View style={styles.aiResponseContainer}>
        <View style={styles.aiLabelContainer}>
          <BotIcon size={16} color={theme.colors.neutral500} />
          <Text style={styles.aiLabel}>Agent Response:</Text>
        </View>
        <Text style={styles.aiResponse}>{comment.aiResponse}</Text>
      </View>
      {hasBookingPotential && (
        <View style={styles.bookingPotentialContainer}>
          <CheckCircleIcon size={12} color={theme.colors.success} />
          <Text style={styles.bookingPotentialText}>Booking Potential Detected</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerName: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.cardForeground,
  },
  commentTime: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
  },
  customerComment: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.text,
    lineHeight: 20,
  },
  aiResponseContainer: {
    marginTop: 8,
    marginLeft: 8,
  },
  aiLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  aiLabel: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.neutral500,
  },
  aiResponse: {
    fontSize: 14,
    fontFamily: "Geist",
    color: theme.colors.text,
  },
  commentCardBooking: {
    backgroundColor: theme.colors.success + "10", // Light green background
    borderColor: theme.colors.success,
    borderWidth: 1,
  },
  bookingPotentialContainer: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bookingPotentialText: {
    fontSize: 12,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.success,
  },
});
