export interface TemplateProps {
  recipientName: string;
  senderName: string;
  message: string;
  occasion: string;
  photos: string[];
  // Template-specific fields can be passed inside content
  content: Record<string, unknown>;
  /**
   * Skip any "tap to open" cover and show the opened card straight away.
   * Used by previews (landing demo, builder thumbnails, live preview, My wishes);
   * the recipient's real view leaves it off.
   */
  autoOpen?: boolean;
}

export interface TemplateConfig {
  id: string;
  name: string;
  occasion: string;
  description: string;
  // A lazy-loaded or direct React component
  component: React.ComponentType<TemplateProps>;
}
