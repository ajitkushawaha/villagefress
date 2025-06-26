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
  // Remove any non-digit characters from the phone number
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
}