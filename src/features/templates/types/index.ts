export interface TemplateProps {
  recipientName: string;
  senderName: string;
  message: string;
  occasion: string;
  photos: string[];
  // Template-specific fields can be passed inside content
  content: Record<string, unknown>;
}

export interface TemplateConfig {
  id: string;
  name: string;
  occasion: string;
  description: string;
  // A lazy-loaded or direct React component
  component: React.ComponentType<TemplateProps>;
}
