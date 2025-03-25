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
  