# Samsung Frame custom launcher

A minimal text launcher (big app names, accent bar, sweep animation, clock). Tizen web app, no build step.

- Preview in any desktop browser: open `index.html`, use ↑ ↓ Enter.
- Edit the apps/colours/order in `js/apps.js`.

## Reality check
Samsung does not allow replacing Smart Hub/the Frame's built-in home. This installs as a normal app
you open from the Apps row (and you can put it first in the row). Press Home to return to Samsung's UI.

## Deploy to the TV
1. Install **Tizen Studio** (https://developer.tizen.org/development/tizen-studio/download) plus the
   **TV Extensions** and **Certificate Manager** via Package Manager.
2. Make a **Samsung certificate** (Tools → Certificate Manager → Samsung certificate, TV, log in with a Samsung account).
3. On the TV: Apps → press `1 2 3 4 5` on the remote (or on-screen keypad) → toggle **Developer mode ON**,
   enter your computer's IP, reboot the TV. (Settings → General → Network → Network Status shows the TV IP.)
4. Tizen Studio → Device Manager → Remote Device Manager → **+** → TV's IP → connection on.
   In Certificate Manager, make sure the DUID of the TV is included in the certificate.
5. File → Import → Tizen → Tizen Project → select this folder. Right-click the project → **Run As → Tizen Web Application**.
6. The app "Launcher" appears in the TV's Apps list.

CLI alternative: `tizen package -t wgt -s <cert-profile> -- .` then `tizen install -n Launcher.wgt -t <tv-name>`.

## App IDs
The IDs in `js/apps.js` are best guesses; Netflix, YouTube, Prime Video and Disney+ are commonly used values,
but the UK apps (iPlayer, ITVX, Channel 4/5) vary by TV model/region. To verify on your TV, with the TV in
developer mode: `sdb connect <tv-ip>` then `sdb shell 0 applist`, and copy the IDs into `js/apps.js`.
Wrong ID = tapping the entry does nothing.
