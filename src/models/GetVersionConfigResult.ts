export interface GetVersionConfigResult {
  code?: number;
  msg?: string;
  data?: VersionInfo;
}

export interface VersionInfo {
  version_id?: number;
  app_id?: number;
  version_name?: string;
  version_desc?: null;
  version_config?: VersionConfig;
  version_status?: number;
  creator?: string;
  create_time?: string;
  operator?: string;
  update_time?: string;
}

export interface VersionConfig {
  name?: string;
  config?: Config;
}

export interface Config {
  desc?: string;
}
