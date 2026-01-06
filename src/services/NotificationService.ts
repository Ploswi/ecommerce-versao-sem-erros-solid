import { IMailProvider } from '../providers/IMailProvider';
export class NotificationService {
  constructor(private mailProvider: IMailProvider){}
  async notifyOrderCreated(email:string, orderId:string, totalAmount:number, items:string): Promise<string> {
    const previewUrl = await this.mailProvider.sendMail(
      email,
      `Confirmação do Pedido ${orderId}`,
      `Olá, seu pedido #${orderId} no valor de R$ ${totalAmount} foi confirmado.`,
      `<h1>Pedido Confirmado!</h1><p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p><p>Total: <strong>R$ ${totalAmount}</strong></p><ul>${JSON.parse(items).map((p: { name: string }) => `<li>${p.name}</li>`).join('')}</ul>`,
    );
    return previewUrl;
  }
}
