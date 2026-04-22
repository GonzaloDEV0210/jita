// JITA — Application form modal (vanilla JS)
(function () {
  function buildForm(missionTitle) {
    const desc = missionTitle
      ? `${JITA.t('form.descriptionWith')} ${missionTitle}`
      : JITA.t('form.descriptionWithout');
    return `
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;">
        <span style="color:hsl(var(--primary));font-size:1.5rem;line-height:0;">${JITA.icon('heart')}</span>
        <h2 style="font-family:'Playfair Display',serif;margin:0;font-size:1.75rem;">${JITA.t('form.title')}</h2>
      </div>
      <p style="color:hsl(var(--muted-foreground));margin:0 0 1rem;">${desc}</p>
      <form id="jita-app-form" style="display:flex;flex-direction:column;gap:1rem;">
        <div>
          <label class="label">${JITA.icon('users')} ${JITA.t('form.name')} *</label>
          <input class="input" name="name" required placeholder="${JITA.t('form.name.placeholder')}" />
        </div>
        <div>
          <label class="label">${JITA.icon('mail')} ${JITA.t('form.email')} *</label>
          <input class="input" type="email" name="email" required placeholder="tu@email.com" />
        </div>
        <div>
          <label class="label">📞 ${JITA.t('form.phone')} *</label>
          <input class="input" type="tel" name="phone" required placeholder="+1 234 567 8900" />
        </div>
        <div>
          <label class="label">${JITA.icon('calendar')} ${JITA.t('form.birthDate')} *</label>
          <input class="input" type="date" name="birthDate" required />
        </div>
        <div>
          <label class="label">📝 ${JITA.t('form.experience')}</label>
          <textarea class="textarea" name="experience" rows="3" placeholder="${JITA.t('form.experience.placeholder')}"></textarea>
        </div>
        <div>
          <label class="label">${JITA.icon('heart')} ${JITA.t('form.motivation')} *</label>
          <textarea class="textarea" name="motivation" rows="4" required placeholder="${JITA.t('form.motivation.placeholder')}"></textarea>
        </div>
        <div style="background:hsl(var(--primary) / .05);border:1px solid hsl(var(--primary) / .15);padding:1rem;border-radius:.5rem;">
          <h4 style="margin:0 0 .5rem;font-family:Inter,sans-serif;display:flex;align-items:center;gap:.5rem;">📝 ${JITA.t('form.important')}</h4>
          <ul style="font-size:.875rem;color:hsl(var(--muted-foreground));margin:0;padding-left:1rem;">
            <li>${JITA.t('form.important.passport')}</li>
            <li>${JITA.t('form.important.vaccines')}</li>
            <li>${JITA.t('form.important.contact')}</li>
            <li>${JITA.t('form.important.info')}</li>
          </ul>
        </div>
        <div style="display:flex;gap:.75rem;padding-top:.5rem;">
          <button type="button" class="btn btn-outline" style="flex:1;" data-cancel>${JITA.t('form.cancel')}</button>
          <button type="submit" class="btn btn-primary" style="flex:1;">${JITA.t('form.submit')}</button>
        </div>
      </form>
    `;
  }

  window.JITA.openApplicationForm = function (missionTitle) {
    const m = JITA.modal(buildForm(missionTitle));
    const form = m.root.querySelector('#jita-app-form');
    m.root.querySelector('[data-cancel]').addEventListener('click', m.close);
    form.addEventListener('submit', e => {
      e.preventDefault();
      JITA.toast(JITA.t('form.success.title'), JITA.t('form.success.desc'));
      m.close();
    });
  };
})();
