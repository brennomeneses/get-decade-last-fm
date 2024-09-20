export interface AlbumAPIResponse {
  "packaging-id":        string;
  "status-id":           string;
  packaging:             string;
  "cover-art-archive":   CoverArtArchive;
  status:                string;
  quality:               string;
  id:                    string;
  "text-representation": TextRepresentation;
  disambiguation:        string;
  date:                  string;
  "release-events":      ReleaseEvent[];
  country:               string;
  title:                 string;
  barcode:               string;
  asin:                  null;
}

export interface CoverArtArchive {
  back:     boolean;
  artwork:  boolean;
  front:    boolean;
  count:    number;
  darkened: boolean;
}

export interface ReleaseEvent {
  date: Date;
  area: Area;
}

export interface Area {
  disambiguation:     string;
  type:               null;
  id:                 string;
  "sort-name":        string;
  "type-id":          null;
  "iso-3166-1-codes": string[];
  name:               string;
}

export interface TextRepresentation {
  language: string;
  script:   string;
}
