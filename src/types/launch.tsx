export type Launch = {
  fairings: any;
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string;
      launch: string;
      media: string;
      recovery: string;
    };
    flickr: {
      small: any;
      original: any;
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  tdb: boolean;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: any;
  details: string;
  crew: any;
  ships: any;
  capsules: any;
  payloads: any;
  launchpad: string;
  auto_update: true;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: [
    {
      core: string;
      flight: number;
      gridfins: boolean;
      legs: boolean;
      reused: boolean;
      landing_attempt: boolean;
      landing_success: boolean;
      landing_type: string;
      landpad: string;
    }
  ];
  id: string;
};
