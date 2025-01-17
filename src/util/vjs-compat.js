/**
 * Provides a compatibility layer between Video.js 7 and 8 API changes for VHS.
 */
import videojs from 'video.js';

/**
 * Delegates to videojs.obj.merge (Video.js 8) or
 * videojs.mergeOptions (Video.js 7).
 */
export function merge(...args) {
  const context = videojs.obj || videojs;
  const fn = context.merge || context.mergeOptions;

  return fn.apply(context, args);
}

/**
 * Delegates to videojs.time.createTimeRanges (Video.js 8) or
 * videojs.createTimeRanges (Video.js 7).
 */
export function createTimeRanges(...args) {
  const context = videojs.time || videojs;
  const fn = context.createTimeRanges || context.createTimeRanges;

  return fn.apply(context, args);
}

/**
 * Converts any buffered time range to a descriptive string
 *
 * @param {TimeRanges} buffered - time ranges
 * @return {string} - descriptive string
 */
export function prettyBuffered(buffered) {
  let result = '';

  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i);
    const end = buffered.end(i);

    const duration = end - start;

    if (result.length) {
      result += '\n';
    }

    result += `[${duration}](${start} -> ${end})`;
  }

  return result || 'empty';
}
