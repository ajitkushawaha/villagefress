import { CartItem, Store } from '../types';

export function generateWhatsAppMessage(cart: CartItem[], store: Store, total: number): string {
  const orderDetails = cart.map(item => 
    `• ${item.product.name} - ${item.quantity} ${item.product.unit} - ₹${item.product.price * item.quantity}`
  ).join('\n');

  const message = `🛒 *New Order from VillageFresh*

📍 *Store:* ${store.name}
👤 *Owner:* ${store.ownerName}
📞 *Contact:* ${store.phone}
📍 *Address:* ${store.address}

📋 *Order Details:*
${orderDetails}

💰 *Total Amount:* ₹${total}

Please confirm this order and let me know the delivery details.

Thank you! 🙏`;

  return encodeURIComponent(message);
}

export function openWhatsApp(whatsappNumber: string, message: string) {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  let url = '';

  if (isMobile) {
    url = `whatsapp://send?phone=${cleanNumber}&text=${message}`;
  } else {
    url = `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${message}`;
  }

  window.open(url, '_blank');
}
