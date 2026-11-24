"use client";

import { useState } from "react";
import { CircleCheck, Clock3, CreditCard } from "lucide-react";
import { Badge, DataTable, DetailRows, Dialog, Metric, PageHeading, displayDate, money } from "./AdminUI";
import { orders, type Order } from "./ManagementData";
import styles from "./admin.module.css";

const tones = { Successful: "green", Pending: "orange", Failed: "red", Refunded: "purple" } as const;

export function OrdersPayments() {
  const [order, setOrder] = useState<Order | null>(null);
  return (
    <>
      <PageHeading title="Orders & Payments" description="Track transactions from checkout to confirmation." />
      <div className={styles.metrics}>
        <Metric label="Total Orders" value={orders.length} detail="Orders in this preview" icon={CreditCard} />
        <Metric label="Successful Payments" value={orders.filter(({ status }) => status === "Successful").length} detail="Completed payments" icon={CircleCheck} tone="green" />
        <Metric label="Pending Payments" value={orders.filter(({ status }) => status === "Pending").length} detail="Awaiting confirmation" icon={Clock3} tone="orange" />
      </div>
      <DataTable caption="Orders and payments" headings={["Ref", "Customer", "Product", "Type", "Amount", "Discount", "Payable", "Status", "Date"]}>
        {orders.map((item) => <tr key={item.id}>
          <td><button type="button" className={styles.tableLink} onClick={() => setOrder(item)}>{item.id}</button></td>
          <td>{item.customer}</td><td>{item.product}</td><td>{item.type}</td><td>{money(item.amount)}</td>
          <td>{item.discount ? `−${money(item.discount)}` : money(0)}</td><td>{money(item.amount - item.discount)}</td>
          <td><Badge tone={tones[item.status]}>{item.status}</Badge></td><td>{displayDate(item.date)}</td>
        </tr>)}
      </DataTable>
      {order && <Dialog title="Order details" description={order.id} drawer onClose={() => setOrder(null)}>
        <div className={styles.dialogBody}>
          <div><Badge tone={tones[order.status]}>{order.status}</Badge></div>
          <DetailRows items={[["Customer", order.customer], ["Order date", displayDate(order.date)], ["Product", order.product],
            ["Type", order.type], ["Amount", money(order.amount)], ["Discount", money(order.discount)],
            ["Payable", money(order.amount - order.discount)]]} />
        </div>
      </Dialog>}
    </>
  );
}
