interface Property {
  id: number;
  unitType: string;
  images: string[];
  about: string;
  rentLow: number;
  rentHigh: number;
  bedroomLow: number;
  bedroomHigh: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  tags: string[];
  lat: number;
  lng: number;
  pets: Pet[];
  apartments: Apartment[];
  features: string[];
  phoneNumber: string;
  website: string;
  scores: Score[];
  stars: number;
  reviews?: Review[];
}

interface Review {
  body: string;
  CreatedAt: string;
  id: number;
  propertyID: number;
  stars: number;
  title: string;
  userID: number;
  DeletedAt: null;
  UpdatedAt: null;
}

interface Score {
  type: string;
  description: string;
  score: number;
}

interface Apartment {
  CreatedAt: string;
  DeletedAt: null;
  id: number;
  UpdatedAt: string;
  bathrooms: number;
  bedrooms: number;
  images: string[];
  propertyID: number;
  rent: number;
  sqFt: number;
  unit: string;
}

interface Pet {
  type: string;
  allowed: boolean;
  details: string;
  limit: number;
  fee: number;
  deposit: number;
  rent: number;
}
