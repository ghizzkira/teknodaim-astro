import type {
  CreateClosedTransactionReturnProps,
  CreateOpenTransactionReturnProps,
  FeeCalculatorReturnProps,
  InstructionReturnProps,
  OpenTransactionsReturnProps,
  PaymentChannelReturnProps,
  TransactionsReturnProps,
} from "tripay-sdk"

import { tripay } from "@/lib/tripay"
import { uniqueCharacter } from "@/lib/utils/id"
import type {
  PaymentTripayCreateClosedTransaction,
  PaymentTripayCreateOpenTransaction,
  PaymentTripayFeeCalculator,
  PaymentTripayPaymentInstruction,
} from "@/lib/validation/payment"
import { getSettingByKey, upsertSetting } from "./setting"

export const getPaymentTripayInstruction = async (
  input: PaymentTripayPaymentInstruction,
) => {
  const res = (await tripay.instruction({
    code: input.code,
    amount: input.amount,
    allow_html: input.allowHtml,
  })) as InstructionReturnProps

  const { data } = res

  return data
}

export const getPaymentTripayPaymentChannel = async (DB: D1Database) => {
  const paymentChannel =
    (await tripay.paymentChannel()) as PaymentChannelReturnProps

  if (Array.isArray(paymentChannel)) {
    const eWallet = paymentChannel?.data.filter((data) =>
      data.group.includes("E-Wallet"),
    )

    const virtualAccount = paymentChannel?.data.filter((data) =>
      data.group.includes("Virtual Account"),
    )

    const convenienceShop = paymentChannel?.data.filter((data) =>
      data.group.includes("Convenience Store"),
    )

    await upsertSetting(DB, {
      key: "tripay_payment_channel",
      value: JSON.stringify({ eWallet, virtualAccount, convenienceShop }),
    })
  }

  const data = await getSettingByKey(DB, "tripay_payment_channel")

  let parsedData

  if (data?.value && typeof data?.value === "string") {
    parsedData = JSON.parse(data?.value)
  } else {
    parsedData = data?.value
  }

  return parsedData
}

export const getPaymentTripayFeeCalculator = async (
  input: PaymentTripayFeeCalculator,
) => {
  const res = (await tripay.feeCalculator({
    code: input.code,
    amount: input.amount,
  })) as FeeCalculatorReturnProps

  const { data } = res

  return data[0]
}

export const getPaymentTripayClosedTransactionList = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const res = (await tripay.transactions({
    page: page,
    per_page: perPage,
  })) as TransactionsReturnProps

  const { data } = res

  return data
}

export const getPaymentTripayOpenTransactionList = async (uuid: string) => {
  const res = (await tripay.openTransactions({
    uuid: uuid,
  })) as OpenTransactionsReturnProps

  const { data } = res

  return data
}

export const createPaymentTripayClosedTransaction = async (
  input: PaymentTripayCreateClosedTransaction,
) => {
  const generatedMerchatRef = `trx_closed_${uniqueCharacter()}`

  const res = (await tripay.createClosedTransaction({
    method: input.paymentMethod,
    merchant_ref: generatedMerchatRef,
    amount: input.amount,
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    customer_phone: input.customerPhone,
    //@ts-expect-error FIX: later
    order_items: input.orderItems,
    callback_url: input.callbackUrl,
    return_url: input.returnUrl,
    expired_time: input.expiredTime,
  })) as CreateClosedTransactionReturnProps

  const { data } = res

  return data
}

export const createPaymentTripayOpenTransaction = async (
  input: PaymentTripayCreateOpenTransaction,
) => {
  const generatedMerchatRef = `trx_open_${uniqueCharacter()}`

  const res = (await tripay.createOpenTransaction({
    method: input.paymentMethod,
    merchant_ref: generatedMerchatRef,
    customer_name: input.customerName,
  })) as CreateOpenTransactionReturnProps

  const { data } = res

  return data
}

export const getPaymentTripayClosedTransactionDetail = async (
  reference: string,
) => {
  const res = (await tripay.closedTransactionDetail({
    reference: reference,
  })) as CreateClosedTransactionReturnProps

  const { data } = res

  return data
}

export const getPaymentTripayOpenTransactionDetail = async (uuid: string) => {
  const res = (await tripay.openTransactionDetail({
    uuid: uuid,
  })) as CreateOpenTransactionReturnProps

  const { data } = res

  return data
}
