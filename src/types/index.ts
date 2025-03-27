export type UploadedImage = {
  url: string;
  public_id: string;
};
  
export type OptionValue = {
  name: string;
  image: UploadedImage;
  miniature: UploadedImage;
  price: number;
};
  
export type Option = {
  name: string;
  type: string;
  values: OptionValue[];
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  priceFormula: string;
  images: UploadedImage[];
  options: Option[];
  createdAt?: string;
};

export type SimulateurFormData = {
  productTypes: string[];
  quantity: string;
  material: string;
  projectType: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};