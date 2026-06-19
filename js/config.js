const CONFIG = {
  // true  → whole house is open (review mode)
  // false → locked until the release date below
  PREVIEW_MODE: false,

  // 27 June 2026, 00:00, Asia/Kolkata (+05:30)
  UNLOCK_DATE: new Date('2026-06-27T00:00:00+05:30'),
  TIMEZONE: 'Asia/Kolkata',

  // ── Optional personal touches (safe to edit) ──
  // The day you two started. Used for the little "day N of us ♥" counter.
  // Set this to your real date, or set SHOW_DAY_COUNTER to false to hide it.
  TOGETHER_SINCE: new Date('2026-04-27T00:00:00+05:30'),
  SHOW_DAY_COUNTER: true,

  // Day-of-month you celebrate (e.g. 27). On that day a small note appears.
  ANNIVERSARY_DAY: 27,
};
