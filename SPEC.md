# アプリケーション仕様メモ

## 概要

食材から作れるレシピを探し、足りない材料を買い物リストに追加する静的Webアプリです。サーバー処理やビルド工程はなく、`index.html`、`style.css`、`app.js`、`recipes.json` だけで動作します。

## 画面構成

- 食材選択: カテゴリタブ、食材検索、食材ボタン、家にある食材・調味料の入力欄
- レシピ候補: 選択食材とタグで絞り込み、足りない材料数が少ない順に表示
- 買い物リスト: レシピから不足食材を自動追加し、手入力項目も追加可能
- レシピ登録: フォームからローカルストレージ上のレシピ一覧へ追加

## データ保存

- 初期レシピは `recipes.json` から読み込みます。
- ユーザーが追加したレシピ、在庫、買い物リスト、選択済みレシピは `localStorage` に保存します。
- `recipes.json` の `version` が変わると、ローカルのレシピを初期データで更新し、買い物リストもリセットします。
- `SHOPPING_DATA_VERSION` が変わると、買い物リスト関連データをリセットします。

## レシピデータ形式

`recipes.json` の各レシピは次の構造です。

- `id`: レシピID
- `name`: レシピ名
- `mainIngredients`: メイン食材名の配列
- `ingredients`: 材料配列。各要素は `name`、`amount`、`category`
- `tags`: 絞り込み用タグ配列
- `time`: 調理時間の分数
- `servings`: 人数
- `book`: 参照元
- `page`: 参照ページ
- `memo`: 補足

## 判定ロジック

- 食材検索は材料名・別名に部分一致します。
- レシピ候補は、選択食材が `ingredients` または `mainIngredients` に含まれるものです。
- 家にある食材・調味料と完全一致した材料は不足扱いにしません。
- カテゴリが `調味料` の材料は、買い物リストの不足材料から除外します。
- レシピ候補は不足材料数の少ない順、同数なら調理時間の短い順に並びます。
- 買い物リストはカテゴリごとに表示し、同じカテゴリ・同じ食材は数量をまとめます。

## 仕様変更時の主な変更箇所

- 初期レシピを増やす: `recipes.json`
- 初期食材や別名を増やす: `app.js` の `defaultIngredients`
- カテゴリを増やす・並び順を変える: `app.js` の `categories` と `shoppingCategoryOrder`
- 在庫の初期値を変える: `app.js` の `defaultPantry`
- 不足判定を変える: `app.js` の `getMissingIngredients`
- レシピ検索条件を変える: `app.js` の `recipeMatchesIngredient` と `renderRecipes`
- 買い物リストの統合ルールを変える: `app.js` の `addRecipeToShoppingList` と `addManualShoppingItem`
- 画面項目を追加する: `index.html`、描画処理は `app.js`、見た目は `style.css`

## 注意点

- 文字列の一致判定は現在、正規化後の完全一致または部分一致が中心です。表記ゆれを強く吸収したい場合は、別名辞書を増やすか、正規化関数を拡張します。
- `recipes.json` の `version` を変更するとユーザーのローカルレシピが初期データで上書きされます。
- 手入力で追加したレシピは `recipes.json` には保存されず、ブラウザごとの `localStorage` にだけ残ります。
- 静的サイトなので、複数端末でデータを同期する仕様はありません。
