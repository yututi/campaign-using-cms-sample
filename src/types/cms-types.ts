type Reference<T, R> = T extends 'get' ? R : string | null;
interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
  ? GetsType<{ id: string } & DateType & Required<P>>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type campaign<T='get'> = Structure<
T,
{
  /**
   * タイトル
   */
  title?: string
  /**
   * 目次
   */
  toc?: boolean
  /**
   * 本文
   */
  body?: (campaign_product | campaign_productListPickup | campaign_text | campaign_productPickup)[]
  /**
   * 投稿日時
   */
  published?: string
  /**
   * 非表示
   */
  hidden?: boolean
}>

interface campaign_toc {
  fieldId: 'toc'
  /**
   * 使う
   */
  use?: boolean
}
interface campaign_product {
  fieldId: 'product'
  /**
   * 商品ID
   */
  productId: string
}
interface campaign_productListPickup {
  fieldId: 'productListPickup'
  /**
   * 見出し
   */
  heading: string
  /**
   * 説明
   */
  description?: string
  /**
   * リスト
   */
  list: campaign_product[]
}
interface campaign_text {
  fieldId: 'text'
  /**
   * テキスト
   */
  text?: string
}
interface campaign_productPickup {
  fieldId: 'productPickup'
  /**
   * 見出し
   */
  title: string
  /**
   * 説明
   */
  description?: string
  /**
   * 商品ID
   */
  productId: string
}

export interface EndPoints {
  get: {
    'campaign': campaign<'get'>
  }
  gets: {
    'campaign': campaign<'gets'>
  }
  post: {
    'campaign': campaign<'post'>
  }
  put: {
    'campaign': campaign<'put'>
  }
  patch: {
    'campaign': campaign<'patch'>
  }
}
