export interface BuilderState {
  occasion: string;
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
  photos: string[]; // preview / Cloudinary URLs
  photoPublicId?: string;
}


export interface ApiTemplate {
  id: string;
  name: string;
  occasion: string;
  description: string;
}

export type BuilderStep = "edit" | "success";
