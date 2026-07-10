const nodemailer = require('nodemailer');

// Configuration du service d'email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Envoyer un email de confirmation de commande
 * @param {string} userEmail - Email du client
 * @param {string} userName - Nom du client
 * @param {array} items - Items de la commande
 * @param {number} total - Total de la commande
 * @param {number} orderId - ID de la commande
 */
async function sendOrderConfirmation(userEmail, userName, items, total, orderId) {
  try {
    const itemsHTML = items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right;">${item.price.toLocaleString()} FBu</td>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: bold;">${(item.price * item.quantity).toLocaleString()} FBu</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Confirmation de commande #${orderId} - Bahizi Café & Restaurant`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3C78C8 0%, #2A5BA8 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: white; padding: 20px; border: 1px solid #e0e0e0; }
            .order-info { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .order-info p { margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .total-row { background: #f5f5f5; font-weight: bold; }
            .footer { background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #3C78C8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☕ Bahizi Café & Restaurant</h1>
              <p>Confirmation de votre commande</p>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${userName}</strong>,</p>
              
              <p>Merci pour votre commande ! Nous avons bien reçu votre demande et nous préparons vos articles avec soin.</p>
              
              <div class="order-info">
                <h3 style="margin-top: 0;">Détails de la commande</h3>
                <p><strong>Numéro de commande :</strong> #${orderId}</p>
                <p><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                <p><strong>Heure :</strong> ${new Date().toLocaleTimeString('fr-FR')}</p>
              </div>

              <h3>Articles commandés</h3>
              <table>
                <thead>
                  <tr style="background: #3C78C8; color: white;">
                    <th style="padding: 10px; text-align: left;">Produit</th>
                    <th style="padding: 10px; text-align: center;">Quantité</th>
                    <th style="padding: 10px; text-align: right;">Prix unitaire</th>
                    <th style="padding: 10px; text-align: right;">Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                  <tr class="total-row">
                    <td colspan="3" style="padding: 10px; text-align: right;">TOTAL :</td>
                    <td style="padding: 10px; text-align: right;">${total.toLocaleString()} FBu</td>
                  </tr>
                </tbody>
              </table>

              <p><strong>Statut de la commande :</strong> <span style="color: #16A34A; font-weight: bold;">En préparation</span></p>

              <p>Nous vous notifierons par email dès que votre commande sera prête pour la livraison ou le retrait.</p>

              <div style="text-align: center;">
                <a href="https://bahizi.vercel.app/orders" class="button">Suivre ma commande</a>
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                <strong>Questions ?</strong><br>
                Contactez-nous à <a href="mailto:contact@bahizi.bi">contact@bahizi.bi</a> ou appelez <strong>+257 79 22 22 22</strong>
              </p>
            </div>

            <div class="footer">
              <p>© 2024 Bahizi Café & Restaurant - Bujumbura, Burundi</p>
              <p>Cet email a été envoyé automatiquement. Veuillez ne pas répondre directement.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de confirmation envoyé à ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

/**
 * Envoyer une notification au restaurant
 * @param {string} userName - Nom du client
 * @param {string} userEmail - Email du client
 * @param {array} items - Items de la commande
 * @param {number} total - Total de la commande
 * @param {number} orderId - ID de la commande
 */
async function sendOrderNotificationToRestaurant(userName, userEmail, items, total, orderId) {
  try {
    const itemsHTML = items.map(item => `
      <li>${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FBu</li>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RESTAURANT_EMAIL,
      subject: `🔔 NOUVELLE COMMANDE #${orderId} - Bahizi Café & Restaurant`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
            .order-details { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .items-list { background: white; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; }
            .total { background: #3C78C8; color: white; padding: 15px; border-radius: 6px; text-align: right; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              <h2 style="margin-top: 0;">🔔 NOUVELLE COMMANDE REÇUE</h2>
            </div>

            <div class="order-details">
              <h3>Informations du client</h3>
              <p><strong>Nom :</strong> ${userName}</p>
              <p><strong>Email :</strong> ${userEmail}</p>
              <p><strong>Numéro de commande :</strong> #${orderId}</p>
              <p><strong>Date/Heure :</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>

            <h3>Articles commandés :</h3>
            <div class="items-list">
              <ul style="margin: 0; padding-left: 20px;">
                ${itemsHTML}
              </ul>
            </div>

            <div class="total">
              TOTAL : ${total.toLocaleString()} FBu
            </div>

            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              Cette commande a été passée via le site web. Veuillez la préparer et mettre à jour le statut dans le système.
            </p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification de commande envoyée au restaurant`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification au restaurant:', error);
    return false;
  }
}

/**
 * Envoyer un email de bienvenue
 * @param {string} email - Email du client
 * @param {string} firstName - Prénom du client
 */
async function sendWelcomeEmail(email, firstName) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenue chez Bahizi Café & Restaurant ☕',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3C78C8 0%, #2A5BA8 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
            .content { background: white; padding: 20px; border: 1px solid #e0e0e0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☕ Bienvenue chez Bahizi</h1>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${firstName}</strong>,</p>
              
              <p>Merci de vous être inscrit chez Bahizi Café & Restaurant ! Nous sommes heureux de vous accueillir dans notre communauté.</p>

              <p>Vous pouvez maintenant :</p>
              <ul>
                <li>Consulter notre menu complet</li>
                <li>Passer des commandes en ligne</li>
                <li>Bénéficier de nos offres spéciales</li>
                <li>Accumuler des points de fidélité</li>
              </ul>

              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                <strong>Besoin d'aide ?</strong><br>
                Contactez-nous à <a href="mailto:contact@bahizi.bi">contact@bahizi.bi</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de bienvenue envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
    return false;
  }
}

module.exports = {
  sendOrderConfirmation,
  sendOrderNotificationToRestaurant,
  sendWelcomeEmail
};
