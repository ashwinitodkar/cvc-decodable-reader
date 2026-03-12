import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const ALPHABET = [
  { letter: "A", sound: "ah", word: "Apple", emoji: "🍎" },
  { letter: "B", sound: "ba", word: "Ball", emoji: "⚽" },
  { letter: "C", sound: "ka", word: "Cat", emoji: "🐱" },
  { letter: "D", sound: "da", word: "Dog", emoji: "🐶" },
  { letter: "E", sound: "eh", word: "Egg", emoji: "🥚" },
  { letter: "F", sound: "fa", word: "Fish", emoji: "🐟" },
  { letter: "G", sound: "ga", word: "Goat", emoji: "🐐" },
  { letter: "H", sound: "ha", word: "Hat", emoji: "🎩" },
  { letter: "I", sound: "ee", word: "Igloo", emoji: "🏔️" },
  { letter: "J", sound: "ja", word: "Jar", emoji: "🫙" },
  { letter: "K", sound: "ka", word: "Kite", emoji: "🪁" },
  { letter: "L", sound: "la", word: "Lion", emoji: "🦁" },
  { letter: "M", sound: "ma", word: "Map", emoji: "🗺️" },
  { letter: "N", sound: "na", word: "Nut", emoji: "🥜" },
  { letter: "O", sound: "o", word: "Owl", emoji: "🦉" },
  { letter: "P", sound: "pa", word: "Pig", emoji: "🐷" },
  { letter: "Q", sound: "kwa", word: "Queen", emoji: "👑" },
  { letter: "R", sound: "ra", word: "Rat", emoji: "🐭" },
  { letter: "S", sound: "sa", word: "Sun", emoji: "☀️" },
  { letter: "T", sound: "ta", word: "Top", emoji: "🎯" },
  { letter: "U", sound: "uh", word: "Up", emoji: "⬆️" },
  { letter: "V", sound: "va", word: "Van", emoji: "🚐" },
  { letter: "W", sound: "wa", word: "Web", emoji: "🕸️" },
  { letter: "X", sound: "ks", word: "Box", emoji: "📦" },
  { letter: "Y", sound: "ya", word: "Yak", emoji: "🐃" },
  { letter: "Z", sound: "za", word: "Zip", emoji: "🤐" },
];

const SIGHT_WORDS = [
  { word: "the", emoji: "👉" }, { word: "a", emoji: "1️⃣" },
  { word: "is", emoji: "✅" }, { word: "on", emoji: "⬆️" },
  { word: "has", emoji: "🤲" }, { word: "in", emoji: "📥" },
  { word: "it", emoji: "👆" }, { word: "can", emoji: "💪" },
  { word: "to", emoji: "➡️" }, { word: "he", emoji: "👦" },
  { word: "she", emoji: "👧" }, { word: "we", emoji: "👫" },
  { word: "my", emoji: "🙋" }, { word: "at", emoji: "📍" },
  { word: "up", emoji: "☝️" }, { word: "and", emoji: "➕" },
  { word: "go", emoji: "🚀" }, { word: "do", emoji: "✔️" },
  { word: "I", emoji: "😊" }, { word: "am", emoji: "🌟" },
];

const PHONICS = {
  a: "ah", e: "eh", i: "ee", o: "o", u: "uh",
  b: "ba", c: "ka", d: "da", g: "ga", h: "ha",
  j: "ja", k: "ka", p: "pa", t: "ta", x: "ks",
  f: "fa", l: "la", m: "ma", n: "na", r: "ra",
  s: "sa", v: "va", w: "wa", y: "ya", z: "za",
};

const BLEND_SETS = [
  { family: "-AT", color: "#FF6B35", words: ["c-a-t","b-a-t","h-a-t","r-a-t","m-a-t","s-a-t"] },
  { family: "-AN", color: "#E84393", words: ["m-a-n","c-a-n","p-a-n","v-a-n","r-a-n","f-a-n"] },
  { family: "-AP", color: "#F97316", words: ["c-a-p","m-a-p","n-a-p","t-a-p","l-a-p","z-a-p"] },
  { family: "-AD", color: "#EF4444", words: ["d-a-d","b-a-d","s-a-d","l-a-d","h-a-d","m-a-d"] },
  { family: "-IG", color: "#8B5CF6", words: ["p-i-g","b-i-g","d-i-g","w-i-g","j-i-g","f-i-g"] },
  { family: "-IN", color: "#6366F1", words: ["b-i-n","f-i-n","p-i-n","w-i-n","t-i-n","k-i-n"] },
  { family: "-IT", color: "#7C3AED", words: ["s-i-t","h-i-t","b-i-t","f-i-t","k-i-t","w-i-t"] },
  { family: "-ID", color: "#A855F7", words: ["k-i-d","l-i-d","h-i-d","d-i-d","r-i-d","b-i-d"] },
  { family: "-OG", color: "#10B981", words: ["d-o-g","l-o-g","f-o-g","h-o-g","j-o-g","b-o-g"] },
  { family: "-OT", color: "#059669", words: ["h-o-t","p-o-t","c-o-t","d-o-t","l-o-t","n-o-t"] },
  { family: "-OX", color: "#047857", words: ["b-o-x","f-o-x","p-o-x"] },
  { family: "-ED", color: "#3B82F6", words: ["b-e-d","r-e-d","f-e-d","w-e-d","t-e-d","l-e-d"] },
  { family: "-EN", color: "#0EA5E9", words: ["h-e-n","p-e-n","t-e-n","d-e-n","m-e-n","b-e-n"] },
  { family: "-ET", color: "#06B6D4", words: ["p-e-t","v-e-t","n-e-t","s-e-t","w-e-t","j-e-t"] },
  { family: "-UG", color: "#7C3AED", words: ["b-u-g","r-u-g","m-u-g","j-u-g","h-u-g","t-u-g"] },
  { family: "-UN", color: "#9333EA", words: ["s-u-n","r-u-n","f-u-n","b-u-n","g-u-n","n-u-n"] },
  { family: "-UT", color: "#C026D3", words: ["b-u-t","c-u-t","h-u-t","n-u-t","r-u-t","g-u-t"] },
  { family: "Y words", color: "#F59E0B", words: ["y-e-t","y-a-k","y-a-m","y-e-s"] },
  { family: "Z words", color: "#84CC16", words: ["z-a-p","z-i-p","z-i-t","z-e-n"] },
  { family: "V words", color: "#EF4444", words: ["v-a-n","v-e-t","v-i-m"] },
  { family: "X words", color: "#6B7280", words: ["b-o-x","f-o-x","s-i-x","m-i-x","f-i-x"] },
];

const WARMUP_PAGES = [
  { title: "-AT words", color: "#FF6B35", emoji: "🐱", words: [{word:"at",emoji:"📍"},{word:"bat",emoji:"🦇"},{word:"cat",emoji:"🐱"},{word:"fat",emoji:"🍔"},{word:"hat",emoji:"🎩"},{word:"mat",emoji:"🟫"},{word:"pat",emoji:"✋"},{word:"rat",emoji:"🐭"},{word:"sat",emoji:"🪑"}] },
  { title: "-AN words", color: "#E84393", emoji: "🏃", words: [{word:"an",emoji:"1️⃣"},{word:"ban",emoji:"🚫"},{word:"can",emoji:"🥫"},{word:"fan",emoji:"🌀"},{word:"man",emoji:"👨"},{word:"pan",emoji:"🍳"},{word:"ran",emoji:"🏃"},{word:"tan",emoji:"🟤"},{word:"van",emoji:"🚐"}] },
  { title: "-AP words", color: "#F97316", emoji: "🗺️", words: [{word:"cap",emoji:"🧢"},{word:"gap",emoji:"🕳️"},{word:"lap",emoji:"🦵"},{word:"map",emoji:"🗺️"},{word:"nap",emoji:"😴"},{word:"rap",emoji:"🎤"},{word:"sap",emoji:"🌿"},{word:"tap",emoji:"🚿"},{word:"zap",emoji:"⚡"}] },
  { title: "-AD words", color: "#EF4444", emoji: "😢", words: [{word:"bad",emoji:"👎"},{word:"dad",emoji:"👨"},{word:"had",emoji:"🤲"},{word:"lad",emoji:"👦"},{word:"mad",emoji:"😠"},{word:"sad",emoji:"😢"},{word:"pad",emoji:"📓"},{word:"bag",emoji:"🎒"},{word:"jam",emoji:"🍓"}] },
  { title: "-IG & -IN", color: "#8B5CF6", emoji: "🐷", words: [{word:"big",emoji:"🐘"},{word:"dig",emoji:"⛏️"},{word:"fig",emoji:"🌿"},{word:"jig",emoji:"💃"},{word:"pig",emoji:"🐷"},{word:"wig",emoji:"👱"},{word:"bin",emoji:"🗑️"},{word:"fin",emoji:"🐟"},{word:"pin",emoji:"📌"},{word:"win",emoji:"🏆"}] },
  { title: "-IT & -ID", color: "#6366F1", emoji: "🎯", words: [{word:"bit",emoji:"🦷"},{word:"fit",emoji:"💪"},{word:"hit",emoji:"🎯"},{word:"kit",emoji:"📦"},{word:"sit",emoji:"🪑"},{word:"wit",emoji:"🧠"},{word:"did",emoji:"✅"},{word:"hid",emoji:"🫣"},{word:"kid",emoji:"👧"},{word:"lid",emoji:"🫙"}] },
  { title: "-IP & -IX", color: "#7C3AED", emoji: "💧", words: [{word:"dip",emoji:"🤿"},{word:"hip",emoji:"🕺"},{word:"lip",emoji:"👄"},{word:"rip",emoji:"✂️"},{word:"sip",emoji:"🥤"},{word:"tip",emoji:"☝️"},{word:"zip",emoji:"🤐"},{word:"fix",emoji:"🔧"},{word:"mix",emoji:"🥣"},{word:"six",emoji:"6️⃣"}] },
  { title: "-OG & -OT", color: "#10B981", emoji: "🐸", words: [{word:"dog",emoji:"🐶"},{word:"fog",emoji:"🌫️"},{word:"hog",emoji:"🐗"},{word:"jog",emoji:"🏃"},{word:"log",emoji:"🪵"},{word:"cot",emoji:"🛏️"},{word:"dot",emoji:"🔵"},{word:"hot",emoji:"🔥"},{word:"lot",emoji:"🅿️"},{word:"pot",emoji:"🍲"}] },
  { title: "-OP & -OX", color: "#059669", emoji: "🦊", words: [{word:"cop",emoji:"👮"},{word:"hop",emoji:"🐸"},{word:"mop",emoji:"🧹"},{word:"pop",emoji:"🎈"},{word:"top",emoji:"🔝"},{word:"box",emoji:"📦"},{word:"fox",emoji:"🦊"},{word:"job",emoji:"💼"},{word:"mob",emoji:"👥"},{word:"sob",emoji:"😢"}] },
  { title: "-ED & -ET", color: "#3B82F6", emoji: "🛏️", words: [{word:"bed",emoji:"🛏️"},{word:"fed",emoji:"🍽️"},{word:"led",emoji:"💡"},{word:"red",emoji:"🔴"},{word:"wed",emoji:"💍"},{word:"jet",emoji:"✈️"},{word:"net",emoji:"🥅"},{word:"pet",emoji:"🐾"},{word:"set",emoji:"🎯"},{word:"vet",emoji:"🏥"}] },
  { title: "-EN & -EG", color: "#0EA5E9", emoji: "🐔", words: [{word:"den",emoji:"🏠"},{word:"hen",emoji:"🐔"},{word:"men",emoji:"👨‍👨‍👦"},{word:"pen",emoji:"🖊️"},{word:"ten",emoji:"🔟"},{word:"beg",emoji:"🙏"},{word:"keg",emoji:"🪣"},{word:"leg",emoji:"🦵"},{word:"peg",emoji:"📌"},{word:"wet",emoji:"💧"}] },
  { title: "-UG & -UN", color: "#7C3AED", emoji: "🐛", words: [{word:"bug",emoji:"🐛"},{word:"hug",emoji:"🤗"},{word:"jug",emoji:"🏺"},{word:"mug",emoji:"☕"},{word:"rug",emoji:"🟥"},{word:"tug",emoji:"⚓"},{word:"bun",emoji:"🍞"},{word:"fun",emoji:"🎉"},{word:"run",emoji:"🏃"},{word:"sun",emoji:"☀️"}] },
  { title: "-UT & -UB", color: "#9333EA", emoji: "✂️", words: [{word:"but",emoji:"↩️"},{word:"cut",emoji:"✂️"},{word:"gut",emoji:"💪"},{word:"hut",emoji:"🛖"},{word:"nut",emoji:"🥜"},{word:"rut",emoji:"🕳️"},{word:"cub",emoji:"🐻"},{word:"hub",emoji:"🔄"},{word:"rub",emoji:"🤲"},{word:"tub",emoji:"🛁"}] },
  { title: "Y & Z words", color: "#84CC16", emoji: "⚡", words: [{word:"yak",emoji:"🐃"},{word:"yam",emoji:"🍠"},{word:"yet",emoji:"⏳"},{word:"yes",emoji:"✅"},{word:"zap",emoji:"⚡"},{word:"zip",emoji:"🤐"},{word:"zen",emoji:"🧘"},{word:"van",emoji:"🚐"},{word:"vet",emoji:"🏥"},{word:"web",emoji:"🕸️"}] },
];

const SENTENCE_PAGES = [
  { title: "Short A — Part 1", color: "#FF6B35", sentences: [{text:"The man is sad.",emoji:"😢"},{text:"A man sat on a mat.",emoji:"🪑"},{text:"The man has a bat.",emoji:"🦇"},{text:"The cat had a nap.",emoji:"😴"},{text:"The bat is on the mat.",emoji:"🟫"},{text:"The cap is on the van.",emoji:"🚐"},{text:"The man has a map.",emoji:"🗺️"},{text:"Sam has a bag.",emoji:"🎒"},{text:"The fat cat ran.",emoji:"🐱"},{text:"The rat sat on a mat.",emoji:"🐭"}] },
  { title: "Short A — Part 2", color: "#E84393", sentences: [{text:"Pam has a pan.",emoji:"🍳"},{text:"Dad has the jam.",emoji:"🍓"},{text:"The cat sat on a mat.",emoji:"🐱"},{text:"A bad rat ran.",emoji:"🐭"},{text:"The bag is on the mat.",emoji:"🎒"},{text:"A cat ran to a mat.",emoji:"🏃"},{text:"The man had a bag.",emoji:"🛍️"},{text:"A sad cat sat.",emoji:"😿"},{text:"The man has a nap.",emoji:"😴"},{text:"Pam can fan the cat.",emoji:"🌀"}] },
  { title: "Short A — Part 3", color: "#F97316", sentences: [{text:"The cap is on the hat.",emoji:"🎩"},{text:"Dad sat on the mat.",emoji:"🪑"},{text:"A rat ran to the van.",emoji:"🚐"},{text:"The pan has jam.",emoji:"🍳"},{text:"Sam can tap the pan.",emoji:"🍳"},{text:"The fat rat had a nap.",emoji:"🐭"},{text:"Pam has a tan bag.",emoji:"🎒"},{text:"The bat hit the cap.",emoji:"🧢"},{text:"A man ran to the van.",emoji:"🏃"},{text:"Dan has a map.",emoji:"🗺️"}] },
  { title: "Short I — Part 1", color: "#8B5CF6", sentences: [{text:"The lid fell.",emoji:"🫙"},{text:"Tim can dig.",emoji:"⛏️"},{text:"Jim hid in the bin.",emoji:"🗑️"},{text:"Let him win.",emoji:"🏆"},{text:"Kim is a kid.",emoji:"👧"},{text:"A pig met a cat.",emoji:"🐷"},{text:"The kit is big.",emoji:"📦"},{text:"It is his kit.",emoji:"🎒"},{text:"Tim has a cat.",emoji:"🐱"},{text:"The pin is in the kit.",emoji:"📌"}] },
  { title: "Short I — Part 2", color: "#06B6D4", sentences: [{text:"The bin is big.",emoji:"🗑️"},{text:"The pig did a jig.",emoji:"💃"},{text:"The wig is big.",emoji:"👱"},{text:"The pig hid the wig.",emoji:"🐷"},{text:"The kit is red.",emoji:"❤️"},{text:"Tim can dig.",emoji:"⛏️"},{text:"The pig will dig.",emoji:"🐷"},{text:"The kid bit the fig.",emoji:"🌿"},{text:"Jill can sip the mix.",emoji:"🥤"},{text:"The fish is big.",emoji:"🐟"}] },
  { title: "Short I — Part 3", color: "#6366F1", sentences: [{text:"Kim hid in the bin.",emoji:"🗑️"},{text:"The kid can sit.",emoji:"🪑"},{text:"Did the pig win?",emoji:"🏆"},{text:"Sip from the big cup.",emoji:"🥤"},{text:"Tim will fix it.",emoji:"🔧"},{text:"The zip is on the kit.",emoji:"🤐"},{text:"Six kids sit in a pit.",emoji:"🕳️"},{text:"His lip is big.",emoji:"👄"},{text:"The tin is in the bin.",emoji:"🗑️"},{text:"Jill hit the lid.",emoji:"🫙"}] },
  { title: "Short O — Part 1", color: "#10B981", sentences: [{text:"The mop is wet.",emoji:"🧹"},{text:"Tom has a cot.",emoji:"🛏️"},{text:"Bob is on a log.",emoji:"🪵"},{text:"The pot is hot.",emoji:"🍲"},{text:"The dog sat on a log.",emoji:"🐶"},{text:"The dog ran.",emoji:"🏃"},{text:"A log fell.",emoji:"🪵"},{text:"Mom can mop.",emoji:"🧹"},{text:"The fox hid in a box.",emoji:"📦"},{text:"Bob can jog.",emoji:"🏃"}] },
  { title: "Short O — Part 2", color: "#F59E0B", sentences: [{text:"Hop on the log.",emoji:"🐸"},{text:"The dog met a cat.",emoji:"🐶"},{text:"Bob got a job.",emoji:"💼"},{text:"The big dog ran.",emoji:"🐕"},{text:"The fox is on the log.",emoji:"🦊"},{text:"Tom has a box.",emoji:"📦"},{text:"Mom has a job.",emoji:"💼"},{text:"The dog can hop.",emoji:"🐶"},{text:"The top fell off the pot.",emoji:"🍲"},{text:"The cop ran to the dog.",emoji:"👮"}] },
  { title: "Short O — Part 3", color: "#059669", sentences: [{text:"Tom can mop the top.",emoji:"🧹"},{text:"The fox got in the box.",emoji:"🦊"},{text:"Bob jogs in the fog.",emoji:"🌫️"},{text:"The hot pot fell.",emoji:"🍲"},{text:"A frog sat on a log.",emoji:"🐸"},{text:"The dog digs a lot.",emoji:"⛏️"},{text:"Mom got a big pot.",emoji:"🍲"},{text:"The cop has a job.",emoji:"👮"},{text:"Tom hops on the dot.",emoji:"🔵"},{text:"The cob is hot.",emoji:"🌽"}] },
  { title: "Short E — Part 1", color: "#3B82F6", sentences: [{text:"The pen is on a bed.",emoji:"🖊️"},{text:"Ted is on the bed.",emoji:"🛏️"},{text:"Ned has a pet.",emoji:"🐾"},{text:"The bed is big.",emoji:"🛏️"},{text:"I fed the dog.",emoji:"🐶"},{text:"The hen is red.",emoji:"🐔"},{text:"Get the pen.",emoji:"🖊️"},{text:"The pet is at the vet.",emoji:"🏥"},{text:"The red hen sat.",emoji:"🐔"},{text:"Ben set the net.",emoji:"🥅"}] },
  { title: "Short E — Part 2", color: "#14B8A6", sentences: [{text:"The pen fell.",emoji:"🖊️"},{text:"The men can dig.",emoji:"⛏️"},{text:"I fed the red hen.",emoji:"🐔"},{text:"His leg is wet.",emoji:"💧"},{text:"A red hen sat.",emoji:"🐔"},{text:"Ben has a pen.",emoji:"🖊️"},{text:"The red bed fell.",emoji:"🛏️"},{text:"The net is red.",emoji:"🥅"},{text:"Ted met ten men.",emoji:"👨‍👨‍👦"},{text:"The jet is set.",emoji:"✈️"}] },
  { title: "Short E — Part 3", color: "#0891B2", sentences: [{text:"Deb has a red pen.",emoji:"🖊️"},{text:"The wet hen ran.",emoji:"🐔"},{text:"Ken met the vet.",emoji:"🏥"},{text:"The peg fell off the bed.",emoji:"📌"},{text:"Ted fed the pet.",emoji:"🐾"},{text:"The jet went up.",emoji:"✈️"},{text:"Ten hens sat.",emoji:"🐔"},{text:"The men set the net.",emoji:"🥅"},{text:"Beg the dog to sit.",emoji:"🐶"},{text:"The red keg fell.",emoji:"🪣"}] },
  { title: "Short U — Part 1", color: "#7C3AED", sentences: [{text:"The pup sat on the rug.",emoji:"🐶"},{text:"The bug is in the mud.",emoji:"🐛"},{text:"Pup had fun.",emoji:"🎉"},{text:"The bug is on the rug.",emoji:"🟥"},{text:"The nut is in the cup.",emoji:"☕"},{text:"The big bug ran.",emoji:"🏃"},{text:"The pup dug a pit.",emoji:"⛏️"},{text:"Bud got a hug.",emoji:"🤗"},{text:"The cub sat in the sun.",emoji:"🐻"},{text:"Gus cut the bun.",emoji:"🍞"}] },
  { title: "Short U — Part 2", color: "#DC2626", sentences: [{text:"A tub is big.",emoji:"🛁"},{text:"The jug is in the mud.",emoji:"🏺"},{text:"The sun is up.",emoji:"☀️"},{text:"Mum has a bun.",emoji:"🍞"},{text:"Run to the rug.",emoji:"🟥"},{text:"A mug fell.",emoji:"☕"},{text:"The sun is hot.",emoji:"☀️"},{text:"The bug is big.",emoji:"🐛"},{text:"Rub the mud off the pup.",emoji:"🐶"},{text:"The cup is in the tub.",emoji:"🛁"}] },
  { title: "Short U — Part 3", color: "#9333EA", sentences: [{text:"Bud dug in the mud.",emoji:"⛏️"},{text:"The pup ran up the hill.",emoji:"🐶"},{text:"Gus has a big mug.",emoji:"☕"},{text:"The bug hid in the rug.",emoji:"🐛"},{text:"Mum cut the bun.",emoji:"🍞"},{text:"The pup got a hug.",emoji:"🤗"},{text:"Run and jump in the sun.",emoji:"☀️"},{text:"The cub ran to mum.",emoji:"🐻"},{text:"Gus put the nut in a cup.",emoji:"🥜"},{text:"The mud is in the tub.",emoji:"🛁"}] },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const toPhonics = (l) => PHONICS[l.toLowerCase()] || l;

const getVoice = () => {
  const v = window.speechSynthesis.getVoices();
  return v.find(x => x.lang.startsWith("en")) || v[0] || null;
};

const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  setTimeout(() => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8; u.pitch = 1.1; u.lang = "en-US";
    const voice = getVoice(); if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  }, 100);
};

const speakPhonics = (letters) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  let delay = 100;
  letters.forEach(l => {
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(toPhonics(l));
      u.rate = 0.7; u.pitch = 1.1; u.lang = "en-US";
      const voice = getVoice(); if (voice) u.voice = voice;
      window.speechSynthesis.speak(u);
    }, delay);
    delay += 600;
  });
};

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const S = {
  card: (color) => ({ background: "white", borderRadius: 16, border: `3px solid ${color}`, overflow: "hidden", marginBottom: 12 }),
  cardHead: (color) => ({ background: color, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }),
  headText: { color: "white", fontWeight: 800, fontSize: 16 },
  pill: (active, color) => ({ padding: "6px 12px", borderRadius: 20, border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer", background: active ? color : "#eee", color: active ? "white" : "#666", whiteSpace: "nowrap" }),
  navBtn: (disabled, color) => ({ flex: 1, padding: 14, borderRadius: 12, border: "none", background: disabled ? "#eee" : color, color: disabled ? "#aaa" : "white", fontSize: 16, fontWeight: 800, cursor: disabled ? "default" : "pointer", minHeight: 48 }),
  speakBtn: (color) => ({ background: "none", border: `2px solid ${color}`, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, minWidth: 36 }),
};

// ── TAB COMPONENTS ────────────────────────────────────────────────────────────

function AlphabetTab({ stars, addStar }) {
  const [sel, setSel] = useState(null);
  const item = sel !== null ? ALPHABET[sel] : null;
  return (
    <div>
      <p style={{ textAlign: "center", color: "#888", fontSize: 13, margin: "0 0 10px" }}>Tap a letter to learn its sound 🔤</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, marginBottom: 12 }}>
        {ALPHABET.map((a, i) => (
          <button key={i} onClick={() => { setSel(i); speak(a.letter + ". " + a.sound + ". " + a.word); addStar("alpha-" + i); }}
            style={{ background: sel === i ? "#6366F1" : stars["alpha-"+i] ? "#E0E7FF" : "#f3f3f3", color: sel === i ? "white" : "#333", border: "none", borderRadius: 10, padding: "10px 4px", textAlign: "center", cursor: "pointer", fontWeight: 800, fontSize: 20, minHeight: 48 }}>
            {a.letter}{stars["alpha-"+i] && <div style={{ fontSize: 9, color: sel===i?"white":"#6366F1" }}>★</div>}
          </button>
        ))}
      </div>
      {item && (
        <div style={{ ...S.card("#6366F1"), textAlign: "center", padding: 20 }}>
          <div style={{ fontSize: 64 }}>{item.emoji}</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#6366F1" }}>{item.letter}</div>
          <div style={{ fontSize: 15, color: "#555", margin: "6px 0" }}>Sound: <strong>"{item.sound}"</strong> · Word: <strong>{item.word}</strong></div>
          <button onClick={() => speak(item.letter + ". " + item.sound + ". " + item.word)}
            style={{ background: "#6366F1", color: "white", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 15, cursor: "pointer", fontWeight: 700, minHeight: 48 }}>🔊 Hear it</button>
        </div>
      )}
    </div>
  );
}

function BlendingTab({ stars, addStar }) {
  const [setIdx, setSetIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const bs = BLEND_SETS[setIdx];
  const raw = bs.words[wordIdx];
  const parts = raw.split("-");
  const full = parts.join("");

  const next = () => {
    if (wordIdx < bs.words.length - 1) { setWordIdx(w => w+1); setRevealed(false); }
    else { setSetIdx(s => (s+1) % BLEND_SETS.length); setWordIdx(0); setRevealed(false); }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {BLEND_SETS.map((b, i) => (
          <button key={i} onClick={() => { setSetIdx(i); setWordIdx(0); setRevealed(false); }} style={S.pill(i===setIdx, b.color)}>{b.family}</button>
        ))}
      </div>
      <div style={S.card(bs.color)}>
        <div style={{ padding: "20px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>Word {wordIdx+1} of {bs.words.length}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            {parts.map((p, i) => (
              <button key={i} onClick={() => speakPhonics([p])}
                style={{ width: 60, height: 70, borderRadius: 12, background: bs.color+"20", border: `2px solid ${bs.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 2 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: bs.color }}>{p}</span>
                <span style={{ fontSize: 11, color: bs.color, opacity: 0.8, fontWeight: 700 }}>{toPhonics(p)}</span>
              </button>
            ))}
          </div>
          <button onClick={() => speakPhonics(parts)}
            style={{ background: bs.color+"20", border: `1.5px solid ${bs.color}`, color: bs.color, borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer", marginBottom: 12, fontSize: 14, minHeight: 44 }}>
            🔊 Sound it out
          </button>
          {!revealed ? (
            <button onClick={() => { setRevealed(true); speak(full); addStar("blend-"+setIdx+"-"+wordIdx); }}
              style={{ display: "block", width: "100%", padding: 16, borderRadius: 12, border: "none", background: bs.color, color: "white", fontSize: 18, fontWeight: 800, cursor: "pointer", minHeight: 52 }}>
              Blend it! →
            </button>
          ) : (
            <div>
              <div style={{ fontSize: 52, fontWeight: 900, color: bs.color, marginBottom: 8 }}>{full}</div>
              <button onClick={() => speak(full)}
                style={{ background: bs.color+"20", border: `1.5px solid ${bs.color}`, color: bs.color, borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer", marginBottom: 12, fontSize: 14, minHeight: 44 }}>🔊 Hear word</button>
              <button onClick={next}
                style={{ display: "block", width: "100%", padding: 14, borderRadius: 12, border: "none", background: bs.color, color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer", minHeight: 52 }}>
                Next Word →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SightWordsTab({ stars, addStar }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("flash");
  const [quizInput, setQuizInput] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const w = SIGHT_WORDS[idx];

  const next = () => { setIdx(i => (i+1) % SIGHT_WORDS.length); setFlipped(false); setQuizInput(""); setQuizResult(null); };
  const prev = () => { setIdx(i => (i-1+SIGHT_WORDS.length) % SIGHT_WORDS.length); setFlipped(false); setQuizInput(""); setQuizResult(null); };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["flash","quiz"].map(m => (
          <button key={m} onClick={() => { setMode(m); setFlipped(false); setQuizInput(""); setQuizResult(null); }}
            style={{ flex: 1, padding: 12, borderRadius: 10, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", background: mode===m ? "#F59E0B" : "#eee", color: mode===m ? "white" : "#555", minHeight: 48 }}>
            {m === "flash" ? "🃏 Flash Cards" : "✏️ Quiz Me"}
          </button>
        ))}
      </div>
      <div style={{ ...S.card("#F59E0B"), padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{idx+1} / {SIGHT_WORDS.length}</div>
        {mode === "flash" ? (
          <>
            <div style={{ fontSize: 72, marginBottom: 4 }}>{flipped ? w.emoji : "🃏"}</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#F59E0B", marginBottom: 16 }}>{w.word}</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => { speak(w.word); addStar("sight-"+idx); }}
                style={{ background: "#FEF3C7", border: "1.5px solid #F59E0B", color: "#92400E", borderRadius: 8, padding: "12px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14, minHeight: 48 }}>🔊 Hear it</button>
              <button onClick={() => setFlipped(f => !f)}
                style={{ background: "#F59E0B", border: "none", color: "white", borderRadius: 8, padding: "12px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14, minHeight: 48 }}>{flipped ? "Hide" : "Show hint"}</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 72, marginBottom: 8 }}>{w.emoji}</div>
            <div style={{ fontSize: 14, color: "#888", marginBottom: 12 }}>What word does this picture hint at?</div>
            <input value={quizInput} onChange={e => setQuizInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter") { const ok = quizInput.trim().toLowerCase()===w.word.toLowerCase(); setQuizResult(ok); if(ok){speak("Yes! "+w.word);addStar("sight-"+idx);}else speak("Try again!"); } }}
              placeholder="Type the word..." style={{ fontSize: 22, padding: "12px 16px", borderRadius: 10, border: "2px solid #F59E0B", width: "80%", textAlign: "center", outline: "none" }} />
            {quizResult !== null && (
              <div style={{ marginTop: 12, fontSize: 24, fontWeight: 800, color: quizResult ? "#10B981" : "#EF4444" }}>
                {quizResult ? "✅ Yes! "+w.word : "❌ Try again!"}
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={prev} style={S.navBtn(false,"#F59E0B")}>← Prev</button>
        <button onClick={next} style={S.navBtn(false,"#F59E0B")}>Next →</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
        {SIGHT_WORDS.map((sw, i) => (
          <button key={i} onClick={() => { setIdx(i); setFlipped(false); setQuizInput(""); setQuizResult(null); }}
            style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", background: stars["sight-"+i] ? "#FEF3C7" : i===idx ? "#F59E0B" : "#eee", color: stars["sight-"+i] ? "#92400E" : i===idx ? "white" : "#555", minHeight: 36 }}>
            {sw.word}{stars["sight-"+i] ? "★" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

function WarmupTab({ completed, toggleComplete }) {
  const [pageIdx, setPageIdx] = useState(0);
  const page = WARMUP_PAGES[pageIdx];
  const allDone = page.words.every((_, i) => completed[`w-${pageIdx}-${i}`]);
  return (
    <div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {WARMUP_PAGES.map((p, i) => (
          <button key={i} onClick={() => setPageIdx(i)} style={S.pill(i===pageIdx, p.color)}>{p.title}</button>
        ))}
      </div>
      <div style={S.card(page.color)}>
        <div style={S.cardHead(page.color)}>
          <span style={{ fontSize: 30 }}>{page.emoji}</span>
          <span style={S.headText}>{page.title}</span>
          {allDone && <span style={{ marginLeft: "auto", fontSize: 24 }}>⭐</span>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: 12 }}>
          {page.words.map((w, i) => {
            const key = `w-${pageIdx}-${i}`;
            const done = completed[key];
            return (
              <button key={i} onClick={() => { toggleComplete(key); speak(w.word); }}
                style={{ background: done ? page.color : "#f9f9f9", border: `2px solid ${done ? page.color : "#eee"}`, borderRadius: 12, padding: "12px 6px", textAlign: "center", cursor: "pointer", minHeight: 80 }}>
                <div style={{ fontSize: 28 }}>{w.emoji}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: done ? "white" : "#333" }}>{w.word}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SentencesTab({ completed, toggleComplete }) {
  const [pageIdx, setPageIdx] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const page = SENTENCE_PAGES[pageIdx];

  const toggle = (i) => {
    const key = `s-${pageIdx}-${i}`;
    const wasCompleted = completed[key];
    toggleComplete(key);
    if (!wasCompleted) {
      const nowDone = page.sentences.every((_, idx) => idx===i ? true : completed[`s-${pageIdx}-${idx}`]);
      if (nowDone) { setCelebrate(true); setTimeout(() => setCelebrate(false), 1800); }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {celebrate && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#00000044", zIndex: 99, fontSize: 64 }}>
          🌟🎉⭐🎉🌟
        </div>
      )}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {SENTENCE_PAGES.map((p, i) => (
          <button key={i} onClick={() => setPageIdx(i)} style={S.pill(i===pageIdx, p.color)}>{p.title}</button>
        ))}
      </div>
      <div style={S.card(page.color)}>
        <div style={S.cardHead(page.color)}>
          <span style={S.headText}>{page.title}</span>
          {page.sentences.every((_, i) => completed[`s-${pageIdx}-${i}`]) && <span style={{ marginLeft: "auto", fontSize: 24 }}>⭐</span>}
        </div>
        <div style={{ padding: "10px 12px" }}>
          {page.sentences.map((s, i) => {
            const done = completed[`s-${pageIdx}-${i}`];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 8px", marginBottom: 6, borderRadius: 10, background: done ? page.color+"18" : "#fafafa", border: `1.5px solid ${done ? page.color : "#eee"}` }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</span>
                <span onClick={() => toggle(i)} style={{ flex: 1, fontSize: 16, fontWeight: 600, color: done ? page.color : "#333", textDecoration: done ? "line-through" : "none", cursor: "pointer", lineHeight: 1.4 }}>{s.text}</span>
                <button onClick={() => speak(s.text)} style={S.speakBtn(page.color)}>🔊</button>
                <button onClick={() => toggle(i)} style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${page.color}`, background: done ? page.color : "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", fontWeight: "bold", cursor: "pointer", flexShrink: 0, minWidth: 28 }}>{done ? "✓" : ""}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GardenTab({ stars, completed }) {
  const totalStars = Object.keys(stars).length;
  const totalDone = Object.values(completed).filter(Boolean).length;
  const flowers = ["🌸","🌺","🌻","🌹","🌷","💐","🌼","🏵️"];
  const trees = Math.floor(totalStars / 10);
  const flowerCount = totalStars % 10;
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>Keep learning to grow your garden! 🌱</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Letters", val: Object.keys(stars).filter(k=>k.startsWith("alpha")).length, total: 26, emoji: "🔤", color: "#6366F1" },
          { label: "Sight Words", val: Object.keys(stars).filter(k=>k.startsWith("sight")).length, total: 20, emoji: "👁️", color: "#F59E0B" },
          { label: "Sentences", val: totalDone, total: SENTENCE_PAGES.reduce((a,p)=>a+p.sentences.length,0), emoji: "📖", color: "#10B981" },
        ].map((s, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: `2px solid ${s.color}`, padding: "12px 6px" }}>
            <div style={{ fontSize: 26 }}>{s.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>of {s.total}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#555" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, border: "3px solid #10B981", padding: 20, minHeight: 160 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#10B981", marginBottom: 12 }}>🌿 Your Garden</div>
        {totalStars === 0 ? (
          <div style={{ color: "#ccc", fontSize: 15, padding: "20px 0" }}>Start learning to grow flowers! 🌱</div>
        ) : (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, fontSize: 32, marginBottom: 10 }}>
              {Array.from({ length: trees }).fill("🌳").map((t,i) => <span key={i}>{t}</span>)}
              {Array.from({ length: flowerCount }).fill(0).map((_,i) => <span key={i}>{flowers[i%flowers.length]}</span>)}
            </div>
            <div style={{ fontSize: 14, color: "#888" }}>{totalStars} ⭐ earned · {trees} 🌳 grown</div>
          </div>
        )}
        {totalStars >= 5 && <div style={{ marginTop: 10, fontSize: 15, color: "#F59E0B", fontWeight: 700 }}>🏆 {totalStars>=20?"Super Reader!":totalStars>=10?"Great Reader!":"Good Start!"}</div>}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "alpha", label: "ABC", emoji: "🔤", color: "#6366F1" },
  { id: "blend", label: "Blend", emoji: "🔀", color: "#EC4899" },
  { id: "sight", label: "Sight", emoji: "👁️", color: "#F59E0B" },
  { id: "warmup", label: "Words", emoji: "📝", color: "#10B981" },
  { id: "sentences", label: "Read", emoji: "📖", color: "#3B82F6" },
  { id: "garden", label: "Garden", emoji: "🌸", color: "#10B981" },
];

export default function App() {
  const [tab, setTab] = useState("alpha");
  const [completed, setCompleted] = useState({});
  const [stars, setStars] = useState({});
  const activeTab = TABS.find(t => t.id === tab);
  const toggleComplete = (key) => setCompleted(p => ({ ...p, [key]: !p[key] }));
  const addStar = (key) => setStars(p => ({ ...p, [key]: true }));

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FF", fontFamily: "'Segoe UI', sans-serif", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: activeTab.color, padding: "14px 16px", textAlign: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "white" }}>📚 Learn to Read!</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>⭐ {Object.keys(stars).length} stars earned</div>
      </div>

      {/* Tab bar - sticky */}
      <div style={{ display: "flex", background: "white", borderBottom: "2px solid #eee", position: "sticky", top: 58, zIndex: 10, overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, minWidth: 60, padding: "10px 4px", border: "none", cursor: "pointer", background: tab===t.id ? t.color+"15" : "white", borderBottom: tab===t.id ? `3px solid ${t.color}` : "3px solid transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 20 }}>{t.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: tab===t.id ? t.color : "#999" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content with bottom padding for mobile nav */}
      <div style={{ padding: "14px 12px 80px" }}>
        {tab === "alpha" && <AlphabetTab stars={stars} addStar={addStar} />}
        {tab === "blend" && <BlendingTab stars={stars} addStar={addStar} />}
        {tab === "sight" && <SightWordsTab stars={stars} addStar={addStar} />}
        {tab === "warmup" && <WarmupTab completed={completed} toggleComplete={toggleComplete} />}
        {tab === "sentences" && <SentencesTab completed={completed} toggleComplete={toggleComplete} />}
        {tab === "garden" && <GardenTab stars={stars} completed={completed} />}
      </div>
    </div>
  );
}
