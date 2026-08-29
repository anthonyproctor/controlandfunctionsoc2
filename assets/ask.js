/* Ask widget for controlandfunction.com.
 *
 * BUILT TO BE REMOVED EASILY. To turn it off, delete the four
 * <script src="/assets/ask.js" defer></script> tags, or set ENABLED to false
 * below and redeploy. No other file depends on this one.
 *
 * All styling is inline on purpose. The site's Tailwind build only compiles
 * classes it can find in the HTML, so a class written only in JS would ship
 * unstyled. This file therefore has no CSS dependency at all.
 *
 * No third party script, no tracker, no cookie, no storage. The site loads
 * zero external JavaScript and this does not change that.
 */
(function () {
  "use strict";

  // Live since 2026-08-29. Endpoint deployed, spam protections tested, and a
  // message verified landing in the inbox rather than spam. Set to false to
  // switch the widget off site wide without touching anything else.
  var ENABLED = true;
  var ENDPOINT = "https://cf-ask-endpoint.vercel.app/api/ask"; // set after deploy
  if (!ENABLED) return;

  var NAVY = "#1e3a8a", SLATE = "#0f172a", BORDER = "#e2e8f0";
  var opened = 0, sent = false;

  function el(tag, style, attrs) {
    var n = document.createElement(tag);
    if (style) n.setAttribute("style", style);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    return n;
  }

  var btn = el("button",
    "position:fixed;right:20px;bottom:20px;z-index:9998;background:" + NAVY +
    ";color:#fff;border:0;border-radius:999px;padding:12px 20px;font:600 14px/1 " +
    "-apple-system,Segoe UI,Helvetica,Arial,sans-serif;cursor:pointer;" +
    "box-shadow:0 4px 14px rgba(15,23,42,.25)",
    { type: "button", "aria-label": "Ask a question" });
  btn.textContent = "Ask a question";

  var panel = el("div",
    "position:fixed;right:20px;bottom:78px;z-index:9999;width:min(360px,calc(100vw - 40px));" +
    "background:#fff;border:1px solid " + BORDER + ";border-radius:12px;padding:18px;" +
    "box-shadow:0 12px 40px rgba(15,23,42,.18);display:none;font:14px/1.5 " +
    "-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:" + SLATE,
    { role: "dialog", "aria-label": "Ask a question" });

  var inputCss = "width:100%;box-sizing:border-box;border:1px solid " + BORDER +
    ";border-radius:6px;padding:8px 10px;font:14px/1.4 inherit;margin-bottom:8px";

  panel.innerHTML =
    '<p style="margin:0 0 4px;font-weight:600">Ask a question</p>' +
    '<p style="margin:0 0 12px;color:#64748b;font-size:13px">Goes to a person, not a bot. ' +
    'Usually answered the same day.</p>' +
    '<input id="cfq-n" placeholder="Name, optional" style="' + inputCss + '">' +
    '<input id="cfq-e" type="email" placeholder="Email, if you want a reply" style="' + inputCss + '">' +
    '<textarea id="cfq-m" rows="4" placeholder="What are you trying to figure out?" style="' +
      inputCss + ';resize:vertical"></textarea>' +
    /* honeypot: off screen, not display:none, since some bots skip hidden fields */
    '<input id="cfq-w" tabindex="-1" autocomplete="off" aria-hidden="true" ' +
      'style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
    '<button id="cfq-s" type="button" style="width:100%;background:' + SLATE +
      ';color:#fff;border:0;border-radius:6px;padding:10px;font:600 14px/1 inherit;cursor:pointer">Send</button>' +
    '<p id="cfq-r" style="margin:10px 0 0;font-size:13px;color:#64748b"></p>';

  function toggle(show) {
    panel.style.display = show ? "block" : "none";
    btn.textContent = show ? "Close" : "Ask a question";
    if (show && !opened) opened = Date.now();
    if (show) { var m = document.getElementById("cfq-m"); if (m) m.focus(); }
  }

  btn.addEventListener("click", function () { toggle(panel.style.display !== "block"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.style.display === "block") toggle(false);
  });

  function wire() {
    var send = document.getElementById("cfq-s");
    var out = document.getElementById("cfq-r");
    send.addEventListener("click", function () {
      if (sent) return;
      var msg = document.getElementById("cfq-m").value.trim();
      if (!msg) { out.textContent = "Add a question first."; return; }
      send.disabled = true;
      send.textContent = "Sending...";
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("cfq-n").value,
          email: document.getElementById("cfq-e").value,
          message: msg,
          website: document.getElementById("cfq-w").value,   // honeypot
          elapsed: Date.now() - (opened || Date.now()),
          page: location.pathname,
        }),
      }).then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        sent = true;
        panel.innerHTML = '<p style="margin:0;font-weight:600">Sent.</p>' +
          '<p style="margin:8px 0 0;color:#64748b;font-size:13px">' +
          'That came straight to us, not into a queue. If you left an email you will hear back.</p>';
      }).catch(function () {
        send.disabled = false;
        send.textContent = "Send";
        out.innerHTML = 'Did not send. Email <a href="mailto:hello@controlandfunction.com" ' +
          'style="color:' + NAVY + '">hello@controlandfunction.com</a> instead.';
      });
    });
  }

  function mount() {
    document.body.appendChild(panel);
    document.body.appendChild(btn);
    wire();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else { mount(); }
})();
