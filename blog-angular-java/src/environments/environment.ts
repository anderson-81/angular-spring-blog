// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: window.location.protocol + '//' + window.location.host + '/'
    + '334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
