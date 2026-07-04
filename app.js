const defaultRecipes = [
  {
    id: "recipe_001",
    name: "鶏むね肉の照り焼き",
    mainIngredients: ["鶏むね肉"],
    ingredients: [
      { name: "鶏むね肉", amount: "300g", category: "肉" },
      { name: "片栗粉", amount: "大さじ1", category: "調味料" },
      { name: "醤油", amount: "大さじ2", category: "調味料" },
      { name: "みりん", amount: "大さじ2", category: "調味料" },
    ],
    tags: ["肉", "時短", "安い", "和食"],
    time: 15,
    servings: "2人前",
    book: "いつものレシピ本",
    page: 42,
    memo: "弁当向き",
  },
  {
    id: "recipe_002",
    name: "鶏むね南蛮",
    mainIngredients: ["鶏むね肉"],
    ingredients: [
      { name: "鶏むね肉", amount: "300g", category: "肉" },
      { name: "卵", amount: "2個", category: "卵・豆腐" },
      { name: "玉ねぎ", amount: "1/4個", category: "野菜" },
      { name: "レタス", amount: "適量", category: "野菜" },
      { name: "マヨネーズ", amount: "大さじ3", category: "調味料" },
      { name: "酢", amount: "大さじ2", category: "調味料" },
      { name: "砂糖", amount: "大さじ1", category: "調味料" },
    ],
    tags: ["肉", "作り置き", "和食"],
    time: 25,
    servings: "2人前",
    book: "平日おかず帳",
    page: 18,
    memo: "少し手間",
  },
  {
    id: "recipe_003",
    name: "鮭のちゃんちゃん焼き",
    mainIngredients: ["鮭"],
    ingredients: [
      { name: "鮭", amount: "2切れ", category: "魚" },
      { name: "キャベツ", amount: "1/6玉", category: "野菜" },
      { name: "玉ねぎ", amount: "1/2個", category: "野菜" },
      { name: "しめじ", amount: "1/2株", category: "野菜" },
      { name: "味噌", amount: "大さじ2", category: "調味料" },
      { name: "バター", amount: "10g", category: "その他" },
    ],
    tags: ["魚", "野菜多め", "和食"],
    time: 20,
    servings: "2人前",
    book: "魚のおかず",
    page: 55,
    memo: "フライパンで可",
  },
  {
    id: "recipe_004",
    name: "豚こま生姜焼き",
    mainIngredients: ["豚こま肉"],
    ingredients: [
      { name: "豚こま肉", amount: "250g", category: "肉" },
      { name: "玉ねぎ", amount: "1/2個", category: "野菜" },
      { name: "キャベツ", amount: "適量", category: "野菜" },
      { name: "醤油", amount: "大さじ2", category: "調味料" },
      { name: "みりん", amount: "大さじ2", category: "調味料" },
      { name: "酒", amount: "大さじ1", category: "調味料" },
      { name: "生姜", amount: "1かけ", category: "調味料" },
    ],
    tags: ["肉", "時短", "安い", "和食"],
    time: 15,
    servings: "2人前",
    book: "定番おかず",
    page: 11,
    memo: "冷凍可",
  },
  {
    id: "recipe_005",
    name: "なすとひき肉の味噌炒め",
    mainIngredients: ["なす", "ひき肉"],
    ingredients: [
      { name: "なす", amount: "3本", category: "野菜" },
      { name: "ひき肉", amount: "200g", category: "肉" },
      { name: "長ねぎ", amount: "1/2本", category: "野菜" },
      { name: "味噌", amount: "大さじ2", category: "調味料" },
      { name: "酒", amount: "大さじ1", category: "調味料" },
      { name: "砂糖", amount: "小さじ2", category: "調味料" },
    ],
    tags: ["肉", "中華", "作り置き"],
    time: 20,
    servings: "2人前",
    book: "野菜おかず",
    page: 27,
    memo: "ご飯に合う",
  },
  {
    id: "recipe_006",
    name: "ぶりの照り焼き",
    mainIngredients: ["ぶり"],
    ingredients: [
      { name: "ぶり", amount: "2切れ", category: "魚" },
      { name: "醤油", amount: "大さじ2", category: "調味料" },
      { name: "みりん", amount: "大さじ2", category: "調味料" },
      { name: "酒", amount: "大さじ2", category: "調味料" },
      { name: "砂糖", amount: "小さじ2", category: "調味料" },
    ],
    tags: ["魚", "時短", "和食"],
    time: 15,
    servings: "2人前",
    book: "魚のおかず",
    page: 22,
    memo: "調味料だけで作れる",
  },
];

const defaultIngredients = [
  { name: "豚こま肉", category: "肉", aliases: ["豚こま"] },
  { name: "鶏むね肉", category: "肉", aliases: ["とりむね", "鶏胸肉"] },
  { name: "ひき肉", category: "肉", aliases: ["ミンチ"] },
  { name: "鮭", category: "魚", aliases: ["さけ", "サーモン"] },
  { name: "ぶり", category: "魚", aliases: ["ブリ"] },
  { name: "キャベツ", category: "野菜", aliases: [] },
  { name: "なす", category: "野菜", aliases: ["茄子"] },
  { name: "玉ねぎ", category: "野菜", aliases: ["玉葱"] },
  { name: "長ねぎ", category: "野菜", aliases: ["ねぎ"] },
  { name: "卵", category: "卵・豆腐", aliases: ["たまご"] },
  { name: "豆腐", category: "卵・豆腐", aliases: [] },
];

const defaultPantry = ["醤油", "みりん", "酒", "砂糖", "塩", "片栗粉", "酢", "味噌"];
const categories = ["肉", "魚", "野菜", "卵・豆腐"];
const shoppingCategoryOrder = ["肉", "魚", "野菜", "卵・豆腐", "その他"];
const seasoningCategory = "調味料";

let recipes = loadJson("recipes", defaultRecipes);
let selectedCategory = "";
let selectedIngredient = "";
let selectedRecipeId = "";

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
  renderShoppingList();
});

tagFilter.addEventListener("change", renderRecipes);

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
      ...seasonings.map((name) => ({ name, amount: "", category: seasoningCategory })),
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
      renderIngredients();
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
      <button class="primary-button" type="button">このレシピで買い物リスト</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedRecipeId = recipe.id;
      renderRecipes();
      renderShoppingList();
    });
    recipeList.appendChild(card);
  });
}

function renderShoppingList() {
  const recipe = recipes.find((item) => item.id === selectedRecipeId);
  shoppingList.innerHTML = "";
  shoppingEmpty.style.display = recipe ? "none" : "block";
  if (!recipe) return;

  const items = getMissingIngredients(recipe, getPantryItems());
  if (!items.length) {
    shoppingList.innerHTML = '<div class="empty-state">追加で買うものはありません。</div>';
    return;
  }

  const grouped = items.reduce((result, item) => {
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
      row.className = "shopping-item";
      row.innerHTML = `
        <input type="checkbox" />
        <span>${escapeHtml(item.name)}</span>
        <span class="amount">${escapeHtml(item.amount || "必要量")}</span>
      `;
      row.querySelector("input").addEventListener("change", (event) => {
        row.classList.toggle("checked", event.target.checked);
      });
      group.appendChild(row);
    });
    shoppingList.appendChild(group);
  });
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
  return recipe.ingredients.some((item) => normalize(item.name).includes(normalizedQuery)) ||
    recipe.mainIngredients.some((item) => normalize(item).includes(normalizedQuery));
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
  const found = getAllIngredients().find((item) => normalize(item.name) === normalize(name));
  return found?.category || "その他";
}

function sortCategories(categoryNames) {
  return categoryNames.sort((a, b) => {
    const aIndex = shoppingCategoryOrder.includes(a) ? shoppingCategoryOrder.indexOf(a) : 99;
    const bIndex = shoppingCategoryOrder.includes(b) ? shoppingCategoryOrder.indexOf(b) : 99;
    return aIndex - bIndex || a.localeCompare(b, "ja");
  });
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

render();
