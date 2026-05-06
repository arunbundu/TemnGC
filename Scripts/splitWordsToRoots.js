var splitToRoots = ( function () {

// =============================
// Temne Word Cleaner (JS Version)
// =============================
//
// Steps:
// - Standardizes apostrophes and removes periods
// - Splits text by spaces
// - Splits words by - using split_keep_Class
// - Splits words by apostrophes using split_keep_apostrophe
// - Splits words by h using split_by_h
// - Removes characters not in the Temne alphabet
// - Removes empty strings and irregularly written words (check_irregular_writing)
// - Returns a clean list of Temne words
// =============================

// -------------------------
// Helper Functions
// -------------------------

function split_keep_apostrophe(words) {
  const processed_words = [];

  for (let word of words) {
    if (word.includes("'")) {
      let parts;
      if (word.includes("'h")) {
        parts = word.split("'", 2);
        parts[0] += "'h";
      } else {
        parts = word.split("'", 2);
      }

      if (parts[0] && parts[0].replace(/\*/g, "").replace(/'/g, "").length >= 1) {
        if (parts[0].endsWith("'h")) {
          if (parts[0] === "'h") {
            processed_words.push("*" + parts[0]);
          } else {
            processed_words.push(parts[0]);
          }
        } else {
          processed_words.push(parts[0] + "'");
        }
      }

      if (parts[1] && parts[1].replace(/\*/g, "").replace(/'/g, "").length >= 1) {
        if (parts[1].startsWith("h")) {
          processed_words.push(parts[1]);
        } else {
          processed_words.push(parts[1]);
        }
      }
    } else {
      processed_words.push(word);
    }
  }

  return processed_words;
}

function has_only_one_h(word) {
  return (word.toLowerCase().match(/h/g) || []).length === 1;
}

function get_root_component_index(components) {
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    if (!component.includes("\u0301") && !component.includes("'") && component.trim() !== "") {
      return i;
    }
  }
  return components.length;
}

function extract_prefix(word) {
  if (word.startsWith("'")) return "";
  if (word.includes("'")) return word.split("'")[0] + "'";
  return "";
}

function split_keep_Class(words) {
  const processed_words = [];
  for (let word of words) {
    const prefix = extract_prefix(word);
    if (word.includes("-")) {
      const parts = word.split("-");
      for (let part of parts) {
        if (part && part === parts[0]) {
          processed_words.push(part);
          continue;
        }
        if (part) {
          if (prefix) processed_words.push(prefix + part);
          else processed_words.push(part);
        }
      }
    } else {
      processed_words.push(word);
    }
  }
  return processed_words;
}

function split_by_h(word_list) {
  const processed_list = [];

  for (let word of word_list) {
    if (!word.includes("h")) {
      processed_list.push(word);
      continue;
    }

    if (
      ((word.startsWith("h") && has_only_one_h(word)) ||
        (word.endsWith("h") && has_only_one_h(word))) ||
      word === "hāŋ"
    ) {
      processed_list.push(word);
      continue;
    }

    let prefix = "";

    if (word.includes("'") && !word.includes("'h")) {
      const parts = word.split("'");
      prefix = parts[0] + "'";
      word = parts[1];
    } else if (word.includes("'h")) {
      const parts = word.split("'h");
      prefix = parts[0] + "'h";
      word = parts[1];
    }

    const split_words = word.split(/h/);
    const root_index = get_root_component_index(split_words);

    for (let i = 0; i < split_words.length; i++) {
      const part = split_words[i];
      if (part.replace(/\*/g, "").replace(/'/g, "").length < 1) continue;

      if (i === root_index || part === "") {
        processed_list.push(prefix + part);
      } else {
        if (i < root_index) processed_list.push(part + "h");
        else processed_list.push("h" + part);
      }
    }
  }

  return processed_list;
}

function check_irregular_writing(words) {
  const irregular_words = [];
  const valid_words = [];

  for (let word of words) {
    const has_acute = word.includes("\u0301");
    const has_grave = word.includes("\u0300");
    const has_h = word.includes("h");
    const has_kq = word.includes("ḱ'q");
    const has_apostrophe = word.includes("'");
    const has_2Apos = word.includes("''");

    if (has_acute && !(has_h || has_apostrophe)) {
      irregular_words.push(word);
    } else if (has_acute && has_grave) {
      irregular_words.push(word);
    } else if (has_kq || has_2Apos) {
      irregular_words.push(word);
    } else {
      valid_words.push(word);
    }
  }

  return valid_words;
}

// -------------------------
// MAIN FUNCTION
// -------------------------

function custom_split(text) {
  const temneLetters = [
    "a", "m", "n", "s", "e", "r", "ŋ", "ɪ", "i", "j", "θ", "t", "\u03f4",
    "o", "b", "d", "ɱ", "u", "l", "β", "f", "ɔ", "k", "w", "x", "ɛ", "z", "c",
    "g", "ʌ", "y", "p", "ʂ", "ə", "ħ", "ʒ", "v", "\u0301", "\u0300", "q",
    "'", "\u0304", "h", "*"
  ];

  // Standardize apostrophes
  text = text.replace(/[’‘`]/g, "'").replace(/\./g, "");

  // Standardize theta variants
  text = text.replace(/\u03f4/g, "θ").replace(/ϴ/g, "θ");

  // Step 1: Split by spaces
  let words = text.replace(/\n/g, " ").split(" ");

  // Step 2: Split by "-"
  words = split_keep_Class(words);

  // Step 3: Split by "'"
  words = split_keep_apostrophe(words);

  // Step 4: Split by "h"
  words = split_by_h(words);

  // Step 5: Remove non-Temne letters
  words = words.map(word =>
    word.split("").filter(char => temneLetters.includes(char)).join("")
  );

  // Step 6: Remove empties and normalize
  words = words.map(w => w.trim()).filter(Boolean);

  // Step 7: Remove irregularly written words
  words = check_irregular_writing(words);

  return words;
}

return{

	custom_split: custom_split


}


})();