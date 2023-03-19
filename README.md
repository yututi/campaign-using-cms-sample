# micro cmsで管理するデータをISRするサンプル

## 環境構築
- micro cmsでアカウントを作成
- APIを作成
    - API名は任意
    - エンドポイントはcampaign
    - リスト形式
    - APIスキーマの定義でこのプロジェクトにある`schema/api-campaign-*.json`ファイルをインポート
- API設定 > 画面プレビューで遷移先URLに以下を設定
    ```
    http://localhost:3000/api/preview?campaignId={CONTENT_ID}&draftKey={DRAFT_KEY}
    ```
- .env.sampleを.envにリネームし、サービスIDとAPI Keyを設定
- 適当なコンテンツを作成
- `npm run dev`
    - devだとSSRになるのでISRの挙動を確認したい場合は`npm run build`してから`npm run start`

## 機能

- CMSのコンテンツをそれっぽい感じで表示
- CMSで画面プレビューを選択すると、下書き内容を表示
- 生成したコンテンツのrevalidate

## TODO

- `microcms-js-sdk`を使うように変更する
