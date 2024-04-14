export interface ErrorResponse {
  message: string
}

export interface DigiflazzCreateTransactionPrepaidResponse {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number
}

export interface DigiflazzCreateTransactionPostpaidResponse {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number
  customer_name: string
  admin: number
  selling_price: number
  desc: {
    tarif: string
    daya: number
    lembar_tagihan: number
    detail: {
      periode: string
      nilai_tagihan: string
      admin: string
      denda: string
      meter_awal: string
      meter_akhir: string
    }[]
  }
}

export interface DigiflazzPriceListPrePaidResponse {
  slug: string
  thumbnail: string
  cover: string
  product_name: string
  category: string
  brand: string
  type: string
  seller_name: string
  price: number
  buyer_sku_code: string
  buyer_product_status: boolean
  seller_product_status: boolean
  unlimited_stock: boolean
  stock: number
  multi: boolean
  start_cut_off: string
  end_cut_off: string
  desc: string
  thumbnail_image?: string
  cover_image?: string
  info_id_image?: string
  icon_image?: string
}

export interface DigiflazzPriceListPostPaidResponse {
  slug: string
  thumbnail: string
  cover: string
  product_name: string
  category: string
  brand: string
  seller_name: string
  admin: number
  commission: number
  buyer_sku_code: string
  buyer_product_status: true
  seller_product_status: true
  desc: string
  thumbnail_image?: string
  cover_image?: string
  info_id_image?: string
  icon_image?: string
}

export interface DigiflazzPrePaidResponse {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number
}

export interface DigiflazzPostPaidResponse {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number
  customer_name: string
  admin: number
  selling_price: number
  desc: {
    tarif: string
    daya: number
    lembar_tagihan: number
    detail: {
      periode: string
      nilai_tagihan: string
      admin: string
      denda: string
      meter_awal: string
      meter_akhir: string
    }[]
  }
}

export interface BannerProps {
  index: number
  url: string
  active: boolean
}

export interface TopupProductProps {
  sku: string
  server: string
  note: string
  product_name: string
  brands: string
  amount: number
  merchant_ref: string
  invoice_id: string
  account_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  voucher_code: string
  discount_amount: number
  fee_amount: number
  total_amount: number

  top_up_provider: string
  payment_method: string
  payment_provider: string
  status: string
  payment_status: string
}

export interface TripayPaymentMethodsProps {
  fee_merchant: { flat: number | null; percent: number | null }
  name: string
  fee_customer: { flat: number | null; percent: number | null }
  group: string
  description: string
  icon_url: string
  code: string
  totalFee?: number
}

export interface TransactionDataTripayProps {
  fee_amount: number
  account_id: string
  invoice_id: string
  sku: string
  reference: string
  merchant_ref: string | null
  payment_selection_type: string
  payment_method: string
  payment_name: string
  customer_name: string
  customer_email: string
  customer_phone: string
  callback_url: string | null
  return_url: string | null
  amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  pay_code: string | null
  pay_url: string
  checkout_url: string
  order_items: {
    sku: string
    name: string
    price: number
    quantity: number
    subtotal: number
  }[]

  status: string
  note: string | null
  created_at: number
  expired_at: number
  paid_at: number
}
