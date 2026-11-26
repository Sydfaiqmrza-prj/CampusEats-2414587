import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  writeBatch,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// Creates one order document per vendor in the cart using a single batch
export async function placeOrders(user, cart, details) {
  const byVendor = new Map()
  for (const line of cart) {
    const vendorId = line.item.vendorId ?? 'unknown'
    const lines = byVendor.get(vendorId) ?? []
    byVendor.set(vendorId, [...lines, line])
  }

  const batch = writeBatch(db)
  for (const [vendorId, lines] of byVendor) {
    const ref = doc(collection(db, 'orders'))
    batch.set(ref, {
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].item.vendorName ?? 'CampusEats Vendor',
      items: lines.map(({ item, qty, note = '' }) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty,
        note: note.trim(),
      })),
      total: lines.reduce((sum, { item, qty }) => sum + item.price * qty, 0),
      status: 'Received',
      createdAt: serverTimestamp(),
    })
  }
  await batch.commit()
}

// Live listener for the signed-in student's orders (newest first)
export function subscribeToMyOrders(uid, onData, onError) {
  const q = query(collection(db, 'orders'), where('studentUid', '==', uid))
  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      orders.sort(
        (a, b) =>
          (b.createdAt?.toMillis?.() ?? Date.now()) -
          (a.createdAt?.toMillis?.() ?? Date.now()),
      )
      onData(orders)
    },
    onError,
  )
}

// Update pickup time while status is Received
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(doc(db, 'orders', orderId), { pickupTime })
}

// Delete order document while status is Received
export function cancelOrder(orderId) {
  return deleteDoc(doc(db, 'orders', orderId))
}