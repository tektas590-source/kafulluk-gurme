import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, writeBatch, increment } from 'firebase/firestore'
import { db } from '../firebase'

export const productsCol = collection(db, 'products')
export const ordersCol = collection(db, 'orders')

export async function fetchProducts() {
  const snap = await getDocs(productsCol)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function fetchOrders() {
  const q = query(ordersCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createOrder(order) {
  const ref = await addDoc(ordersCol, { ...order, status: 'Hazırlanıyor', createdAt: new Date().toISOString() })
  // decrement stock
  const batch = writeBatch(db)
  order.items.forEach(item => {
    const pRef = doc(db, 'products', item.id)
    batch.update(pRef, { stock: increment(-item.qty) })
  })
  await batch.commit()
  return ref.id
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, 'orders', orderId), { status })
}

export async function updateProduct(productId, data) {
  await updateDoc(doc(db, 'products', productId), data)
}

export async function addProduct(product) {
  const ref = await addDoc(productsCol, product)
  return ref.id
}
