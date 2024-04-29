import type {
  CekSaldoReturnProps,
  DaftarHargaPostPaidReturnProps,
  DaftarHargaPrePaidReturnProps,
  DepositReturnProps,
  TransaksiReturnProps,
} from "digiflazz-sdk"

import { digiflazz } from "@/lib/digiflazz"
import { addPricesProperties } from "@/lib/shop"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateTopUpDigiflazzDeposit,
  CreateTopUpDigiflazzTransaction,
  TopUpDigiflazzPriceListType,
} from "@/lib/validation/top-up"
import { getSettingByKey, upsertSetting } from "./setting"

type DaftarHargaPostPaidDataReturnProps =
  DaftarHargaPostPaidReturnProps["data"][number]

type DaftarHargaPrePaidDataReturnProps =
  DaftarHargaPrePaidReturnProps["data"][number]

export interface DigiflazzPriceListPrePaidResponse
  extends DaftarHargaPrePaidDataReturnProps {
  brand: string
  slug: string
  thumbnail: string
  cover: string
  thumbnail_image?: string
  cover_image?: string
  info_id_image?: string
  icon_image?: string
}

export interface DigiflazzPriceListPostPaidResponse
  extends DaftarHargaPostPaidDataReturnProps {
  brand: string
  slug: string
  thumbnail: string
  cover: string
  thumbnail_image?: string
  cover_image?: string
  info_id_image?: string
  icon_image?: string
}

export const getDigiflazzCheckBalance = async () => {
  const res = (await digiflazz.cekSaldo()) as CekSaldoReturnProps
  const { data } = res
  return data.deposit
}

export const getDigiflazzPriceList = async (
  input: TopUpDigiflazzPriceListType,
) => {
  const digiflazzPriceList = (await digiflazz.daftarHarga(input)) as
    | DaftarHargaPrePaidReturnProps
    | DaftarHargaPostPaidReturnProps

  if (Array.isArray(digiflazzPriceList.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_${input}`,
      value: JSON.stringify(digiflazzPriceList.data),
    })
  }

  const priceList = await getSettingByKey(
    `digiflazz_top_up_price_list_${input}`,
  )

  let data

  if (priceList?.value && typeof priceList?.value === "string") {
    data = JSON.parse(priceList?.value)
  } else {
    data = priceList?.value
  }

  return data
}

export const getDigiflazzProductsByBrand = async (brand: string) => {
  const digiflazzPriceListPrePaid = (await digiflazz.daftarHarga(
    "prepaid",
  )) as DaftarHargaPrePaidReturnProps
  const digiflazzPriceListPostPaid = (await digiflazz.daftarHarga(
    "pasca",
  )) as DaftarHargaPostPaidReturnProps

  if (Array.isArray(digiflazzPriceListPrePaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_prepaid`,
      value: JSON.stringify(digiflazzPriceListPrePaid.data),
    })
  }

  if (Array.isArray(digiflazzPriceListPostPaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_pasca`,
      value: JSON.stringify(digiflazzPriceListPostPaid.data),
    })
  }

  const priceListPrePaid = await getSettingByKey(
    "digiflazz_top_up_price_list_prepaid",
  )

  const priceListPostPaid = await getSettingByKey(
    "digiflazz_top_up_price_list_pasca",
  )

  let prePaidData
  let postPaidData

  if (priceListPrePaid?.value && typeof priceListPrePaid?.value === "string") {
    prePaidData = JSON.parse(priceListPrePaid?.value)
  } else {
    prePaidData = priceListPrePaid?.value
  }

  if (
    priceListPostPaid?.value &&
    typeof priceListPostPaid?.value === "string"
  ) {
    postPaidData = JSON.parse(priceListPostPaid?.value)
  } else {
    postPaidData = priceListPostPaid?.value
  }

  const allPrices = [
    ...prePaidData,
    ...postPaidData,
  ] as unknown as (DigiflazzPriceListPostPaidResponse &
    DigiflazzPriceListPrePaidResponse)[]

  const filteredProduct = allPrices?.filter(
    (product) => product?.brand === brand,
  )

  return filteredProduct ?? null
}

export const getDigiflazzPriceListBySlug = async (slug: string) => {
  const digiflazzPriceListPrePaid = (await digiflazz.daftarHarga(
    "prepaid",
  )) as DaftarHargaPrePaidReturnProps
  const digiflazzPriceListPostPaid = (await digiflazz.daftarHarga(
    "pasca",
  )) as DaftarHargaPostPaidReturnProps

  if (Array.isArray(digiflazzPriceListPrePaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_prepaid`,
      value: JSON.stringify(digiflazzPriceListPrePaid.data),
    })
  }

  if (Array.isArray(digiflazzPriceListPostPaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_pasca`,
      value: JSON.stringify(digiflazzPriceListPostPaid.data),
    })
  }

  const priceListPrePaid = await getSettingByKey(
    "digiflazz_top_up_price_list_prepaid",
  )

  const priceListPostPaid = await getSettingByKey(
    "digiflazz_top_up_price_list_pasca",
  )

  let prePaidData
  let postPaidData

  if (priceListPrePaid?.value && typeof priceListPrePaid?.value === "string") {
    prePaidData = JSON.parse(priceListPrePaid?.value)
  } else {
    prePaidData = priceListPrePaid?.value
  }
  if (
    priceListPostPaid?.value &&
    typeof priceListPostPaid?.value === "string"
  ) {
    postPaidData = JSON.parse(priceListPostPaid?.value)
  } else {
    postPaidData = priceListPostPaid?.value
  }
  const allPrices = [
    ...prePaidData,
    ...postPaidData,
  ] as unknown as (DigiflazzPriceListPostPaidResponse &
    DigiflazzPriceListPrePaidResponse)[]

  const priceBySlugDatas = allPrices.find((price) => {
    const brand = typeof price.brand === "string" && slugify(price.brand)
    return typeof brand === "string" && brand.includes(slug)
  })

  return priceBySlugDatas ?? null
}

export const getDigiflazzBrands = async () => {
  const digiflazzPriceListPrePaid = (await digiflazz.daftarHarga(
    "prepaid",
  )) as DaftarHargaPrePaidReturnProps
  const digiflazzPriceListPostPaid = (await digiflazz.daftarHarga(
    "pasca",
  )) as DaftarHargaPostPaidReturnProps

  if (Array.isArray(digiflazzPriceListPrePaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_prepaid`,
      value: JSON.stringify(digiflazzPriceListPrePaid.data),
    })
  }

  if (Array.isArray(digiflazzPriceListPostPaid.data)) {
    await upsertSetting({
      key: `digiflazz_top_up_price_list_pasca`,
      value: JSON.stringify(digiflazzPriceListPostPaid.data),
    })
  }

  const priceListPrePaid = await getSettingByKey(
    "digiflazz_top_up_price_list_prepaid",
  )

  const priceListPostPaid = await getSettingByKey(
    "digiflazz_top_up_price_list_pasca",
  )

  let prePaidData
  let postPaidData

  if (priceListPrePaid?.value && typeof priceListPrePaid?.value === "string") {
    prePaidData = JSON.parse(priceListPrePaid?.value)
  } else {
    prePaidData = priceListPrePaid?.value
  }

  if (
    priceListPostPaid?.value &&
    typeof priceListPostPaid?.value === "string"
  ) {
    postPaidData = JSON.parse(priceListPostPaid?.value)
  } else {
    postPaidData = priceListPostPaid?.value
  }

  const allPrices = [...prePaidData, ...postPaidData]

  const brandPrices = Array.from(
    new Set(
      allPrices?.map(
        (
          item:
            | DigiflazzPriceListPrePaidResponse
            | DigiflazzPriceListPostPaidResponse,
        ) => item.brand,
      ),
    ),
  ).map((brand) => {
    return allPrices?.filter(
      (
        item:
          | DigiflazzPriceListPrePaidResponse
          | DigiflazzPriceListPostPaidResponse,
      ) => item.brand === brand,
    )[0]
  })

  return brandPrices ?? null
}

export const getDigiflazzTopUpProductsByBrand = async (brand: string) => {
  const products = await getSettingByKey("digiflazz_top_up_products")

  if (!products?.value || typeof products?.value !== "string") {
    return null
  }

  const allPrices = JSON.parse(products?.value!)

  const getPricesbyBrand = Array.from(
    new Set(
      allPrices?.map(
        (
          item:
            | DigiflazzPriceListPrePaidResponse
            | DigiflazzPriceListPostPaidResponse,
        ) => item.brand,
      ),
    ),
  ).map((brand) => {
    return allPrices?.filter(
      (
        item:
          | DigiflazzPriceListPrePaidResponse
          | DigiflazzPriceListPostPaidResponse,
      ) => item.brand === brand,
    )[0]
  })

  const filteredPrices = getPricesbyBrand.map(addPricesProperties)

  const getDataBySlug = filteredPrices.find(
    (price) => price.slug.toLocaleLowerCase() === brand,
  )

  return getDataBySlug
}

export const createDigiflazzDeposit = async (
  input: CreateTopUpDigiflazzDeposit,
) => {
  const res = (await digiflazz.deposit({
    amount: input.amount,
    bank: input.bank,
    name: input.name,
  })) as DepositReturnProps
  const { data } = res
  return data
}

export const createDigiflazzTopUpTransaction = async (
  input: CreateTopUpDigiflazzTransaction,
) => {
  const res = (await digiflazz.transaksi({
    sku: input.sku,
    customerNo: input.customerNo,
    refId: input.refId,
    cmd: input.cmd,
    testing: input.testing,
    msg: input.message,
  })) as TransaksiReturnProps
  const { data } = res
  return data
}
