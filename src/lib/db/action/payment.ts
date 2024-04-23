import type {
  CreateClosedTransactionProps,
  CreateClosedTransactionReturnProps,
  FeeCalculatorReturnProps,
  InstructionReturnProps,
  OpenTransactionsReturnProps,
  PaymentChannelReturnProps,
  TransactionsReturnProps,
} from "tripay-sdk"

import { tripay } from "@/lib/tripay"
import { uniqueCharacter } from "@/lib/utils/id"
import type {
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

export const getPaymentTripayPaymentChannel = async () => {
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

    await upsertSetting({
      key: "tripay_payment_channel",
      value: JSON.stringify({ eWallet, virtualAccount, convenienceShop }),
    })
  }

  const data = await getSettingByKey("tripay_payment_channel")

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
  input: CreateClosedTransactionProps,
) => {
  const generatedMerchatRef = `trx_closed_${uniqueCharacter()}`

  const res = (await tripay.createClosedTransaction({
    method: input.paymentMethod,
    merchant_ref: generatedMerchatRef,
    amount: input.amount,
    customer_name: input.customer_name,
    customer_email: input.customer_email,
    customer_phone: input.customer_phone,
    order_items: input.order_items,
    callback_url: input.callback_url,
    return_url: input.return_url,
    expired_time: input.expired_time,
  })) as CreateClosedTransactionReturnProps

  const { data } = res

  return data
}
