export const environment = {
  production: true,
  cohort_atlas_api: "https://wwwdev.ebi.ac.uk/biosamples/cohortatlas/api",
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
