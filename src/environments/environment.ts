// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cohort_atlas_api: "http://localhost:8080/api",
  webin_api: "https://wwwdev.ebi.ac.uk/ena/submit/webin/auth/token",
  oauth2: {
    keycloak: {
      client_id: "cohort-atlas-web-angular",
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:4200",
      auth_endpoint: "http://localhost:8090/realms/cohort-atlas/protocol/openid-connect/token",
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
