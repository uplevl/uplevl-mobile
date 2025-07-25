/**
 * Common type definitions used across the mobile app
 */
import { LucideIcon } from "lucide-react-native";
import { TextStyle, ViewStyle } from "react-native";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "destructive-outline"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "xl" | "icon";

export interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: LucideIcon;
}

export type PostStatus = "draft" | "scheduled" | "published" | "archived";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface BasePost {
  id: string;
  imageUrl?: string;
  images?: string[];
  content: string;
  hashtags?: string | null;
  status: PostStatus;
  reviewStatus: ReviewStatus;
  createdAt: string;
  scheduledAt?: string | null;
  likes?: number;
  comments?: number;
  views?: number;
  isGenerating?: boolean;
  originalDescription?: string;
}
