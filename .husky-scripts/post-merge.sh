#!/bin/sh
echo "Ejecutando post-merge hook"

if git diff --name-only HEAD@{1} HEAD | grep -E 'package(-lock)?\.json'; then
    echo "Se detectó cambio en dependencias, ejecutando npm install..."
    npm install
fi

echo "Ejecutando tests..."
npm run test

echo "Post-merge completado correctamente."
exit 0
