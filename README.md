# micro cmsで管理するデータをISRするサンプル

- micro cmsでアカウントを作成
- APIを作成
    - API名は任意
    - エンドポイントはcampaign
    - リスト形式
    - APIスキーマの定義でこのプロジェクトにある`schema/api-*.json`ファイルをインポート
- .env.sampleを.envにリネームし、サービスIDとAPI Keyを設定
- 適当なコンテンツを作成
- `npm run dev`
    - devだとSSRになるのでISRの挙動を確認したい場合は`npm run build`してから`npm run start`

## TODO

- `microcms-js-sdk`を使うように変更する
- コンテンツ更新時のrevalidate検証
