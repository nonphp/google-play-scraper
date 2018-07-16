'use strict';

/*
 * Return the proper parseList function according to the options.
 */
function getParseList (getApp, opts) {
  if (opts.fullDetail) {
    return getParseDetailList(getApp, opts);
  }

  return ($) => Promise.resolve(parseList($));
}

/*
 * Returns a parseList function that just grabs the appIds,
 * fetches every app detail with the app() function and returns
 * a Promise.all().
 */
function getParseDetailList (getApp, opts) {
  return function ($) {
    const promises = $('.card').get().slice(0, opts.num).map(function (app) {
      const appId = $(app).attr('data-docid');
      return getApp({
        appId: appId,
        lang: opts.lang,
        country: opts.country,
        cache: opts.cache
      });
    });

    return Promise.all(promises);
  };
}

function parseList ($) {
  return $('.card').get().map(function (app) {
    return parseApp($(app));
  });
}

function parseApp (app) {
  return {
    appId: app.attr('data-docid')
  };
}

module.exports = getParseList;
