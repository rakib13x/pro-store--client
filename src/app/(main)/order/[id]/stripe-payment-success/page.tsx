import SuccessPageClient from "./SuccesPageClient";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent?: string }>;
}) {
  const { id } = await params;
  const { payment_intent } = await searchParams;

  return (
    <SuccessPageClient orderId={id} paymentIntent={payment_intent || ""} />
  );
}
