#!/bin/bash

# Ouvrir le serveur dans un nouveau terminal
gnome-terminal -- bash -c "npm run startConv; exec bash"

# Attendre un peu que le server boot
sleep 10

# Ouvrir ngrok dans un nouveau terminal
gnome-terminal -- bash -c "ngrok http 3000; exec bash"

# Attendre un peu que ngrok soit prêt
sleep 10

# Mettre à jour le webhook dans un nouveau terminal
gnome-terminal -- bash -c "npm run updateWebhook; exec bash"