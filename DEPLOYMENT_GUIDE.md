# Guide de Déploiement Vercel - Bahizi Café & Restaurant

## 📋 Prérequis

- ✅ Compte GitHub (déjà configuré)
- ✅ Compte Vercel (gratuit sur https://vercel.com)
- ✅ Repo GitHub : `bahizi_ghosted_me`
- ✅ Credentials Gmail pour les emails

## 🚀 Étapes de Déploiement

### Étape 1 : Créer un Compte Vercel

1. Aller sur https://vercel.com
2. Cliquer sur "Sign Up"
3. Se connecter avec GitHub
4. Autoriser Vercel à accéder à vos repos

### Étape 2 : Importer le Projet

1. Une fois connecté, cliquer sur "New Project"
2. Sélectionner "Import Git Repository"
3. Chercher et sélectionner `bahizi_ghosted_me`
4. Cliquer sur "Import"

### Étape 3 : Configurer le Projet

**Framework** : Sélectionner "Other" (site statique)

**Build Settings** :
- Build Command : `echo 'Static site'`
- Output Directory : `.`
- Install Command : (laisser vide)

### Étape 4 : Ajouter les Variables d'Environnement

Cliquer sur "Environment Variables" et ajouter :

```
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=bahizi_db
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RESTAURANT_EMAIL=restaurant@bahizi.bi
NODE_ENV=production
```

### Étape 5 : Déployer

1. Cliquer sur "Deploy"
2. Attendre ~2-3 minutes
3. Une fois terminé, tu recevras une URL comme : `https://bahizi-ghosted-me.vercel.app`

## 🔗 Domaine Personnalisé (Optionnel)

1. Aller dans "Settings" → "Domains"
2. Ajouter ton domaine (ex: `bahizi.bi`)
3. Suivre les instructions pour configurer les DNS records

## 📊 Après le Déploiement

### Vérifier le Déploiement

- Frontend : https://bahizi-ghosted-me.vercel.app
- API : https://bahizi-ghosted-me.vercel.app/api

### Tester les Pages

1. **Accueil** : https://bahizi-ghosted-me.vercel.app/index.html
2. **Inscription** : https://bahizi-ghosted-me.vercel.app/signup.html
3. **Connexion** : https://bahizi-ghosted-me.vercel.app/login.html
4. **Menu** : https://bahizi-ghosted-me.vercel.app/menu.html (après connexion)
5. **Histoire** : https://bahizi-ghosted-me.vercel.app/histoire.html
6. **Localisation** : https://bahizi-ghosted-me.vercel.app/nous-trouver.html
7. **Réservation** : https://bahizi-ghosted-me.vercel.app/reservation.html

### Tester les Emails

1. Créer un compte avec un email valide
2. Passer une commande
3. Vérifier que l'email de confirmation est reçu
4. Vérifier que le restaurant reçoit la notification

## 🔄 Déploiements Futurs

Chaque fois que tu pushes sur GitHub, Vercel redéploiera automatiquement :

```bash
git add .
git commit -m "feat: update site"
git push origin master
# Vercel redéploiera automatiquement !
```

## 🐛 Dépannage

### Les emails ne s'envoient pas

1. Vérifier les variables d'environnement
2. Vérifier que le mot de passe Gmail est correct
3. Vérifier les logs Vercel : Settings → Functions

### Le site ne charge pas

1. Vérifier que tous les fichiers HTML sont à la racine
2. Vérifier que les chemins des assets sont corrects
3. Vérifier les logs Vercel

### L'API ne répond pas

1. Vérifier que le backend est bien configuré
2. Vérifier les variables d'environnement de la base de données
3. Vérifier les logs Vercel

## 📝 Notes Importantes

- **Secrets** : Ne jamais committer les credentials directement
- **Base de données** : Utiliser une DB cloud (Heroku, Railway, Supabase)
- **Emails** : Utiliser un service professionnel (SendGrid, Mailgun) en production
- **CORS** : Configurer les headers CORS si nécessaire

## 🎯 Checklist Avant Déploiement

- [ ] Tous les fichiers HTML sont à la racine
- [ ] Les images sont dans `/assets`
- [ ] Le backend est configuré
- [ ] Les variables d'environnement sont définies
- [ ] Les emails Gmail sont configurés
- [ ] Les tests locaux passent
- [ ] Le repo GitHub est à jour

## 📞 Support

- Vercel Docs : https://vercel.com/docs
- GitHub Issues : https://github.com/fk06june/bahizi_ghosted_me/issues
- Email : contact@bahizi.bi

---

**Ton site sera en ligne en quelques minutes ! 🚀**
