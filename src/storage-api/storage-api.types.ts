export interface IQueryType {
  offset: string;
  limit: string;
}
export interface IAllApiData extends IClient {
  meta: Meta;
}

export interface IClient {
  id: string;
  accountId: string;
  owner: Owner;
  shared: boolean;
  group: Group;
  updated: string;
  name: string;
  code?: string;
  externalCode: string;
  archived: boolean;
  created: string;
  companyType: string;
  inn?: string;
  kpp?: string;
  accounts: Accounts;
  tags: string[];
  contactpersons: Contactpersons;
  notes: Notes;
  salesAmount: number;
  files: Files;
  legalTitle?: string;
  legalAddress?: string;
  legalAddressFull?: LegalAddressFull;
  actualAddress?: string;
  actualAddressFull?: ActualAddressFull;
  ogrn?: string;
  okpo?: string;
  phone?: string;
  attributes?: Attribute[];
  ogrnip?: string;
  legalLastName?: string;
  legalFirstName?: string;
  legalMiddleName?: string;
  email?: string;
  priceType?: PriceType;
  description?: string;
  fax?: string;
}

export interface Meta {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
  uuidHref: string;
}

export interface Owner {
  meta: Meta2;
}

export interface Meta2 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
  uuidHref: string;
}

export interface Group {
  meta: Meta3;
}

export interface Meta3 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
}

export interface Accounts {
  meta: Meta4;
}

export interface Meta4 {
  href: string;
  type: string;
  mediaType: string;
  size: number;
  limit: number;
  offset: number;
}

export interface Contactpersons {
  meta: Meta5;
}

export interface Meta5 {
  href: string;
  type: string;
  mediaType: string;
  size: number;
  limit: number;
  offset: number;
}

export interface Notes {
  meta: Meta6;
}

export interface Meta6 {
  href: string;
  type: string;
  mediaType: string;
  size: number;
  limit: number;
  offset: number;
}

export interface Files {
  meta: Meta7;
}

export interface Meta7 {
  href: string;
  type: string;
  mediaType: string;
  size: number;
  limit: number;
  offset: number;
}

export interface LegalAddressFull {
  postalCode?: string;
  country?: Country;
  region?: Region;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  comment?: string;
  addInfo?: string;
}

export interface Country {
  meta: Meta8;
}

export interface Meta8 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
  uuidHref: string;
}

export interface Region {
  meta: Meta9;
}

export interface Meta9 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
}

export interface ActualAddressFull {
  addInfo?: string;
  postalCode?: string;
  country?: Country2;
  region?: Region2;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  comment?: string;
}

export interface Country2 {
  meta: Meta10;
}

export interface Meta10 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
  uuidHref: string;
}

export interface Region2 {
  meta: Meta11;
}

export interface Meta11 {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
}

export interface Attribute {
  meta: Meta12;
  id: string;
  name: string;
  type: string;
  value: string;
}

export interface Meta12 {
  href: string;
  type: string;
  mediaType: string;
}

export interface PriceType {
  meta: Meta13;
  id: string;
  name: string;
  externalCode: string;
}

export interface Meta13 {
  href: string;
  type: string;
  mediaType: string;
}
