#!/bin/bash

echo "🚀 Démarrage du déploiement complet..."

# ─────────────────────────────────────
# ÉTAPE 1 — Terraform
# ─────────────────────────────────────
echo "📦 Étape 1 : Création de l'infrastructure avec Terraform..."
cd "/home/afrocode/Documents/Examen/Call center/terraform"

terraform apply -auto-approve

if [ $? -ne 0 ]; then
  echo "❌ Terraform a échoué. Arrêt du déploiement."
  exit 1
fi

echo "✅ Infrastructure créée avec succès !"

# ─────────────────────────────────────
# ÉTAPE 2 — Récupérer l'IP automatiquement
# ─────────────────────────────────────
echo "🔍 Récupération de l'IP publique..."
IP=$(terraform output -raw instance_ip)
echo "✅ IP publique : $IP"

# ─────────────────────────────────────
# ÉTAPE 3 — Mettre à jour inventory.ini
# ─────────────────────────────────────
echo "📝 Mise à jour du fichier inventory.ini..."
cd "/home/afrocode/Documents/Examen/Call center/ansible"

cat > inventory.ini << EOF
[call221]
$IP ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/call221-key.pem ansible_ssh_common_args='-o StrictHostKeyChecking=no'
EOF

echo "✅ inventory.ini mis à jour avec l'IP : $IP"

# ─────────────────────────────────────
# ÉTAPE 4 — Attendre que l'EC2 soit prêt
# ─────────────────────────────────────
echo "⏳ Attente de 30 secondes que l'EC2 soit prêt..."
sleep 30

# Vérifier que le serveur est accessible en SSH
echo "🔍 Vérification de la connexion SSH..."
until ssh -i ~/.ssh/call221-key.pem -o StrictHostKeyChecking=no -o ConnectTimeout=5 ubuntu@$IP "echo ok" 2>/dev/null; do
  echo "⏳ Serveur pas encore prêt, on réessaie dans 10 secondes..."
  sleep 10
done

echo "✅ Serveur accessible !"

# ─────────────────────────────────────
# ÉTAPE 5 — Ansible
# ─────────────────────────────────────
echo "⚙️  Étape 2 : Configuration du serveur avec Ansible..."
ansible-playbook -i inventory.ini playbook.yml

if [ $? -ne 0 ]; then
  echo "❌ Ansible a échoué."
  exit 1
fi

# ─────────────────────────────────────
# RÉSULTAT FINAL
# ─────────────────────────────────────
echo ""
echo "🎉 Déploiement complet terminé !"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Application  : http://$IP:3000"
echo "📚 Swagger      : http://$IP:3000/api-docs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
