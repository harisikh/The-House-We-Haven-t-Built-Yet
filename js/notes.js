/* The "Empty Drawer" becomes writable — her note persists locally,
   so the house gains a second occupant leaving ink on the page. */
const NOTES = {
  KEY: 'note:empty-drawer',

  // builds the writable UI inside the drawer modal
  render(container, prompt) {
    const saved = STORE.get(this.KEY, '');
    container.className = 'modal-body';
    container.innerHTML =
      `<div class="note-prompt">${prompt.replace(/\n/g, '<br>')}</div>` +
      `<textarea class="note-area" id="note-area" placeholder="Leave something here…"></textarea>` +
      `<div class="note-save"><span class="note-status" id="note-status"></span></div>`;
    const area = container.querySelector('#note-area');
    const status = container.querySelector('#note-status');
    area.value = saved;
    if (saved) { status.textContent = 'Saved'; status.classList.add('saved'); }

    let t;
    const save = () => {
      STORE.set(this.KEY, area.value);
      status.textContent = 'Saved'; status.classList.add('saved');
    };
    area.addEventListener('input', () => {
      status.textContent = 'Saving…'; status.classList.remove('saved');
      clearTimeout(t); t = setTimeout(save, 500);
    });
    area.addEventListener('blur', save);
    setTimeout(() => area.focus(), 200);
  },
};
