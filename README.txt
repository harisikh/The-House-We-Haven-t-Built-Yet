THE HOUSE WE HAVEN'T BUILT YET ♥
A gift, for Bebu.

════════════════════════════════════════
HOW TO OPEN
════════════════════════════════════════
Just open  index.html  in any modern browser.
No internet, no install, no setup. (With internet on, the
handwriting & serif fonts load from Google Fonts; offline it
falls back to system fonts and still works perfectly.)

════════════════════════════════════════
THE ONE SWITCH YOU CARE ABOUT
════════════════════════════════════════
Open  js/config.js  — at the very top:

   PREVIEW_MODE: true   →  the whole house is OPEN (for you to review)
   PREVIEW_MODE: false  →  LOCKED until 27 June 2026, 12:00 AM IST
                           (an "under construction" page + live countdown)

>>> Before you send it to her, set it to  false.  <<<
On the morning of the 27th it unlocks itself.

════════════════════════════════════════
WHAT'S NEW IN THIS VERSION
════════════════════════════════════════
• Time of day — the house changes mood by her local clock:
  warm at morning, golden in the evening, dim & cosy at night
  (the rooftop windows glow stronger after dark). A small badge
  top-right names the time of day.

• First-open ceremony — the very first time it's opened, the plan
  draws itself in and a wax seal stamps "Sealed for Bebu." Every
  visit after that goes straight in. (Skippable.)

• Living blueprint — the floor plan inks itself in wall by wall,
  with a drafting-pencil cursor over the sheet.

• Explore & complete — rooms she's visited get a little ✓ on the
  plan and a progress meter ("3 of 10 rooms seen"). Once she's
  seen them all, the title block flips from "Imagined" to
  "Under Construction" and an "Every Room Seen ♥" stamp drops on.

• A writable drawer — the Memory Cabinet's "Empty Drawer" now lets
  HER write a note that saves on her device. The house gets a
  second occupant leaving ink on the page.

• Little moments — a shooting star on the balcony, a live REC
  timestamp in the camera corner, and the rooftop chimney puffs a
  tiny heart once the home is lit.

• Hallway frames — hover a frame (2027–2030) to reveal a caption
  slot. To fill one in, open index.html in a text editor, find
  "frame-cap", and type between the tags, e.g.:
     <span class="frame-cap">the year we got the keys</span>

• Print keepsake — press Ctrl/Cmd-P to print the floor plan as a single
  clean landscape page she can frame. (Choose 'Landscape' if prompted.)

• Installable — when hosted (see below), it can be "kept" on a phone
  home screen and opened offline, like a little app.

• Ambient sound — a tiny speaker button (bottom-left) turns on a
  soft, generated room-tone with the faint scratch of a pencil.
  It's OFF by default and uses no audio files.

• The letter writes itself in — when she opens the envelope, the
  letter appears line by line, like it's being written in the moment.

• A little "day N of us ♥" counter — set your real start date in
  js/config.js (TOGETHER_SINCE). It shows quietly on the cover, and
  as "Days, so far" on the rooftop status board. On your celebration
  day-of-month (ANNIVERSARY_DAY) it becomes a "happy monthsary ♥"
  note. Returning visits get a soft "welcome back ♥". To turn the
  counter off, set SHOW_DAY_COUNTER to false.

• Desk-lamp glow — at night a warm pool of light follows her cursor,
  and the paper drifts ever so slightly with the mouse (parallax).

• Quiet finish — completing every room scatters a few soft sparkles
  across the plan. Press Esc in any room to slip back to the blueprint.

════════════════════════════════════════
GIVE THE HOUSE AN ADDRESS (recommended)
════════════════════════════════════════
The whole idea is "no address... yet." So give it one — it also
makes her saved note and the installable app fully reliable
(some browsers limit saving when a page is opened as a loose file).

Easiest free options:
  • Netlify Drop:  https://app.netlify.com/drop
    → drag the whole "house" folder onto the page. Done. You get a link.
  • GitHub Pages:  create a repo, upload the folder, enable Pages.

Either gives a real URL you can text her. You can add a custom
domain later if you want the address to be truly yours.

════════════════════════════════════════
THE MAP
════════════════════════════════════════
Opening → Keys → Door → the Floor Plan (the hub).
The blueprint is a wide architect's floor plan — you can see the whole
home at once. Public rooms (Entry Foyer, Kitchen, Dining, Living,
Balcony) run along the bottom; transition rooms (Study, Memory Cabinet,
Hallway, Reading Nook, Camera Corner) through the centre; private rooms
(Bedroom, Washroom, Laundry, After-Work, Rain Room, Argument Bench) up
top; the Garden spans the full width, and the Rooftop is a terrace at
top-centre. Rooms are numbered RM 01-18, drawn with furniture, windows
and doors. As Bebu visits each room it warms up and its windows light;
once all 18 are seen, an "Every Room Seen" stamp appears in the title
block. The Wardrobe is an unnumbered walk-in off the Bedroom.
All room words, stories, objects and the letter are unchanged.

Each room is still a SCENE you explore - tap the objects in it (the TV,
the lamp, the fridge, the telescope, the bathtub, the key bowl...) and
each answers with its own line. A Final Screen closes the letter, and
Lost & Found is a drawer in the Memory Cabinet.
Every room on the plan is clickable. Most rooms hide a small
"easter egg" — tap the dashed card inside a room to open it.

Don't miss:
 • Memory Cabinet → the "Letter from Bebu" drawer needs 3 clicks.
 • Memory Cabinet → the "Empty Drawer" is hers to write in.
 • Rooftop → windows light one by one, the chimney puffs a heart,
   then "...one more thing".
 • A faint 🌻 in the bottom-right of every screen → the secret letter.

════════════════════════════════════════
A TINY EASTER EGG FOR YOU
════════════════════════════════════════
If the visitor's browser identifies as "harisikh", the lock screen
just says: "Nice try."

════════════════════════════════════════
RESETTING (optional)
════════════════════════════════════════
Visited rooms, her note, and the "already opened" flag are stored
in the browser. To experience the first-open ceremony again, open
the browser console and run:  localStorage.clear()

Made with vanilla HTML, CSS & JavaScript. No frameworks. All yours.


──────────────────────────────────────────
MUSIC / HOME AUDIO
──────────────────────────────────────────
The speaker button (bottom-left) is OFF by default and never autoplays.

To use a real homecoming song (e.g. "Khat — Navjot Ahuja"):
  1. Put the audio file at:  house/assets/audio/homecoming.mp3
  2. Open the site and tap the speaker button.
It will loop softly and fade in.

If no homecoming.mp3 is present, a warm original chord pad plays
instead, so there is always gentle sound. (A copyrighted song can't be
bundled in the gift for you — just drop your chosen file in that folder.)
