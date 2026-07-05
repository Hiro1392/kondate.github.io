const SHOPPING_DATA_VERSION = "empty-shopping-list-with-horizontal-manual-form-v3";

const defaultIngredients = [
  { name: "豚こまぎれ肉", category: "肉", aliases: ["豚こま", "豚こま切れ肉"] },
  { name: "豚バラ薄切り肉", category: "肉", aliases: ["豚バラ"] },
  { name: "鶏もも肉", category: "肉", aliases: ["鶏もも"] },
  { name: "鶏ひき肉", category: "肉", aliases: ["鶏ミンチ"] },
  { name: "鮭", category: "魚", aliases: ["さけ", "サーモン"] },
  { name: "めかじき", category: "魚", aliases: ["メカジキ"] },
  { name: "さわら", category: "魚", aliases: ["鰆"] },
  { name: "たら", category: "魚", aliases: ["鱈"] },
  { name: "かぼちゃ", category: "野菜", aliases: ["南瓜"] },
  { name: "じゃがいも", category: "野菜", aliases: ["じゃが芋"] },
  { name: "かぶ", category: "野菜", aliases: ["蕪"] },
  { name: "かぶの葉", category: "野菜", aliases: [] },
  { name: "小松菜", category: "野菜", aliases: [] },
  { name: "豆苗", category: "野菜", aliases: [] },
  { name: "白菜キムチ", category: "野菜", aliases: ["キムチ"] },
  { name: "えのきだけ", category: "野菜", aliases: ["えのき"] },
  { name: "しいたけ", category: "野菜", aliases: ["椎茸"] },
  { name: "しめじ", category: "野菜", aliases: [] },
  { name: "玉ねぎ", category: "野菜", aliases: ["玉葱"] },
  { name: "ねぎ", category: "野菜", aliases: ["長ねぎ", "長ネギ"] },
  { name: "ピーマン", category: "野菜", aliases: [] },
  { name: "赤パプリカ", category: "野菜", aliases: [] },
  { name: "黄パプリカ", category: "野菜", aliases: [] },
  { name: "にんじん", category: "野菜", aliases: ["人参"] },
  { name: "キャベツ", category: "野菜", aliases: [] },
  { name: "さやいんげん", category: "野菜", aliases: ["いんげん"] },
  { name: "赤とうがらし", category: "野菜", aliases: ["赤唐辛子", "とうがらし"] },
  { name: "セロリ", category: "野菜", aliases: [] },
  { name: "レモンの薄切り", category: "野菜", aliases: ["レモン"] },
  { name: "万能ねぎ", category: "野菜", aliases: ["ねぎ"] },
  { name: "パクチー", category: "野菜", aliases: ["香菜"] },
  { name: "青じそ", category: "野菜", aliases: ["大葉"] },
  { name: "ベビーリーフ", category: "野菜", aliases: [] },
  { name: "しょうが", category: "野菜", aliases: ["生姜", "ショウガ"] },
  { name: "にんにく", category: "野菜", aliases: ["ニンニク", "大蒜"] },
  { name: "バター", category: "その他", aliases: [] },
  { name: "わかめ(乾燥)", category: "その他", aliases: ["わかめ", "乾燥わかめ"] },
  { name: "ヨーグルト(無糖)", category: "その他", aliases: ["ヨーグルト"] },
];

const defaultPantry = [
  "しょうゆ",
  "酒",
  "みりん",
  "砂糖",
  "塩",
  "こしょう",
  "酢",
  "みそ",
  "かたくり粉",
  "ごま油",
  "オリーブ油",
  "中濃ソース",
  "トマトケチャップ",
  "カレー粉",
  "はちみつ",
  "ポン酢しょうゆ",
];

const categories = ["肉", "魚", "野菜", "卵・豆腐"];
const shoppingCategoryOrder = ["肉", "魚", "野菜", "卵・豆腐", "その他"];
const seasoningCategory = "調味料";

let recipes = [];
let selectedCategory = "";
let selectedIngredient = "";
let selectedRecipeId = "";
let shoppingItems = loadJson("shoppingItems", []);
let selectedShoppingRecipes = loadJson("selectedShoppingRecipes", []);

if (localStorage.getItem("shoppingDataVersion") !== SHOPPING_DATA_VERSION) {
  shoppingItems = [];
  selectedShoppingRecipes = [];
  saveJson("shoppingItems", shoppingItems);
  saveJson("selectedShoppingRecipes", selectedShoppingRecipes);
  localStorage.setItem("shoppingDataVersion", SHOPPING_DATA_VERSION);
}

const recipeCount = document.querySelector("#recipeCount");
const ingredientSearch = document.querySelector("#ingredientSearch");
const categoryTabs = document.querySelector("#categoryTabs");
const ingredientGrid = document.querySelector("#ingredientGrid");
const pantryInput = document.querySelector("#pantryInput");
const tagFilter = document.querySelector("#tagFilter");
const selectedIngredientLabel = document.querySelector("#selectedIngredient");
const recipeList = document.querySelector("#recipeList");
const shoppingEmpty = document.querySelector("#shoppingEmpty");
const shoppingList = document.querySelector("#shoppingList");
const shoppingForm = document.querySelector("#shoppingForm");
const recipeForm = document.querySelector("#recipeForm");

pantryInput.value = loadJson("pantry", defaultPantry).join("、");

document.querySelector("#clearFilters").addEventListener("click", () => {
  selectedCategory = "";
  selectedIngredient = "";
  selectedRecipeId = "";
  ingredientSearch.value = "";
  tagFilter.value = "";
  render();
});

document.querySelector("#clearShopping").addEventListener("click", () => {
  selectedRecipeId = "";
  shoppingItems = [];
  selectedShoppingRecipes = [];
  saveJson("shoppingItems", shoppingItems);
  saveJson("selectedShoppingRecipes", selectedShoppingRecipes);
  localStorage.setItem("shoppingDataVersion", SHOPPING_DATA_VERSION);
  renderRecipes();
  renderShoppingList();
});

ingredientSearch.addEventListener("input", () => {
  selectedIngredient = ingredientSearch.value.trim();
  renderIngredients();
  renderRecipes();
});

pantryInput.addEventListener("input", () => {
  saveJson("pantry", getPantryItems());
  renderRecipes();
});

tagFilter.addEventListener("change", renderRecipes);

shoppingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(shoppingForm);
  const itemName = String(form.get("item")).trim();
  const amount = String(form.get("amount")).trim() || "必要量";
  if (!itemName) return;

  addManualShoppingItem(itemName, amount);
  shoppingForm.reset();
  renderShoppingList();
});

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(recipeForm);
  const main = splitWords(form.get("main"));
  const subs = splitWords(form.get("subs"));
  const seasonings = splitWords(form.get("seasonings"));
  const recipe = {
    id: `recipe_${Date.now()}`,
    name: String(form.get("name")).trim(),
    mainIngredients: main,
    ingredients: [
      ...main.map((name) => ({ name, amount: "", category: guessCategory(name) })),
      ...subs.map((name) => ({ name, amount: "", category: guessCategory(name) })),
      ...seasonings.map((name) => ({ name, amount: "", category: guessCategory(name) })),
    ],
    tags: splitWords(form.get("tags")),
    time: Number(form.get("time")) || 0,
    servings: String(form.get("servings")).trim(),
    book: String(form.get("book")).trim(),
    page: Number(form.get("page")) || "",
    memo: String(form.get("memo")).trim(),
  };

  recipes = [recipe, ...recipes];
  saveJson("recipes", recipes);
  selectedIngredient = main[0] || "";
  selectedRecipeId = recipe.id;
  ingredientSearch.value = selectedIngredient;
  recipeForm.reset();
  render();
});

async function init() {
  try {
    const response = await fetch("recipes.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`recipes.json ${response.status}`);
    const data = await response.json();
    const currentVersion = localStorage.getItem("recipeDataVersion");
    if (currentVersion !== data.version) {
      saveJson("recipes", data.recipes);
      localStorage.setItem("recipeDataVersion", data.version);
      shoppingItems = [];
      selectedShoppingRecipes = [];
      saveJson("shoppingItems", shoppingItems);
      saveJson("selectedShoppingRecipes", selectedShoppingRecipes);
      localStorage.setItem("shoppingDataVersion", SHOPPING_DATA_VERSION);
    }
    recipes = loadJson("recipes", data.recipes);
  } catch (error) {
    recipeList.innerHTML = '<div class="empty-state">レシピJSONを読み込めませんでした。</div>';
    console.error(error);
    return;
  }
  render();
}

function render() {
  recipeCount.textContent = recipes.length;
  renderCategories();
  renderTags();
  renderIngredients();
  renderRecipes();
  renderShoppingList();
}

function renderCategories() {
  categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-button${selectedCategory === category ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      selectedCategory = selectedCategory === category ? "" : category;
      selectedIngredient = "";
      ingredientSearch.value = "";
      renderIngredients();
      renderRecipes();
    });
    categoryTabs.appendChild(button);
  });
}

function renderIngredients() {
  const query = ingredientSearch.value.trim().toLowerCase();
  const ingredients = getAllIngredients().filter((ingredient) => {
    const categoryMatches = !selectedCategory || ingredient.category === selectedCategory;
    const textMatches =
      !query ||
      ingredient.name.toLowerCase().includes(query) ||
      ingredient.aliases.some((alias) => alias.toLowerCase().includes(query));
    return categoryMatches && textMatches;
  });

  ingredientGrid.innerHTML = "";
  ingredients.forEach((ingredient) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `ingredient-button${selectedIngredient === ingredient.name ? " active" : ""}`;
    button.textContent = ingredient.name;
    button.addEventListener("click", () => {
      selectedIngredient = ingredient.name;
      ingredientSearch.value = ingredient.name;
      renderIngredients();
      renderRecipes();
    });
    ingredientGrid.appendChild(button);
  });

  if (!ingredients.length) {
    ingredientGrid.innerHTML = '<div class="empty-state">一致する食材がありません。</div>';
  }
}

function renderTags() {
  const current = tagFilter.value;
  const tags = [...new Set(recipes.flatMap((recipe) => recipe.tags))].sort((a, b) => a.localeCompare(b, "ja"));
  tagFilter.innerHTML = '<option value="">すべてのタグ</option>';
  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
  tagFilter.value = tags.includes(current) ? current : "";
}

function renderRecipes() {
  const pantry = getPantryItems();
  const selectedTag = tagFilter.value;
  const query = selectedIngredient || ingredientSearch.value.trim();
  const candidates = recipes
    .filter((recipe) => !query || recipeMatchesIngredient(recipe, query))
    .filter((recipe) => !selectedTag || recipe.tags.includes(selectedTag))
    .map((recipe) => ({ recipe, missing: getMissingIngredients(recipe, pantry) }))
    .sort((a, b) => a.missing.length - b.missing.length || a.recipe.time - b.recipe.time);

  selectedIngredientLabel.textContent = query ? `${query} を使うレシピ` : "食材を選択してください";
  recipeList.innerHTML = "";

  if (!candidates.length) {
    recipeList.innerHTML = '<div class="empty-state">該当するレシピがありません。</div>';
    return;
  }

  candidates.forEach(({ recipe, missing }) => {
    const card = document.createElement("article");
    card.className = `recipe-card${selectedRecipeId === recipe.id ? " selected" : ""}`;
    const missingText = missing.length ? `${missing.length}品不足` : "不足なし";
    const missingNames = missing.length ? missing.map((item) => item.name).join("、") : "なし";
    card.innerHTML = `
      <div class="recipe-topline">
        <h3 class="recipe-title">${escapeHtml(recipe.name)}</h3>
        <span class="missing-badge${missing.length ? "" : " none"}">${missingText}</span>
      </div>
      <div class="recipe-meta">
        ${recipe.time ? `<span>${recipe.time}分</span>` : ""}
        ${recipe.servings ? `<span>${escapeHtml(recipe.servings)}</span>` : ""}
        ${recipe.book ? `<span>${escapeHtml(recipe.book)}${recipe.page ? ` p.${recipe.page}` : ""}</span>` : ""}
      </div>
      <div class="ingredient-line">必要食材: ${recipe.ingredients.map((item) => escapeHtml(item.name)).join("、")}</div>
      <div class="ingredient-line">足りない食材: ${escapeHtml(missingNames)}</div>
      ${recipe.memo ? `<div class="ingredient-line">メモ: ${escapeHtml(recipe.memo)}</div>` : ""}
      <div class="tag-row">${recipe.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <button class="primary-button" type="button">買い物リストに追加</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedRecipeId = recipe.id;
      addRecipeToShoppingList(recipe);
      renderRecipes();
      renderShoppingList();
    });
    recipeList.appendChild(card);
  });
}

function addRecipeToShoppingList(recipe) {
  const items = getMissingIngredients(recipe, getPantryItems());
  if (!selectedShoppingRecipes.includes(recipe.name)) {
    selectedShoppingRecipes.push(recipe.name);
  }
  items.forEach((item) => {
    const key = `${normalize(item.category)}:${normalize(item.name)}`;
    const existing = shoppingItems.find((shoppingItem) => shoppingItem.key === key);
    if (existing) {
      existing.amounts.push(item.amount || "必要量");
      existing.recipes.push(recipe.name);
      return;
    }
    shoppingItems.push({
      key,
      name: item.name,
      category: item.category || "その他",
      amounts: [item.amount || "必要量"],
      recipes: [recipe.name],
      checked: false,
    });
  });
  saveJson("shoppingItems", shoppingItems);
  saveJson("selectedShoppingRecipes", selectedShoppingRecipes);
}

function addManualShoppingItem(name, amount) {
  const category = guessCategory(name);
  const normalizedCategory = category === seasoningCategory ? "その他" : category;
  const key = `${normalize(normalizedCategory)}:${normalize(name)}`;
  const existing = shoppingItems.find((shoppingItem) => shoppingItem.key === key);
  if (existing) {
    existing.amounts.push(amount || "必要量");
  } else {
    shoppingItems.push({
      key,
      name,
      category: normalizedCategory || "その他",
      amounts: [amount || "必要量"],
      recipes: [],
      checked: false,
    });
  }
  saveJson("shoppingItems", shoppingItems);
}

function renderShoppingList() {
  shoppingList.innerHTML = "";
  shoppingEmpty.style.display = shoppingItems.length ? "none" : "block";
  if (!shoppingItems.length) return;

  const grouped = shoppingItems.reduce((result, item) => {
    const category = item.category || "その他";
    result[category] = result[category] || [];
    result[category].push(item);
    return result;
  }, {});

  sortCategories(Object.keys(grouped)).forEach((category) => {
    const group = document.createElement("section");
    group.className = "shopping-group";
    group.innerHTML = `<h3>${escapeHtml(category)}</h3>`;
    grouped[category].forEach((item) => {
      const row = document.createElement("label");
      row.className = `shopping-item${item.checked ? " checked" : ""}`;
      row.innerHTML = `
        <input type="checkbox" ${item.checked ? "checked" : ""} />
        <span>${escapeHtml(item.name)}</span>
        <span class="amount">${escapeHtml(formatAmounts(item.amounts))}</span>
      `;
      row.querySelector("input").addEventListener("change", (event) => {
        item.checked = event.target.checked;
        row.classList.toggle("checked", item.checked);
        saveJson("shoppingItems", shoppingItems);
      });
      group.appendChild(row);
    });
    shoppingList.appendChild(group);
  });

  const recipeNames = getSelectedShoppingRecipeNames();
  if (recipeNames.length) {
    const selectedRecipes = document.createElement("section");
    selectedRecipes.className = "selected-recipes";
    selectedRecipes.innerHTML = `
      <h3>選んだレシピ</h3>
      <ul>${recipeNames.map((name) => `<li>${escapeHtml(name)}</li>`).join("")}</ul>
    `;
    shoppingList.appendChild(selectedRecipes);
  }
}

function getSelectedShoppingRecipeNames() {
  const fromItems = shoppingItems.flatMap((item) => item.recipes || []);
  return [...new Set([...selectedShoppingRecipes, ...fromItems])];
}

function getAllIngredients() {
  const map = new Map(defaultIngredients.map((item) => [item.name, { ...item }]));
  recipes.flatMap((recipe) => recipe.ingredients).forEach((item) => {
    if (!map.has(item.name) && item.category !== seasoningCategory) {
      map.set(item.name, { name: item.name, category: item.category || "その他", aliases: [] });
    }
  });
  return [...map.values()].sort((a, b) => {
    const categoryDiff = categories.indexOf(a.category) - categories.indexOf(b.category);
    return categoryDiff || a.name.localeCompare(b.name, "ja");
  });
}

function recipeMatchesIngredient(recipe, query) {
  const normalizedQuery = normalize(query);
  return (
    recipe.ingredients.some((item) => normalize(item.name).includes(normalizedQuery)) ||
    recipe.mainIngredients.some((item) => normalize(item).includes(normalizedQuery))
  );
}

function getMissingIngredients(recipe, pantry) {
  const pantrySet = new Set(pantry.map(normalize));
  return recipe.ingredients.filter((item) => {
    if (item.category === seasoningCategory) return false;
    return !pantrySet.has(normalize(item.name));
  });
}

function getPantryItems() {
  return splitWords(pantryInput.value);
}

function splitWords(value) {
  return String(value || "")
    .split(/[、,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function guessCategory(name) {
  const normalizedName = normalize(name);
  if (["しょうが", "生姜", "ショウガ", "にんにく", "ニンニク", "大蒜"].some((item) => normalize(item) === normalizedName)) {
    return "野菜";
  }
  const found = getAllIngredients().find((item) => {
    return normalize(item.name) === normalizedName || item.aliases.some((alias) => normalize(alias) === normalizedName);
  });
  return found?.category || "その他";
}

function sortCategories(categoryNames) {
  return categoryNames.sort((a, b) => {
    const aIndex = shoppingCategoryOrder.includes(a) ? shoppingCategoryOrder.indexOf(a) : 99;
    const bIndex = shoppingCategoryOrder.includes(b) ? shoppingCategoryOrder.indexOf(b) : 99;
    return aIndex - bIndex || a.localeCompare(b, "ja");
  });
}

function formatAmounts(amounts) {
  return amounts.filter(Boolean).join(" + ");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
