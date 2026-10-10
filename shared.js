// Shared by every page: Supabase client, small DOM helpers, session guard.
// Public values only. NEVER put the service_role key in this file.
const SUPABASE_URL = 'https://kzqpannznfinwmyuqoio.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ywCVFBnY8ypFA1yaWYrq-Q_EVsUzNFM';
const DEMO = new URLSearchParams(location.search).has('demo');   // ?demo: statements with invented data, no sign-in
const db = DEMO ? null : supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { flowType: 'pkce', persistSession: true, detectSessionInUrl: true } });

const $ = id => document.getElementById(id);
const show = (id, on) => { $(id).hidden = !on; };
// Folder the app is served from, e.g. https://lmleung7.github.io/my-life-app/ (the sign-in redirect URL).
const appBase = () => location.origin + location.pathname.replace(/[^/]*$/, '');

// Module pages call this. It never trusts the landing page: every page checks the session itself,
// and row-level security in the database is what actually limits the data.
function guardPage(start) {
  if (DEMO) {
    $('signout').hidden = true;
    $('who').textContent = 'demo mode';
    show('topnav', true);
    start();
    return;
  }
  let uid = null;
  $('signout').onclick = () => db.auth.signOut();
  db.auth.onAuthStateChange((_event, s) => {
    setTimeout(() => {
      if (!s) { location.replace(appBase()); return; }               // signed out (here or in another tab)
      if (uid && uid !== s.user.id) { location.reload(); return; }   // different account: start clean
      if (uid) return;                                               // token refresh / tab refocus: leave the page alone
      uid = s.user.id;
      $('who').textContent = s.user.email || '';
      show('topnav', true);
      start();
    }, 0);
  });
}
