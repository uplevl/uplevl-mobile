/**
 * Text processing and formatting utilities
 */

export interface TextTruncationResult {
  content: string;
  hashtags?: string;
  shouldShowMore: boolean;
  remainingChars?: number;
}

export function processTextForDisplay(
  content: string,
  hashtags: string | null | undefined,
  characterLimit: number,
  isExpanded: boolean = false,
): TextTruncationResult {
  const fullText = `${content}${hashtags ? ` ${hashtags}` : ""}`;
  const shouldShowMore = fullText.length > characterLimit;

  if (isExpanded || !shouldShowMore) {
    return {
      content,
      hashtags: hashtags || undefined,
      shouldShowMore,
    };
  }

  const remainingChars = fullText.length - characterLimit;
  const contentLength = content.length;

  // If truncation happens within content, always show "more"
  if (characterLimit <= contentLength) {
    return {
      content: content.slice(0, characterLimit),
      shouldShowMore: true,
      remainingChars,
    };
  }

  // If only hashtags would be revealed and it's a small amount, don't show "more"
  if (hashtags && remainingChars <= 35) {
    return {
      content,
      hashtags,
      shouldShowMore: false,
    };
  }

  // Show truncated text with "more" button
  const remainingCharsForHashtags = characterLimit - contentLength - 1; // -1 for the space
  const visibleHashtags = hashtags ? hashtags.slice(0, remainingCharsForHashtags) : "";

  return {
    content,
    hashtags: visibleHashtags || undefined,
    shouldShowMore: true,
    remainingChars,
  };
}
